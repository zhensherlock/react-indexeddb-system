var webpack = require('webpack');
var path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
var config = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/index.js')       // 定义入口文件
    ],
    devtool: 'source-map',
    output: {                                       // 定义出口目录
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/'
    },
    resolve: {                                      // resolve 指定可以被 import 的文件后缀
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/, // 检测哪些文件需要此loader，是一个正则表达式，用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel-loader']  // 加载模块 "babel" 是 "babel-loader" 的缩写
            },
            {
                test: /(\.css)$/,
                loaders: ["style-loader", "css-loader?sourceMap"]
            },
            { test: /\.(png|gif|jpg|jpeg|bmp)$/i, loader:'url-loader?limit=5000&name=img/[name].[chunkhash:8].[ext]' },
            { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
            { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8080/' }),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
}

module.exports = config;
