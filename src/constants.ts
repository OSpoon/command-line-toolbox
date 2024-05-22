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
  `${pc.cyan('clt')} ${pc.yellow('kill <port>')}                        ${pc.bold('releases the process occupied by the port')}`,
  `${pc.cyan('clt')} ${pc.yellow('gituser')}                            ${pc.bold('toggle git user information')}`,
  `${pc.cyan('clt')} ${pc.yellow('gituser add')}                        ${pc.bold('add git user information')}`,
  `${pc.cyan('clt')} ${pc.yellow('gituser remove')}                     ${pc.bold('delete git user information')}`,
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
      message: '.gitignore template:',
      choices: templates.map((template) => {
        return {
          name: template,
          value: template,
        }
      }),
    },
  ]
}

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

export const ADD_GIT_USER_QUESTIONS: Array<QuestionCollection> = [
  {
    type: 'input',
    name: 'tag',
    message: 'git user tag:',
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the git user tag'
      return true
    },
  },
  {
    type: 'input',
    name: 'user',
    message: 'git user:',
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the git user'
      return true
    },
  },
  {
    type: 'input',
    name: 'email',
    message: 'git email:',
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the git email'
      return true
    },
  },
]

export function USE_GIT_USER_QUESTIONS(users: { tag: string, user: string, email: string }[]): Array<QuestionCollection> {
  return [
    {
      type: 'list',
      name: 'info',
      message: 'selected git user:',
      choices: users.map((user) => {
        const tagify = `[${user.tag}]${''.padEnd(10 - user.tag.length, ' ')}`
        return {
          name: `${tagify} ${user.user} ${user.email}`,
          value: `${user.user} ${user.email}`,
        }
      }),
    },
    {
      type: 'list',
      name: 'scope',
      message: 'selected git scope:',
      choices: [
        { name: 'project', value: '' },
        // 结尾空格请勿删除
        { name: 'global', value: '--global ' },
      ],
    },
  ]
}

export function REMOVE_GIT_USER_QUESTIONS(users: { tag: string, user: string, email: string }[]): Array<QuestionCollection> {
  return [
    {
      type: 'list',
      name: 'info',
      message: 'selected git user:',
      choices: users.map((user) => {
        const tagify = `[${user.tag}]${''.padEnd(10 - user.tag.length, ' ')}`
        return {
          name: `${tagify} ${user.user} ${user.email}`,
          value: `${user.tag} ${user.user} ${user.email}`,
        }
      }),
    },
  ]
}
