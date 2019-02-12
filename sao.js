const { random: superb } = require('superb')
const glob = require('glob')
const { join } = require('path')
const validate = require('validate-npm-package-name')

const rootDir = __dirname

const move = (from, to = '') => {
  const result = {}
  const options = { cwd: join(rootDir, 'template'), nodir: true, dot: true }
  for (const file of glob.sync(`${from}/**`, options)) {
    result[file] = (to ? to + '/' : '') + file.replace(`${from}/`, '')
  }
  return result
}

const moveLanguage = (answer, to = '') => {
  console.log(`project/${answer}`)
  return answer !== 'none' && move(`project/${answer}`, to)
}

module.exports = {
  prompts: {
    name: {
      message: 'Project name',
      default: ':folderName:'
    },
    description: {
      message: 'Project description',
      default: `My ${superb()} Nuxt.js project`
    },
    language: {
      message: 'Choose development language',
      type: 'list',
      choices: ['javascript', 'typescript'],
      default: 'javascript'
    },
    author: {
      type: 'string',
      message: 'Author name',
      default: ':gitUser:',
      store: true
    },
    pm: {
      message: 'Choose a package manager',
      choices: ['npm', 'yarn'],
      type: 'list',
      default: 'yarn'
    }
  },
  filters: {
    'project/javascript/**': 'language === "javascript"',
    'project/typescript/**': 'language === "typescript"'
  },
  move(answers) {
    const validation = validate(answers.name)
    validation.warnings &&
      validation.warnings.forEach(warn => {
        console.warn('Warning:', warn)
      })
    validation.errors &&
      validation.errors.forEach(err => {
        console.error('Error:', err)
      })
    validation.errors && validation.errors.length && process.exit(1)
    return Object.assign(moveLanguage(answers.language))
  },
  post(
    {
      npmInstall,
      yarnInstall,
      gitInit,
      chalk,
      isNewFolder,
      folderName,
      folderPath
    },
    { meta }
  ) {
    gitInit()

    // using yarn or npm
    meta.answers.pm === 'yarn' ? yarnInstall() : npmInstall()

    const cd = () => {
      if (isNewFolder) {
        console.log(`\t${chalk.cyan('cd')} ${folderName}`)
      }
    }

    cd()
    console.log()
    console.log(chalk.bold(`\tTo get started:\n`))
    cd()
    console.log(`\t ${meta.answers.pm} run dev\n`)
    cd()
    if (meta.answers.language === 'typescript') {
      console.log(chalk.bold(`  To build TypeScript code:\n`))
      console.log(`\t ${meta.answers.pm} run build`)
      console.log(`\t ${meta.answers.pm} run watch # watch mode`)
    }

    console.log(chalk.bold(`\n  To test:\n`))
    cd()
    console.log(`\t ${meta.answers.pm} run test`)
    console.log()
  }
}
