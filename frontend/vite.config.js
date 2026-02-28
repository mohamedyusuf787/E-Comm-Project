
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 1. Tailwind v4 should be its own plugin in the array
    tailwindcss(), 
    // 2. React plugin handles the React Compiler via its Babel option
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', { /* optional config */ }],
        ],
      },
    }),
  ],
})
