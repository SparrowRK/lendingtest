const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.html',  // точка входа
    output: {
        filename: 'bundle.js',  // имя скомпилированного JS файла
        path: path.resolve(__dirname, 'dist'),
        clean: true,  // очищать dist перед каждой сборкой
    },
    mode: 'production',  // режим для минимизации
    module: {
        rules: [
            // Обработка CSS файлов
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            // Обработка SASS файлов
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',  // Сначала компилируем SASS в CSS
                ],
            },
            // Обработка изображений
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'images',  // сохраняем изображения в папке dist/images
                        },
                    },
                ],
            },
            // Обработка шрифтов (если есть)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'fonts',  // сохраняем шрифты в папке dist/fonts
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // Плагин для обработки HTML
        new HtmlWebpackPlugin({
            template: './src/index.html',  // шаблон HTML
            filename: 'index.html',        // конечный файл
        }),
        // Плагин для извлечения минимизированного CSS
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',  // имя скомпилированного CSS
        }),
        // Плагин для очистки папки dist перед каждой сборкой
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),  // минимизация JavaScript
        ],
    },
    devtool: 'source-map',  // карты для отладки
};