var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js', '.scss']
    },
    entry: './src/js/main.js', // it can be multiple file. For multiple file use array with proper path
    output: {// this is for output where you want to put your file after complete build process
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {// here we will load some external resource. which we are using to build our project
        rules: [
            {
                test: /\.js$/, // it will find all js
                use: 'babel-loader', // which will perform some functioanlity during build process.
                exclude: [/node_modules/, /dist/]// expect this
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /dist/],
                loader: 'eslint-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: 'assets'
        }]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 5000,
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
}
