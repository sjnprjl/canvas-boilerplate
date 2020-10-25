const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development', 
    entry: './src/js/canvas.js',
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: 'canvas.bundle.js'
    }, 
    devServer: {
        contentBase: path.join(__dirname , 'dist'),
        compress: true, 
        port: 4444

    }
}
