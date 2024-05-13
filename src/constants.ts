import type { QuestionCollection } from 'inquirer'
import ora from 'ora'
import pkg from '../package.json'

export const spinner = ora({
  color: 'yellow',
})

export const usage = [
  'clt <command>',
  'Usage:',
  '',
  'clt create                             create new project',
  'clt create --force                     overlay existing projects',
  'clt tree                               print current directory',
  'clt tree --ignore <pattern>            ignore unimportant directories',
  'clt antdv                              install antdv into the vue-vite-ts project',
  'clt rm <path> [<path> ...]             deletes all files and folders at "path", recursively.',
  'clt gitignore <template>               specifies the template generates .gitignore file',
  'clt gitignore --list                   select the template to generate .gitignore file',
  'clt mkcert <domain> [<domain> ...]     generate a local trusted development certificate',
  'clt mkcert --uninstall                 uninstall the local CA (but do not delete it)',
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
