// Import markdown conversion library
import {marked} from 'marked';
// import {fm} from 'front-matter';
import {error} from '@sveltejs/kit';
// import {fs} from 'fs';
import { readFileSync } from 'node:fs';

function parseBlogpost(name: string) {
  console.log(`parsing blog post ${name}`);

  let data = readFileSync('../../hello_world.md');
  return ["metadata", "content"];
}

/** @type {import('./$types').PageLoad} */
export function load({params}) {
  const [metadata, content] = parseBlogpost(params.slug);
  return {
    post: {
      title: `${metadata}`,
      content: `${content}`
    }
  };
}

