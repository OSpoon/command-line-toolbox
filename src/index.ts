import process from 'node:process'
import { log } from 'node:console'
import minimist from 'minimist'
import { usage } from './constants'
import create from './commands/create'
import antdv from './commands/antdv'
import vite from './commands/vite'
import tree from './commands/tree'
import rm from './commands/rm'
import image from './commands/image'
import gitignore from './commands/gitignore'
import mkcert from './commands/mkcert'

async function startup() {
  const argv = minimist(process.argv.slice(2))
  log('args: ', argv)
  if (argv._.length === 0) {
    log(usage)
    process.exit(0)
  }
  if (argv._[0] === 'create')
    await create(argv)
  if (argv._[0] === 'antdv')
    await antdv()
  if (argv._[0] === 'vite')
    await vite()
  if (argv._[0] === 'tree')
    tree(argv.ignore || [])
  if (argv._[0] === 'rm')
    rm(argv._.slice(1))
  if (argv._[0] === 'image')
    await image(argv)
  if (argv._[0] === 'gitignore')
    await gitignore(argv)
  if (argv._[0] === 'mkcert')
    await mkcert(argv)
}

startup()
