import { ModuleOptions } from './types/nuxt'
// import { createMiddleware } from './module.middleware'
// import plugin from './module.plugin'

const optionName = '{{name}}'

module.exports = function (moduleOptions: ModuleOptions) {
  const consola = require('consola')
  const options = Object.assign({}, this.options[optionName], moduleOptions || {})
  const { enabled } = options
  if (enabled === false) {
    consola.info('Skip activation of {{name}} module')
    return false
  }
  consola.info('Add {{name}} module to server middleware')
  return true
}

module.exports.meta = require('../package.json')
