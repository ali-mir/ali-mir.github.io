// Import markdown conversion library
import {marked} from 'marked';
import {error} from '@sveltejs/kit';
import { readFileSync } from 'node:fs';

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
    const f = readFileSync(`./src/routes/blog/${params.slug}.md`, 'utf8');
    return {
      post: {
        content: marked.parse(f)
      }
    };
  } catch(err) {
      throw error(500, {
        message: "Failed to load blog content",
      })
  }
}
