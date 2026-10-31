import { Marked } from 'marked';
import markedFootnote from 'marked-footnote';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { error } from '@sveltejs/kit';
import { readFileSync } from 'node:fs';

export interface BlogPost {
  content: string;
  slug: string;
}

const markdown = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight: (code, lang) =>
      hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : 'plaintext' }).value
  }),
  markedFootnote()
);

export function loadPost(dir: string, slug: string): { post: BlogPost } {
  // Validate slug to prevent path traversal attacks
  if (!/^[a-z0-9_-]+$/i.test(slug)) {
    throw error(400, 'Invalid post slug');
  }

  try {
    const content = readFileSync(`${dir}/${slug}.md`, 'utf8');
    return {
      post: {
        content: markdown.parse(content) as string,
        slug
      }
    };
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      throw error(404, 'Blog post not found');
    }
    throw error(500, 'Failed to load blog content');
  }
}
