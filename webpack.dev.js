const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');

module.exports = merge(common, {
    mode: 'development',
    "devtool": "inline-source-map",
    devServer: {
        https: true,
        port:443,     
        disableHostCheck: true,
        host: 'c0dr.nl',
        contentBase: __dirname+'/dist',
        key: fs.readFileSync('c0dr_nl.key'),
        cert: fs.readFileSync('c0dr_nl.crt'),
        ca: fs.readFileSync('c0dr_nl.pem'),
      }
});