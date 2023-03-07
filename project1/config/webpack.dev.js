const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	mode: 'development',
	entry: {
		app: ['./src/main.js']
	},
	devtool: 'inline-source-map',
	devServer: {
		static: [{
			directory: path.resolve(__dirname, '../static'),
			publicPath: '/static'
		}]
	},
	plugins: [
		// html template
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html'),
			inject: true
		})
	]
})