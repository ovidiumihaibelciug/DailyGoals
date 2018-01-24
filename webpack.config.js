const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let ExtractPlugin =  new ExtractTextPlugin({
    filename: 'main.css',
})

module.exports = {
    entry: './src/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        ExtractPlugin
    ]
};