const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const HtmlWepbackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	mode: 'production',
	entry: {
		app: './src/main.js',
	},
	output: {
		path: path.resolve(__dirname, '../dist/portal'),
		filename: 'js/[name].[chunkhash:5].js',
    chunkFilename: 'js/[name].[chunkhash:3].js',
    publicPath: ''
  },
  devtool: 'source-map',
	plugins: [
		new HtmlWepbackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html')
		})
	]
})