const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('./webpack.dev.js')
const VirtualModulesPlugin = require('webpack-virtual-modules')
const fs = require('fs')
const path = require('path')

let modules = '';

if (process.env.npm_config_module && process.env.npm_config_module !== '') {
	modules = process.env.npm_config_module;
} else {
	// 将modules下面模块加进虚拟模块
	modules = fs.readdirSync(path.join(__dirname, '../src/modules')).join(',')
}

let buildDynamicModules = []
buildDynamicModules = modules.split(',').map((module, index) => {
	fs.access(path.join(`./src/modules/${module}/export.js`), function (err) {
		if (err) {
			console.log(`\n\n注意：${module} 模块不存在!\n`);
			process.exit(0);
		}
	});
	return `"${module}": require.context("@/modules/${module}", false, /export\.js$/)`
})

const virtualModules = new VirtualModulesPlugin({
	'node_modules/vue-dynamic-modules.js': `module.exports = { ${buildDynamicModules.join(',')}}`
})

webpackDevConfig.plugins.push(virtualModules)

const compiler = Webpack(webpackDevConfig)
const devServerOptions = { ...webpackDevConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler)

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

runServer();