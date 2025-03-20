import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/create_editor.ts',
      formats: ['es'],
      fileName: 'index',
    },
  },
});
