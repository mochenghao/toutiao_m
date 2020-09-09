module.exports = {
  plugins: {
    // 给属性添加兼容前缀，兼容低版本浏览器
    // vue脚手架自带 autoprefixer 配置，产生冲突，注释掉就行
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 把px转换成rem
    'postcss-pxtorem': {
      rootValue({ file }) {
        // console.log(obj.file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,
      // 配置要转换的属性
      propList: ['*']
    }
  }
}
