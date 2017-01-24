
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.(png|gif|jpe?g)$/i,
                include: path.resolve(__dirname, '../../src/images'),
                loader: 'url-loader'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                include: path.resolve(__dirname, '../../node_modules/bootstrap/fonts'),
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                include: path.resolve(__dirname, '../../node_modules/bootstrap/fonts'),
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                include: path.resolve(__dirname, '../../node_modules/bootstrap/fonts'),
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: path.resolve(__dirname, '../../node_modules/bootstrap/fonts'),
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};
