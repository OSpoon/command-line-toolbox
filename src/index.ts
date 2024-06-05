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
import remote from './commands/remote'
import 'dotenv/config'
import log from './console'

async function startup() {
  const argv = minimist(process.argv.slice(2), { string: ['_'] })
  log.d(pc.bold('INPUT ARGS: '), argv)
  if (argv._.length === 0) {
    log.i(usage)
    process.exit(0)
  }

  const command = argv._[0]
  const args = argv._.slice(1)

  const commandMap = {
    create: async () => await create(argv),
    antdv: async () => await antdv(),
    tree: () => tree(argv.ignore || []),
    rm: () => rm(args),
    gitignore: async () => await gitignore(argv),
    mkcert: async () => await mkcert(args),
    uninstall: async () => await uninstall(),
    kill: async () => await kill(argv._[1]),
    remote: async () => await remote(argv),
  }

  if (command in commandMap) {
    if (command === 'mkcert' && argv.uninstall)
      await commandMap.uninstall()
    else
      await Reflect.get(commandMap, command)()
  }
  else {
    log.i(`未知的命令: ${command}`)
    process.exit(1)
  }
}

// 执行启动函数
startup().catch((error) => {
  log.e('Error during startup:', error)
  process.exit(1)
})
