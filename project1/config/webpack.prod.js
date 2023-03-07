const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const fs = require('fs')

const webpackConfigs = []
const systemSource = 'proj1'

const camelize = s => s.replace(/-./g, x=>x[1].toUpperCase())

// const buildModuleEntry = (moduleName) => {
//   const entry = {};
//   entry[`${moduleName}AsyncModule`] = `./src/modules/${moduleName}/export.js`;
//   return entry;
// }

// const buildModuleWebpackConfig = (moduleName) => {
// 	const moduleFileName = `${moduleName}-${systemSource}`
// 	const config = {
// 		mode: 'production',
// 		entry: buildModuleEntry(moduleName),
// 		output: {
// 			path: path.resolve(__dirname, '../dist/modules'),
// 			filename: `${moduleFileName}/${camelize(moduleName)}AsyncModule.js`,
// 			chunkFilename: `${moduleFileName}/[name].js`,
// 			library: `${camelize(moduleName)}AsyncModule`
// 		},
// 		externals: {
// 			'vue': 'vue'
// 		}
// 	}
// 	return merge(common, config)
// }

// const moduleNames = fs.readdirSync(path.join(__dirname, '../src/modules'))
// moduleNames.forEach((moduleName) => {
// 	const config = buildModuleWebpackConfig(moduleName)
// 	webpackConfigs.push(config)
// })

// module.exports = webpackConfigs;

	// const moduleFileName = `${moduleName}-${systemSource}`
let entry = {}
const moduleNames = fs.readdirSync(path.join(__dirname, '../src/modules'))
moduleNames.forEach((moduleName) => {
	entry[`${moduleName}`] = {
		import: `./src/modules/${moduleName}/export.js`,
		library: {
			name: `${camelize(moduleName)}AsyncModule`,
			type: 'var'
		}
	};
})

const config = {
	mode: 'production',
	entry,
	output: {
		path: path.resolve(__dirname, '../dist/modules'),
		filename: (pathData) => `${pathData.chunk.name}-${systemSource}/${camelize(pathData.chunk.name)}AsyncModule.js`,
		chunkFilename: (pathData) => `camelize(${pathData.chunk.name})/[name].js`,
	},
	externals: {
		'vue': 'vue'
	}
}
module.exports = merge(common, config)