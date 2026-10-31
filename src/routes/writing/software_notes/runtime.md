# Runtime
## October 30th, 2026

At a high-level, a runtime system is the layer of code that supports execution of your program[^1]. It runs underneath[^2] your code, handling the lower-level services that your program relies on, such as memory allocation, concurrency coordination and blocking I/O. The OS underlies the language-specific runtime, belonging to the broader execution environment. For example, when you write the following code in Python:

```python
def read_file(path):
	with open(path) as f:
		return f.read()

content = read_file("test.log")
print(content)
```

The runtime manages the callstack, pushing the `read_file()` stack frame and popping it once the function completes. It wraps an OS syscall in `open()`, returning a file object with a read buffer layered on top of a raw file descriptor. The `with` block guarantees the file descriptor is cleaned up once control exits the code block. The bytes read off disk are allocated memory on the heap. `print()` encodes the string and passes the bytes to a buffered writer, which issues a `write` syscall on flush against standard output.

I should note that there is a distinction between a programming language and the language’s runtime: the programming language defines the code’s semantics: what certain keywords mean, what is valid syntax, what the built-in data types are, whereas the runtime is the concrete implementation of those semantics.

Since I’ve always found the term “runtime” itself quite abstract, I found it useful to compare a few programming language runtimes to get a better sense of what they do:

### C

C is low-level enough that its runtime is relatively lightweight. People forget it exists! It’s often split into two pieces: the C standard library (`libc`), which provides functions such as `malloc()`, `printf()`, `memcpy()`; and a small amount of code required to:

- Receive control from the OS or dynamic loader
- Extract `argc`, `argv` and `env` variables from the initial process state
- Initialize essential `libc` state
- Run initialization hooks, such as constructor arrays
    - Constructor arrays are sections in the binary that contain pointers to functions the runtime should call before `main()`. They’re used for explicit constructor functions, and runtime/library setup code
- Invoke `main()`
- Handle program termination

Historically, this startup code was typically linked into your C binary as an object file `crt0.o`. These days, on many modern systems, the same role is spread across a few object files such as `crt1.o`, `Scrt1.o`, `crti.o`, and `crtn.o`, depending on the platform and linking mode. These object files are typically provided pre-built by the system C library or compiler runtime.

### Python

`CPython` is the reference implementation of the Python language. The codebase contains a parser and a compiler that translate Python source code into Python bytecode (caching the results in `__pycache__/*.pyc` files), and a runtime system, including the interpreter, that executes this bytecode. The interpreter is a “bytecode dispatch loop”, which is a `switch` statement inside a loop. The `switch` is over opcodes, written into the bytecode at compile time.

Unlike C, `CPython`'s runtime manages memory on the user’s behalf, primarily using a refcount strategy, although it also runs a cyclic garbage collector. It also contains a global mutex known as the Global Interpreter Lock (GIL), which ensures only one OS thread is executing Python bytecode at a time. This simplifies `CPython`'s internal memory management system as refcount updates don’t require atomic operations, but this comes at the cost of true parallelism on multi-core machines. In recent `CPython` releases, the GIL has been made optional.

### Go

Along with its substantial standard library, Go has a runtime that does a lot of heavy lifting but is hidden behind layers of abstraction. Notably, the runtime is built directly into every Go binary, and the standard library exposes a `runtime` package allowing users to interact with it. Major components in the Go runtime include the scheduler, the garbage collector, stack management, the memory allocator, and channels (Go’s message passing primitive).

The scheduler is particularly distinct amongst my examples because of Go’s usage of green threads. Instead of relying on the OS’s native scheduler, the Go runtime manages many lightweight userspace threads (goroutines) mapped onto OS threads. These are particularly lightweight: stack sizes start at 2KB, and context-switching is cheaper because it happens entirely in userspace. It’s built upon the “GMP” model: goroutine (G), machine (M), processor (P). The goroutine is Go’s unit of concurrent work defined in userspace, the machine refers to the OS thread, and the processor is the scheduling context. The processor contains all the state that an OS thread needs to run a goroutine, and it maintains a queue of runnable goroutines ready to be scheduled. The number of `P`s is influenced by the number of cores or cgroup CPU limits. 

Blocking work is handled in two different ways. Network I/O never really blocks: Go sets those FDs as non-blocking and registers them with the runtime’s `netpoller`, which is a component in the runtime that wraps the OS readiness APIs (e.g. `epoll`). A goroutine waiting on a socket is parked, and the `M` it was running on picks up the next runnable goroutine. Whenever the netpoller reports that the socket `fd` is ready, the goroutine is marked runnable. This is the key to Go being able to hold hundreds of thousands of open network connections on a small set of OS threads.

Other syscalls that actually block (file I/O, `cgo` calls) can’t utilize the same optimization. In these cases, the OS thread is unable to attend to any other goroutine in its processor queue. The Go runtime detects these blocking operations, and detaches the OS thread from its processor. It’ll then either reuse an idle thread or spawn a new OS thread, attach it to the newly freed processor, and handle the queued goroutines. The original OS thread completes its operation and attempts to acquire another `P`, and if there aren’t any available, it returns its goroutine on the global queue and is returned to the thread pool. If a particular `P`'s local queue of goroutines is empty, it’ll check for runnable goroutines in the global queue and in the netpoller. If it doesn’t find any, it’ll steal goroutines from other processor queues. This keeps all cores busy and the scheduling efficient. To manage all the GMP coordination, there is a singleton `schedt` struct that manages the scheduler state. It contains a global run queue of goroutines that aren’t in any `P`'s local queue.

In contrast to `CPython`, which primarily uses references counting, the Go runtime uses a “concurrent tricolor mark-and-sweep” strategy for memory management. This means the GC mostly runs alongside your program, with two brief stop-the-world pauses to start and finish the mark phase. It maintains three states of allocated memory: white, potential garbage; gray, reachable but not scanned; and black, scanned. The mark algorithm is the following: it iterates through the object graph (every allocated object that can hold a reference to another object), starting at certain roots: global variables, local variables and parameters on each goroutine’s stack, and CPU registers. At the beginning of the traversal, every object is white, and its roots are marked gray. The GC then repeatedly takes a gray object, scans it, and marks every white object it references gray, and then marks the scanned object black. This goes on until there are no more gray objects. At the end of the traversal, the GC begins to sweep. At this point all reachable objects are marked black, and any non-reachable objects are still white and garbage collected.

Altogether, this approach to GC is referred to as “tracing garbage collection”.

### JavaScript

<WIP because this is a long one!>

[^1]: There are actually a few different definitions of the term “runtime”. I’m focusing on language-specific runtimes in this post, but it also can mean the length of a program’s execution, the BigO complexity that affects that execution, or the execution phase of a running program (as opposed to compile time).

[^2]: How literally to read “underneath” here depends on the language. For an interpreted language, the interpreter is the running program and your code is the bytecode it executes. For compiled languages, the runtime is usually linked into your binary by the compilation process and runs alongside your code.