import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as REGEX from './regexConstants';

const rootPath = path.resolve(__dirname, '../../');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

const config = {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: path.join(rootPath, 'src/index'),
    target: 'web',
    output: {
        path: path.join(rootPath, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(rootPath, 'dist')
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {
                test: REGEX.JS_PATH,
                include: path.join(rootPath, 'src'),
                loaders: ['babel-loader']
            },
            {
                test: REGEX.JSON_PATH,
                loaders: ['json-loader']
            },
            {
                test: REGEX.CSS_PATH,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: REGEX.EOT_PATH,
                loader: 'file-loader'
            },
            {
                test: REGEX.WOFF_OR_WOFF2_PATH,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: REGEX.TTF_PATH,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: REGEX.SVG_PATH,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};

export default config;
