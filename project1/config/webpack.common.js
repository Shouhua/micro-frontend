const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin} = require('webpack')

module.exports = {
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
		publicPath: '',
		clean: true
	},
	module:{
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader'
		}]
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, '../src')
		},
		extensions: ['.js', '.vue']
	},
	plugins: [
		new VueLoaderPlugin(),
		new DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true
		})
	]
}