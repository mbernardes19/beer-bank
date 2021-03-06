const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill',path.join(__dirname,'/src/App.js')],
    output: {
        path: path.join(__dirname,'/dist/'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(jpg|png)$/, use: {loader:'url-loader', options:{limit:8192}}},
        ]
    },
    resolve: {extensions: ['.js','.ts']},
    plugins: [
        new htmlWebpackPlugin({
            hash:true,
            filename: 'index.html',
            template: path.join(__dirname,'/public/index.html')
        })
    ]

}