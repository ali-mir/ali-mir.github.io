// Import markdown conversion library
import {marked} from 'marked';
import {fm} from 'front-matter';
import {error} from '@sveltejs/kit';

function parseBlogpost(name) {
  console.log(`parsing blog post ${name}`);
  return ["metadata", "content"];
}

export function load({params}) {
  const [metadata, content] = parseBlogpost(params.slug);
  return {
    post: {
      title: `${metadata}`,
      content: `${content}`
    }
  };
}
