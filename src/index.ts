import process from 'node:process'
import { log } from 'node:console'
import minimist from 'minimist'
import { usage } from './constants'
import create from './commands/create'
import antdv from './commands/antdv'
import vite from './commands/vite'

async function startup() {
  const argv = minimist(process.argv.slice(2))
  log(argv)
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
}

startup()
