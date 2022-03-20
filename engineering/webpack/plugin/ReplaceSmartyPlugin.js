module.exports = class ReplaceSmartyPlugin {
  constructor({ replaceRules }) {
    this.replaceRules = replaceRules
  }
  /**
   *
   * hbs中引用的外链直接替换成线上cdn对应代码文件
   * 业务写的脚本文件替换成本地的文件
   */
  apply(compiler) {
    compiler.hooks.compilation.tap('ReplaceSmartyPlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        'ReplaceSmartyPlugin',
        (data, cb) => {
          let { html } = data
          const rules = Reflect.ownKeys(this.replaceRules)
          const resHtml = rules.reduce((_, rule) => {
            html = html.replace(new RegExp(rule, 'g'), this.replaceRules[rule])
            return html
          }, html)
          data.html = resHtml
          cb()
        }
      )
      compiler.hooks.compilation.tap('ReplaceSmartyPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
          'ReplaceSmartyPlugin',
          (data, cb) => {
            const { head, body } = data
            head.forEach((item) => {
              let { href } = item.attributes
              const resHref = rules.reduce((_, rule) => {
                href = href.replace(
                  new RegExp(rule + 'competition/', 'g'),
                  'http://localhost:8080/'
                )
                return href
              }, href)
              item.attributes.href = resHref
            })
            body.forEach((item) => {
              let { src } = item.attributes
              const resSrc = rules.reduce((_, rule) => {
                src = src.replace(
                  new RegExp(rule + 'competition/', 'g'),
                  'http://localhost:8080/'
                )
                return src
              }, src)
              item.attributes.href = resSrc
            })
            cb()
          }
        )
      })
    })
  }
}
