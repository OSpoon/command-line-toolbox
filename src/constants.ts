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
  'clt create                      create new project',
  'clt create --force              overlay existing projects',
  'clt antdv                       install antdv into the vue-vite-ts project',
].join('\n')

export const CREATE_QUESTIONS: Array<QuestionCollection> = [
  {
    type: 'list',
    name: 'template',
    message: 'project template',
    choices: [
      {
        name: 'ospoon/pkg-template-ts',
        value: 'ospoon/pkg-template-ts',
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
