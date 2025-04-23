const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 移除indentedSyntax选项，如果你只是想使用普通的SCSS语法，这里可以不写任何额外配置
        // 如果你确实需要启用缩进式语法（.sass文件），可以这样配置
        sassOptions: {
          indentedSyntax: true
        }
      }
    }
  }
};