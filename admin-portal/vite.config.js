import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5174,
        strictPort: true,
        fs: {
            allow: ['..']
        }
    },
    resolve: {
        alias: {
            '@shared': resolve(__dirname, '../shared')
        }
    }
})
