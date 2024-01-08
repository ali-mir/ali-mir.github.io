// Import markdown conversion library
import {marked} from 'marked';
import {error} from '@sveltejs/kit';
import { readFileSync } from 'node:fs';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({params}) {
  try {
    const f = readFileSync(`./src/routes/writing/${params.slug}.md`, 'utf8');
    return {
      post: {
        content: marked.parse(f),
        slug: params.slug
      }
    };
  } catch(err) {
      throw error(500, {
        message: "Failed to load blog content",
      })
  }
}

