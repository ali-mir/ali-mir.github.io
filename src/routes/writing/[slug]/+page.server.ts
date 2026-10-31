import { loadPost } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = ({ params }) =>
  loadPost('./src/routes/writing', params.slug);
