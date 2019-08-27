const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('allstyles.css');

module.exports = {

    entry: {

        'main': './wwwroot/source/app.js',

        vendor: ['react']

    },

    output: {

        path: path.resolve(__dirname, 'wwwroot/dist'),

        filename: '[name].bundle.js',

        // Use publicPath, starting with /, i.e. /dist/ instead of dist/.
        // Otherwise, paths to your assets will be interpreted as relative and if one sass document, 
        // say, dist/daddy.scss imports another one from e.g. dist/child.scss, 
        // the path to child will be interpreted as relative to daddy's url "folder", 
        // which is dist, so browser will look for dist/dist/child.scss.
        publicPath: '/dist/'
    },

    // add this for the source map
    devtool: 'source-map',

    plugins: [
        extractCSS,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),


        // see optimization for the newer better way
        //new webpack.optmize.CommonsChunkPlugin({
        //    name: 'vendor',
        //}),

        // started seeing source maps after commenting this out
        // new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
        rules: [{
                test: /\.css$/,
                use: extractCSS.extract(['css-loader?minimize']),
            },
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jp(e*)g|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 4000,
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
        ]
    }
};