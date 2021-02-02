var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: { "index": "./src/js/index.js" },
    target: ['web', 'es5'], // For older browser.
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [[
                            "@babel/env",
                            {
                                targets: {
                                    ie: "11",
                                },
                                useBuiltIns: "usage", // include when used.
                                corejs: '3.0.0', // For older browser.
                            },
                        ], '@babel/react']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            templateContent: (htmlWebpackPlugin) => `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8"/>
                </head>
                <body>
                <div id="demo1"><div id="Calendar"></div></div>
                <div id="demo2"><div id="CalendarInput"></div></div>
                </body>
            </html>
            `
        }),
        new ESLintPlugin()
    ],
    devtool: "inline-source-map",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 5000
    }
};