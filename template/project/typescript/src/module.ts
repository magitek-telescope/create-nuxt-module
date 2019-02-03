import { ModuleOptions } from './types/nuxt'
// import { createMiddleware } from './module.middleware'
// import plugin from './module.plugin'

const optionName = 'kjs15'

type TODO = any

module.exports = function (this: TODO, moduleOptions: ModuleOptions) {
  const consola = require('consola')
  const options = Object.assign({}, this.options[optionName], moduleOptions || {})
  const { enabled } = options
  if (enabled === false) {
    consola.info('Skip activation of kjs15 module')
    return false
  }
  consola.info('Add kjs15 module to server middleware')
  return true
}

module.exports.meta = require('../package.json')
