// Import markdown conversion library
import {marked} from 'marked';
import {error} from '@sveltejs/kit';
import { readFileSync } from 'node:fs';

function parseBlogpost(name: string) {
  const f = readFileSync('./src/routes/blog/hello_world.md', 'utf8');
  return marked.parse(f);
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return [
		{ slug: 'hello-world' },
	];
}

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({params}) {
  try {
    const content = parseBlogpost(params.slug);
    return {
      post: {
        content: content
      }
    };
  } catch(err) {
      throw error(500, {
        message: "Failed to load blog content",
      })
  }
}

