// Import markdown conversion library
import { marked } from 'marked'
import {fm} from 'front-matter'
import { error } from '@sveltejs/kit';

export function load({ params }) {
	return {
		post: {
			title: `Title for ${params.slug} goes here`,
			content: `Content for ${params.slug} goes here`
		}
	};
}