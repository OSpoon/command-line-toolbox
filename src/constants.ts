import type { QuestionCollection } from 'inquirer'
import ora from 'ora'
import pc from 'picocolors'
import pkg from '../package.json'

export const spinner = ora({
  color: 'yellow',
})

export const usage = [
  `${pc.cyan('clt')} ${pc.yellow('<command>')}`,
  '',
  `${pc.bold('Usage:')}`,
  '',
  `${pc.cyan('clt')} ${pc.yellow('create')}                             ${pc.bold('create new project')}`,
  `${pc.cyan('clt')} ${pc.yellow('create --force')}                     ${pc.bold('overlay existing projects')}`,
  `${pc.cyan('clt')} ${pc.yellow('tree')}                               ${pc.bold('print current directory')}`,
  `${pc.cyan('clt')} ${pc.yellow('tree --ignore <pattern>')}            ${pc.bold('ignore unimportant directories')}`,
  `${pc.cyan('clt')} ${pc.yellow('antdv')}                              ${pc.bold('install antdv into the vue-vite-ts project')}`,
  `${pc.cyan('clt')} ${pc.yellow('rm <path> [<path> ...]')}             ${pc.bold('deletes all files and folders at "path", recursively')}`,
  `${pc.cyan('clt')} ${pc.yellow('gitignore <template>')}               ${pc.bold('specifies the template generates .gitignore file')}`,
  `${pc.cyan('clt')} ${pc.yellow('gitignore --list')}                   ${pc.bold('select the template to generate .gitignore file')}`,
  `${pc.cyan('clt')} ${pc.yellow('mkcert <domain> [<domain> ...]')}     ${pc.bold('generate a local trusted development certificate')}`,
  `${pc.cyan('clt')} ${pc.yellow('mkcert --uninstall')}                 ${pc.bold('uninstall the local CA (but do not delete it)')}`,
].join('\n')

export const CREATE_QUESTIONS: Array<QuestionCollection> = [
  {
    type: 'list',
    name: 'template',
    message: 'project template',
    choices: [
      {
        name: 'ospoon/starter-ts',
        value: 'ospoon/starter-ts',
      },
    ],
  },
  {
    type: 'input',
    name: 'name',
    message: 'project name:',
    default: pkg.name || '',
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the project name'
      return true
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'project description:',
    default: pkg.description || '',
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the project description'
      return true
    },
  },
]

export function GITIGNORE_QUESTIONS(templates: string[]): Array<QuestionCollection> {
  return [
    {
      type: 'list',
      name: 'template',
      message: '.gitignore template',
      choices: templates.map((template) => {
        return {
          name: template,
          value: template,
        }
      }),
    },
  ]
}
