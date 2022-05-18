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

3. webpack主要工作流程
 Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的run方法开始执行编译； 确定入口：根据配置中的 entry 找出所有的入口文件
编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

4. webpack插件原理

Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。插件的原理其实本质就是webpack构建过程当中派发的事件，我们可以选择感兴趣的事件进行订阅，当webpack到达某个特定时刻时就可以派发该事件，我们订阅的函数也就得到了执行。