// Import markdown conversion library
import {marked} from 'marked';
import {error} from '@sveltejs/kit';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import matter from 'gray-matter';

function parseBlogpost(name: string) {
  console.log(`parsing blog post ${name}`);

  let data = readFileSync('./src/routes/blog/hello_world.md', 'utf8');
  const matterResult = matter(data);
  // console.log(matterResult);

  const m = marked.parse(data);
  console.log(m)
  return [matterResult.data.title, matterResult.data.date, "content"];
}

/** @type {import('./$types').PageLoad} */
export function load({params}) {
  const [metadata, date, content] = parseBlogpost(params.slug);
  return {
    post: {
      title: `${metadata}`,
      date: `${date}`,
      content: `${content}`
    }
  };
}

