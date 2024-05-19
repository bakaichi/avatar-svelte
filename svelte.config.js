import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';

const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;