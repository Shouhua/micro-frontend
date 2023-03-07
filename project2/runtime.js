import router from './src/app.router.js'
import App from './src/App.vue'
// import webpackAssets from './static/assets-manifest.json'
import * as vue from 'vue'
import menus from './src/menu.js'

window.vue = vue

const camelize = s => s.replace(/-./g, x=>x[1].toUpperCase())
const isDev = process.env.NODE_ENV === 'development';

const registerRouter = (route) => {
  router.addRoute(route)
}

const registerStore = (storeConfig) => {}

const loadScript = path => new Promise(((resolve, reject) => {
  const script = document.createElement('script');
  script.src = path;
  script.async = true;
  script.onload = () => {
    resolve();
  };
  script.onerror = () => {
    reject();
  };
  document.body.appendChild(script);
}));

const loadCss = path => new Promise(((resolve, reject) => {
  const link = document.createElement('link');
  link.href = path;
  link.rel = 'stylesheet';
  link.type = "text/css";
  link.onload = () => {
    resolve();
  };
  link.onerror = () => {
    reject();
  };
  document.getElementsByTagName('head')[0].appendChild(link);
}));

const assetsPath = 'static'
// const dashboardName = webpackAssets["dashboardAsyncModule.js"];
// const dashboardPath = `${assetsPath}${dashboardName}`;

// const aboutName = webpackAssets["aboutAsyncModule.js"];
// const aboutPath = `${assetsPath}${aboutName}`;

let existModulesContextMap = {}
// {name, source}
const asyncLoadModuleDev = (module, resolve) => {
  if(process.env.NODE_ENV === 'development') {
    existModulesContextMap = require('vue-dynamic-modules')
  }
  const moduleContext = existModulesContextMap[module.name]
  let moduleContent = null

  if (moduleContext) {
    const asyncModule = moduleContext(moduleContext.keys()[0]).default;
    moduleContent = asyncModule.module;
  } else {
    moduleContent = {
      render() {
        return vue.h('div', `模块${module.name}不在本工程或者没有编译`)
      }
    }
  }
  resolve(moduleContent)
}

// {name, source}
const asyncLoadModuleProd = (module, resolve) => {
  const moduleDirectoryPath = `${module.name}-${module.source}`
  const modulePath = `${camelize(module.name)}AsyncModule`
  const moduleScriptPath = `/${moduleDirectoryPath}/${modulePath}.js`
  loadScript(moduleScriptPath).then(() => {
    // register route
    // register vuex sotre
    // console.log(window[`${module.name}AsyncModule`].default);
    resolve(window[`${camelize(module.name)}AsyncModule`].default.module);
  }, () => {
    window.alert('模块可能不存在')
  });
}

const asyncLoadModule = isDev ? asyncLoadModuleDev : asyncLoadModuleProd;
// {name, source}
menus.forEach((menu) => {
  router.addRoute({
    path: `/${menu.name}`,
    component: () => new Promise(resolve => asyncLoadModule({
      name: `${menu.name}`,
      source: `${menu.source}`
    }, resolve))
  })
})

// ;['dashboard', 'about'].forEach(p => {
//   router.addRoute({
//     path: `/${p}`,
//     component: () => new Promise(resolve => asyncLoadModule({
//       name: `${p}AsyncModule`,
//       path: eval(`${p}Path`),
//       // cssPath: cssModule
//     }, resolve)) 
//   });  
// });