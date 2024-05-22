import process from 'node:process'
import minimist from 'minimist'
import pc from 'picocolors'
import { usage } from './constants'
import create from './commands/create'
import antdv from './commands/antdv'
import tree from './commands/tree'
import rm from './commands/rm'
import gitignore from './commands/gitignore'
import mkcert, { uninstall } from './commands/mkcert'
import kill from './commands/kill'
import gituser from './commands/gituser'
import 'dotenv/config'
import log from './console'

async function startup() {
  const argv = minimist(process.argv.slice(2))
  log.d(pc.bold('INPUT ARGS: '), argv)
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
  if (argv._[0] === 'kill')
    await kill(argv._[1])
  if (argv._[0] === 'gituser')
    await gituser(argv._[1])
}

startup()
