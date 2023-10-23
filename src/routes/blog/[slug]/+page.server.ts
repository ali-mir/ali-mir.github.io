// Import markdown conversion library
import {marked} from 'marked';
import {error} from '@sveltejs/kit';
import { readFileSync } from 'node:fs';

function parseBlogpost(name: string) {
  const f = readFileSync('./src/routes/blog/hello_world.md', 'utf8');
  return marked.parse(f);
}

/** @type {import('./$types').PageLoad} */
export function load({params}) {
  const content = parseBlogpost(params.slug);
  return {
    post: {
      content: content
    }
  };
}

