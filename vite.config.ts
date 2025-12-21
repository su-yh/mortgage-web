import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  //获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/variable" as *;`
        },
      },
    },
    //代理跨域
    server: {
      port: 5173,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          // rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})
