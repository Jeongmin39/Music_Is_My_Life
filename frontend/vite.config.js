import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api' : {
        target: 'http://15.165.178.46:8081', // 다시 변경하기 http://15.165.178.46:80
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
      '/writeDiary/api' : {
        target: 'http://15.165.178.46:8081', // 다시 변경하기 http://15.165.178.46:80
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/writeDiary/, ''),
        secure: false,
        ws: true,
      },
      '/imageTest' : {
        target: 'https://mmlbucket.s3.ap-northeast-2.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/imageTest/, ''),
        secure: false,
        ws: true,
      }
    },
  },
});
