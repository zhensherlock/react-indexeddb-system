var webpack = require('webpack');
var pkg = require('./package.json')
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
    entry: {
        app: path.resolve(__dirname, 'app/index.js'),       // 定义入口文件
        vendor: Object.keys(pkg.dependencies) // 将 第三方依赖（node_modules中的） 单独打包
    },
    output: {                                       // 定义出口目录
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.[chunkhash:8].js'
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
                loaders: ExtractTextPlugin.extract({
                    use:[{
                        loader: 'css-loader',
                        options:{
                            minimize: true //css压缩
                        }
                    }]
                })
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
        // webpack 内置的 banner-plugin
        new webpack.BannerPlugin("Copyright by zhensherlock@163.com." + new Date()),
        // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
        // 分离CSS和JS文件
        new ExtractTextPlugin('/css/[name].[chunkhash:8].css'),

        // 提供公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '/js/[name].[chunkhash:8].js',
            minChunks: function(module){
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            filename: '/js/[name].[chunkhash:8].js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'Indexeddb Manager',
            filename:'index.html',    //生成的html存放路径，相对于 path
            template:'app/view/index.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，true/'head'/'body'/false,
            hash:false,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        })
    ]
}

module.exports = config;
