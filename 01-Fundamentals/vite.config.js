import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // 监听所有接口
    port: 3000, // 如果你想使用不同的端口
  },
});
