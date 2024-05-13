import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import inquirer from 'inquirer'
import { Octokit } from '@octokit/core'
import { GITIGNORE_QUESTIONS, spinner } from '../constants'

const octokit = new Octokit()

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default async (name: any, list: boolean) => {
  let template = name
  if (list || !name) {
    const { data } = await octokit.request('GET /gitignore/templates', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    const answer = await inquirer.prompt(GITIGNORE_QUESTIONS(data))
    template = answer.template
  }
  const { data } = await octokit.request(`GET /gitignore/templates/${capitalizeFirstLetter(template)}`, {
    name: capitalizeFirstLetter(template),
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  spinner.start(`generate ${template}'s .gitignore file ...`)
  try {
    await writeFileSync(join(cwd(), '.gitignore'), data.source, {
      encoding: 'utf-8',
      flag: 'w',
    })
    // // generate successful
    spinner.succeed('generate successful')
  }
  catch (error: any) {
    // generate failure
    spinner.fail(error.message)
  }
}
