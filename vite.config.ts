import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			// multiple entry points
			input: {
				index: 'src/lib/index.ts',
				validators: 'src/lib/validators.ts',
			},
		},
	},
});
