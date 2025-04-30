module.exports = {
  parallel: false,
  devServer: {
    port:7001,
    proxy:{
      '/api':{
        target: 'http://106.14.81.169:8002',
        source:true,
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/api'
        }
      }
    }
  }
}