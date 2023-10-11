// Import markdown conversion library
import {marked} from 'marked';
// import {fm} from 'front-matter';
const fs = require('fs')
import {error} from '@sveltejs/kit';

function parseBlogpost(name: string) {
  console.log(`parsing blog post ${name}`);

  console.log(fs);
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
