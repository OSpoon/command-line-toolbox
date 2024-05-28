import type { QuestionCollection } from 'inquirer'
import ora from 'ora'
import pc from 'picocolors'

export const spinner = ora({
  color: 'yellow',
})

export const usage = [
  `${pc.cyan('clt')} ${pc.yellow('<command>')}`,
  '',
  `${pc.bold('Usage:')}`,
  '',
  `${pc.cyan('clt')} ${pc.yellow('create')}                             ${pc.bold('create new project')}`,
  `${pc.cyan('clt')} ${pc.yellow('rm <path> [<path> ...]')}             ${pc.bold('deletes all files and folders at "path", recursively')}`,
  `${pc.cyan('clt')} ${pc.yellow('kill <port>')}                        ${pc.bold('releases the process occupied by the port')}`,
  `${pc.cyan('clt')} ${pc.yellow('tree')}                               ${pc.bold('print current directory')}`,
  `${pc.cyan('clt')} ${pc.yellow('tree --ignore <pattern>')}            ${pc.bold('ignore unimportant directories')}`,
  `${pc.cyan('clt')} ${pc.yellow('antdv')}                              ${pc.bold('install antdv into the vue-vite-ts project')}`,
  `${pc.cyan('clt')} ${pc.yellow('gitignore --template <name>')}        ${pc.bold('specifies the template generates .gitignore file')}`,
  `${pc.cyan('clt')} ${pc.yellow('mkcert <domain> [<domain> ...]')}     ${pc.bold('generate a local trusted development certificate')}`,
  `${pc.cyan('clt')} ${pc.yellow('mkcert --uninstall')}                 ${pc.bold('uninstall the local CA (but do not delete it)')}`,
].join('\n')

export function IPDLIST_QUESTIONS(processes: { protocol: string, local: string, remote: string, pid: string }[]): Array<QuestionCollection> {
  return [
    {
      type: 'list',
      name: 'pid',
      message: 'selected local link:',
      choices: processes.map((process) => {
        return {
          name: `${process.protocol} ${process.local}`,
          value: process.pid,
        }
      }),
    },
  ]
}
