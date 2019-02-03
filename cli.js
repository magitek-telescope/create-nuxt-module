#!/usr/bin/env node
const path = require('path')
const sao = require('sao')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const targetPath = path.resolve(argv._[0] || '.')

console.log(`> Generating Nuxt.js module in ${targetPath}`)

sao({
  template: __dirname,
  targetPath
}).catch(err => {
  console.error(err.name === 'SAOError' ? err.message : err.stack)
  process.exit(1)
})
