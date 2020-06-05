const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    devServer: {
        https: true,
        port:443,
        // allowedHosts: [
        //     '.c0dr.nl',
        //     'c0dr.nl',
        // ],
        disableHostCheck: true,
        host: 'c0dr.nl',
        contentBase: __dirname+'/dist',
        key: fs.readFileSync('c0dr_nl.key'),
        cert: fs.readFileSync('c0dr_nl.crt'),
        ca: fs.readFileSync('c0dr_nl.pem'),
      },
    plugins: [
        new CopyPlugin([{
            from: './src/static',
            to: ''
        }, ]),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader',
                    'glslify-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader', options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader', options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    }
}
