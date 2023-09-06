// defineConfig 帮手函数，用来获得更好的类型提示
const { defineConfig } = require('@vue/cli-service')
// 自动导入component api 和生成全局typescript说明
const AutoImport = require('unplugin-auto-import/webpack');
// element-plus按需引入，可自动导入插件，不用写import(和ElementPlusResolver)
const Components = require('unplugin-vue-components/webpack');
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers');
// 按需加载lodash
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const production = process.env.NODE_ENV === 'production';
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = defineConfig({
  // 部署应用包时的基本URL。默认情况下是部署到一个域名的根路径上，如果要部署到子路径上，就需要指定这个子路径
  publicPath: process.env.NODE_ENV === 'production' ? '/prod-sub-puth' : '/',
  // 打包构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源（js、css、img、font）等，相对于outpuDir的目录
  assetsDir: 'static',
  // 指定生成index.html的输出路径（相对于outputDir),也可以是绝对路径
  indexPath: 'index.html',
  // 生成的静态资源使用hast控制
  filenameHashing: true,
  // 多页应用中的配置，配置参考中有使用方法
  // pages: {},
  // 是否在开发环境下通过eslint-loader在每次保存时lint代码，default会在浏览器中也提示错误信息。
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 默认情况下babel-loader会忽略所有node_modules中的文件，启用本选项，可避免构建后的代码出现未转译的第三方依赖
  transpileDependencies: true,
  // 修改webpack的配置文件，他会通过webpack-merge合并入最终的webpack配置
  /* configureWebpack: config => {
    if (production) {
      // 为生产环境修改配置
    }
    else {
      // 为开发环境修改配置
    }
  }, */
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
        // 自动导入vue/vue-router里的相关api和函数
        imports: ['vue', 'vue-router', 'vue/macros'],
        // 生成一个全局说明，展示引入的内容，生成文件的位置
        dts: 'src/auto-imports.d.ts',
        // 在vue文件使用过程中因为自动引入直接使用了方法，eslint会报提示错误，下面是用来解决eslint提示错误问题。并要在.eslintrc文件中配置生成的文件路径
        eslintrc: {
          enabled: true, // 只生成一次就可以，避免每次工程启动都生成，一旦生成配置文件后，再把enabled：false关掉，否则这个文件每次都会重建加载的时候重新生成,可能会导致eslint有时会找不到这个文件
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        }
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        // 默认识别 src/components 文件，该文件夹下的所有组件都会自动import
        // dirs: ['src/components'],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      }),
    ],
    // filesystem,文件会缓存在node_module/.cache中
    cache: {
      type: 'filesystem',
    }
  },
  // 对webpack配置进行更细粒度的修改
  // 使用 $ref vue/macros 直接定义相应值，不用在使用.value的相应配置
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          reactivityTransform: true
        }
      })
    // 设置别名
    config.resolve.alias
      .set('@components', resolve('src/components'))
      .set('@router', resolve('src/router'))

      // 按需加载lodash
    if (production) {
      config
        .plugin('loadshReplace')
        .use(new LodashModuleReplacementPlugin())
    }
  },
})
