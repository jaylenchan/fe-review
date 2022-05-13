# Webpack面试题

1. 如何使用webpack优化前端性能
   - 压缩JS

    ```js
    optimization: {
      minimize: ture,
      minimizer: [
        // 压缩JS
        new TerserPlugin()
      ]
    }
    ```

    - 压缩CSS

    ```js
    optimization: {
      minimize: ture,
      minimizer: [
        // 压缩CSS
        new OptimizeCSSAssetsPlugin()
      ]
    }
    ```

    - 压缩图片

    ```js
     rules:[
       {
         test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
         use: [
           'file-loader',
           {
             loader: 'image-webpack-loader',
             options: {
               mozjpeg: {
                 progressive: true,
                 quality: 65
               }
             }
           }
         ]
       }
     ]
    }
    ```

    - 清除无用的CSS

    ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const PurgeCssPlugin = require('purgecss-webpack-plugin')

    rules : [
      {
        test: /\.css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    ]

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new PurgeCssPlugin({
        path: glob.sync(`${PATHS.src}/**/*`, { nodir: true})
      })
    ]
    ```

   - Tree-Shaking

   ```js
   // 原理是利用esm的特点，只能作为模块顶层出现，import的模块名只能是字符串常量
   // webpack默认就支持Tree-shaking,在.babelrc里头设置module:false即可在mode:production生产模式下开启。

    // .babelrc

     {
       "presets": [['@babel/preset-env', { modules: false}]]
     }
   ```

   - Scope Hoisting作用域提升

   ```js
   // 原理是：将所有模块按照引用的顺序，放在一个函数作用域里，然后适当地重命名一些变量命名冲突。
   ```

   - 代码分割

  ```js
   // 方式1.入口点分割，在entry直接手动写多入口 -缺点：入口代码，如果都引入同一个模块，这个模块会被重复打包多次
   // 方式2: 动态导入和懒加载：对于import的模块会单独打包分割
   // 方式3: splitChunks
   // 
  ```

- 预加载preload

     ```js
      // 预加载会把资源下载的顺序权重提高，使得关键数据提前下载，优化页面打开速度

      比如：
      import ('./utils.js'
      /* webpackPreload:true*/
      /* webpackChunkName:"utils"*/
      )
      最终就生成<link rel="preload" as="script" href="utils.js">
     ```

- 预拉取prefetch

     ```js
     // 预拉取跟预加载不同，预拉取是告诉浏览器未来可能使用到的资源，要浏览器在空闲的时候可以加载对应的资源

     button.addEventlistener('click', () => {
       import ('./utils.js'
        /* webpackPrefetch: true*/
        /* webpackChunkName: "utils"*/ 
       )
     })


     // prefetch VS preload
     /**
      * preload是告诉浏览器必定需要的资源（关键资源），浏览器一定会加载这些资源
      * prefetch是告诉浏览器可能需要的资源，浏览器不一定加载这些资源
      * 因此，优化建议，必要使用preload,可能的使用prefetch
      */
     ```

2. HMR的原理
