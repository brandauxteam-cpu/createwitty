import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy to the ROOT of your domain (https://createwitty.com/), keep base '/'.
// If you deploy inside a subfolder (https://createwitty.com/app/), set base '/app/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
