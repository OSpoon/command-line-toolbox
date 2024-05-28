import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { Octokit } from '@octokit/core'
import prompts from 'prompts'
import pc from 'picocolors'
import log from '../console'
import { spinner } from '../constants'

const octokit = new Octokit()

async function getGitIgnoreList() {
  const { data } = await octokit.request('GET /gitignore/templates', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return data
}

async function getGitIgnoreDetail(template: string) {
  const { data } = await octokit.request(`GET /gitignore/templates/${template}`, {
    name: template,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  return data.source
}

export default async (argv: any) => {
  const TEMPLATES = await getGitIgnoreList()
  const argTemplate = argv.template || argv.t
  let result: prompts.Answers<'template'>
  try {
    result = await prompts([
      {
        type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
        name: 'template',
        message: pc.reset('select a template:'),
        initial: 0,
        choices: TEMPLATES.map((template) => {
          return {
            title: template,
            value: template,
          }
        }),
      },
    ])
  }
  catch (cancelled: any) {
    log.i(cancelled.message)
    return
  }
  const template = result?.template || argTemplate
  const source = template && await getGitIgnoreDetail(template)
  if (!source)
    log.i(pc.red(`${template} is not exist`))

  try {
    spinner.start(`generate ${template}'s .gitignore file ...`)
    await writeFileSync(join(cwd(), '.gitignore'), source, {
      encoding: 'utf-8',
      flag: 'w',
    })
    // generate successful
    spinner.succeed('generate successful')
  }
  catch (error: any) {
    // generate failure
    spinner.fail(error.message)
  }
}
