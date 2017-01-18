
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

module.exports = {
    plugins: [
    ],
    module: {
        loaders: [
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                include: '../../node_modules/bootstrap/fonts',
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                include: '../../node_modules/bootstrap/fonts',
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                include: '../../node_modules/bootstrap/fonts',
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: '../../node_modules/bootstrap/fonts',
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};
