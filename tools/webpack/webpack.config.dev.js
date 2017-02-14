import webpack from 'webpack';
import path from 'path';
import * as REGEX from './regexConstants';

const rootPath = path.resolve(__dirname, '../../');

export default {
    debug: true,
    devtool: 'inline-source-map',
    noInfo: false,
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
        path.join(rootPath, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.join(rootPath, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(rootPath, 'src')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: REGEX.JS_PATH,
                include: path.join(rootPath, 'src'),
                loaders: ['babel-loader']
            },
            {
                test: REGEX.CSS_PATH,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: REGEX.IMAGES_PATH,
                include: path.join(rootPath, 'src/images'),
                loader: 'url-loader'
            },
            {
                test: REGEX.EOT_PATH,
                //include: path.join(rootPath, 'node_modules/bootstrap/fonts'),
                loader: 'file-loader'
            },
            {
                test: REGEX.WOFF_OR_WOFF2_PATH,
                //include: path.join(rootPath, 'node_modules/bootstrap/fonts'),
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: REGEX.TTF_PATH,
                //include: path.join(rootPath, 'node_modules/bootstrap/fonts'),
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: REGEX.SVG_PATH,
                //include: path.join(rootPath, 'node_modules/bootstrap/fonts'),
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};
