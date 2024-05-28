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

async function builder(templates: string[], argTemplate: string) {
  try {
    const result = await prompts([
      {
        type: argTemplate && templates.includes(argTemplate) ? null : 'select',
        name: 'template',
        message:
          typeof argTemplate === 'string' && !templates.includes(argTemplate)
            ? pc.reset(
                `"${argTemplate}" isn't a valid template. Please choose from below: `,
            )
            : pc.reset('select a template:'),
        initial: 0,
        choices: templates.map((template) => {
          return {
            title: template,
            value: template,
          }
        }),
      },
    ], {
      onCancel: () => {
        throw new Error(`${pc.red('✖')} Operation cancelled`)
      },
    })
    return result
  }
  catch (cancelled: any) {
    log.i(cancelled.message)
  }
}

export default async (argv: any) => {
  const TEMPLATES = await getGitIgnoreList()
  const argTemplate = argv.template || argv.t
  const result = await builder(TEMPLATES, argTemplate)
  // get template from argv or prompt
  const template = result?.template || (TEMPLATES.includes(argTemplate) ? argTemplate : undefined)
  if (!template)
    return
  const source = template && await getGitIgnoreDetail(template)
  try {
    spinner.start(`generate ${template}'s .gitignore file ...`)
    await writeFileSync(join(cwd(), '.gitignore'), source, {
      encoding: 'utf-8',
      flag: 'w',
    })
    // generate success
    spinner.succeed('generate successful')
  }
  catch (error: any) {
    // generate fail
    spinner.fail(error.message)
  }
}
