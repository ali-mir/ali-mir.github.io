import { marked } from 'marked';
import { error } from '@sveltejs/kit';
import { readFileSync } from 'node:fs';
import type { PageServerLoad } from './$types';

export const prerender = true;

interface BlogPost {
  content: string;
  slug: string;
}

export const load: PageServerLoad = ({ params }): { post: BlogPost } => {
  // Validate slug to prevent path traversal attacks
  if (!/^[a-z0-9_-]+$/i.test(params.slug)) {
    throw error(400, 'Invalid post slug');
  }

  try {
    const content = readFileSync(`./src/routes/writing/${params.slug}.md`, 'utf8');
    return {
      post: {
        content: marked.parse(content) as string,
        slug: params.slug
      }
    };
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      throw error(404, 'Blog post not found');
    }
    throw error(500, 'Failed to load blog content');
  }
};

