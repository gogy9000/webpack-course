const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const {BundleAnalyzerPlugin}=require('webpack-bundle-analyzer')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const fileName = (ext) => {
  return isDev? `[name].${ext}`: `[name].[hash].${ext}`
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const cssLoaders = (extra) => {
  const loaders=[MiniCssExtractPlugin.loader,
        // {
        // loader: MiniCssExtractPlugin.loader,
        // options: {
        //     hmr: isDev,
        //     reloadAll:true
        // }
        // },
        'css-loader']

    if(extra){
        loaders.push(extra)
    }
    return loaders
}

const babelLoaders = (preset) => {
  const loaders=[{
      loader: 'babel-loader',
      options: {
          presets:[
              '@babel/preset-env'
          ],
          plugins: [
              '@babel/plugin-proposal-class-properties'
          ]
      }
  }]
  if(preset){
      loaders[0].options.presets.push(preset)
  }

  return loaders
}

const pluginsBuilder = () => {
  const plugins=[
      new HtmlWebpackPlugin({
          template: "./index.html",
          minify: {
              collapseWhitespace: isProd
          }
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(
          {
              patterns: [
                  {
                      from: path.resolve(__dirname, './src/favicon.ico'),
                      to: path.resolve(__dirname, 'dist/favicon.ico')
                  }
              ]
          }
      ),
      new MiniCssExtractPlugin({
          filename: fileName('css'),
      }),
      new ESLintPlugin()
  ]
    if(isProd){
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins
}

console.log('IS PROD', isProd)
console.log('IS DEV', isDev)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: isDev&& 'source-map',
    mode: "development",
    entry: {
        main: ['@babel/polyfill','./index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [
            '.js', '.son', '.png'
        ],
        alias: {
            '@models': path.resolve(__dirname, 'models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: pluginsBuilder(),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:babelLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use:babelLoaders('@babel/preset-typescript')
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use:babelLoaders('@babel/preset-react')
            },
            {
                test: /\.css$/,
                use:cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use:cssLoaders('sass-loader')
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }, {
                test: /\.csv$/,
                use: ['csv-loader']
            }

        ]
    }
}