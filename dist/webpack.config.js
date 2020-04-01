'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin'); //引入vue-loader库
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // production
    watch: true,
    watchOptions: {
        // 不监听的文件或文件夹，支持正则匹配
        // 默认为空
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        // 默认为 300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
        // 默认每隔1000毫秒询问一次
        poll: 1000
    },
    entry: './src/index.ts', // 入口文件
    // output: {
    //     publicPath: '/public/',
    //     filename: '[name].[hash].js'
    // },
    devtool: 'cheap-module-eval-source-map', //不包含列信息，同时 loader 的 sourcemap 也被简化为只包含对应行的
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, //vue加载器
        {
            test: /\.tsx?$/,
            loader: 'ts-loader', //ts加载器
            options: {
                transpileOnly: true,
                appendTsSuffixTo: [/.vue$/] //认识vue文件

            } }, {
            test: /\.(css|less)$/,
            loader: 'vue-style-loader!less-loader!css-loader' //css加载器
        }]
    },
    plugins: [new VueLoaderPlugin() //vue-loader插件加载方式
    , new HtmlWebpackPlugin({ //此部分新增加
        template: './public/index.html', //需要自动注入的模板的文件名称
        inject: true //是否自动注入生成后的文件
    })],
    devtool: '#eval-source-map'
};