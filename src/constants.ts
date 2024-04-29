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
  'clt vite                        run npm create vite@latest',
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

export const VITE_QUESTIONS: Array<QuestionCollection> = [
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
    type: 'list',
    name: 'template',
    message: 'project template',
    choices: [
      {
        name: 'vanilla',
        value: 'vanilla',
      },
      {
        name: 'vanilla-ts',
        value: 'vanilla-ts',
      },
      {
        name: 'vue',
        value: 'vue',
      },
      {
        name: 'vue-ts',
        value: 'vue-ts',
      },
      {
        name: 'react',
        value: 'react',
      },
      {
        name: 'react-ts',
        value: 'react-ts',
      },
      {
        name: 'react-swc',
        value: 'react-swc',
      },
      {
        name: 'react-swc-ts',
        value: 'react-swc-ts',
      },
      {
        name: 'preact',
        value: 'preact',
      },
      {
        name: 'preact-ts',
        value: 'preact-ts',
      },
      {
        name: 'lit',
        value: 'lit',
      },
      {
        name: 'lit-ts',
        value: 'lit-ts',
      },
      {
        name: 'svelte',
        value: 'svelte',
      },
      {
        name: 'svelte-ts',
        value: 'svelte-ts',
      },
      {
        name: 'solid',
        value: 'solid',
      },
      {
        name: 'solid-ts',
        value: 'solid-ts',
      },
      {
        name: 'qwik',
        value: 'qwik',
      },
      {
        name: 'qwik-ts',
        value: 'qwik-ts',
      },
    ],
  },
]
