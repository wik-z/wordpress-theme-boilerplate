process.noDeprecation = true;

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;

const setPath = function (folderName) {
    return path.join(__dirname, folderName);
}
const isProd = function () {
    return (process.env.NODE_ENV === 'production') ? true : false;
}

const buildingForLocal = () => {
    return (NODE_ENV === 'development');
};

const extractCSS = new ExtractTextPlugin({
    filename: "../css/[name].css"
});

const config = {
    entry: {
        app: './assets/js/src/app.js',
    },
    output: {
        filename: 'app.js',
        path: setPath('assets/js'),
    },
    optimization: {
        minimize: !buildingForLocal(),
    },
    resolveLoader: {
        modules: [setPath('node_modules')]
    },
    mode: buildingForLocal() ? 'development' : 'production',
    plugins: [
        extractCSS,
        new webpack.DefinePlugin({
            'process.env': {
                isStaging: (NODE_ENV === 'development' || NODE_ENV === 'staging'),
                NODE_ENV: '"' + NODE_ENV + '"'
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: { presets: ['es2015'] }
                }]
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.scss$/,
                use: !buildingForLocal() ?
                    extractCSS.extract({
                        fallback: "style-loader",
                        use: ['css-loader', 'sass-loader']
                    }) :
                    [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
            },
        ]
    },
};
module.exports = config;