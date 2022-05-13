# 前端工程化

## 项目经历

![img](../business/ekwing/pic/前端基础工程建设.png)

## 面试题

### Webpack

- 如何使用webpack优化前端性能
  - 压缩JS - TerserPlugin

    ```js
    optimization: {
      minimize: ture,
      minimizer: [
        // 压缩JS
        new TerserPlugin()
      ]
    }
    ```

  - 压缩CSS - OptimizeCSSAssetsPlugin

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
