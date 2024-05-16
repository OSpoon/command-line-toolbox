import process from 'node:process'
import minimist from 'minimist'
import { usage } from './constants'
import create from './commands/create'
import antdv from './commands/antdv'
import tree from './commands/tree'
import rm from './commands/rm'
import gitignore from './commands/gitignore'
import mkcert, { uninstall } from './commands/mkcert'
import 'dotenv/config'
import log from './console'

async function startup() {
  const argv = minimist(process.argv.slice(2))
  log.d('args: ', argv)
  if (argv._.length === 0) {
    log.i(usage)
    process.exit(0)
  }
  if (argv._[0] === 'create')
    await create(argv)
  if (argv._[0] === 'antdv')
    await antdv()
  if (argv._[0] === 'tree')
    tree(argv.ignore || [])
  if (argv._[0] === 'rm')
    rm(argv._.slice(1))
  if (argv._[0] === 'gitignore')
    await gitignore(argv._[1], argv.list)
  if (argv._[0] === 'mkcert' && !argv.uninstall)
    await mkcert(argv._.slice(1))
  if (argv._[0] === 'mkcert' && argv.uninstall)
    await uninstall()
}

startup()
