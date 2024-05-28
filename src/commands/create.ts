import shell from 'shelljs'
import prompts from 'prompts'
import pc from 'picocolors'
import { spinner } from '../constants'
import { formatTargetDir, isValidPackageName, toValidPackageName } from '../utils'

const TEMPLATES = ['ospoon/starter-ts']
const DEFAULT_TARGET_DIR = 'typescript-library-project'

export default async (argv: any) => {
  const argTargetDir = formatTargetDir(argv._[1])
  const argTemplate = argv.template || argv.t

  let targetDir = argTargetDir || DEFAULT_TARGET_DIR

  const { template, packageName, description } = await prompts([
    {
      type: argTargetDir ? null : 'text',
      name: 'projectName',
      message: pc.reset('input project name:'),
      initial: DEFAULT_TARGET_DIR,
      onState: (state) => {
        targetDir = formatTargetDir(state.value) || DEFAULT_TARGET_DIR
      },
    },
    {
      type: () => (isValidPackageName(targetDir) ? null : 'text'),
      name: 'packageName',
      message: pc.reset('input package name:'),
      initial: () => toValidPackageName(targetDir),
      validate: dir =>
        isValidPackageName(dir) || 'Invalid package.json name',
    },
    {
      type: 'text',
      name: 'description',
      message: pc.reset('input description:'),
      initial: () => 'Awesome typescript library project',
      validate: content =>
        !content ? 'Description is required' : true,
    },
    {
      type:
        argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
      name: 'template',
      message:
        typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
          ? pc.reset(
              `"${argTemplate}" isn't a valid template. Please choose from below: `,
          )
          : pc.reset('select a template:'),
      initial: 0,
      choices: TEMPLATES.map((template) => {
        return {
          title: template,
          value: template,
        }
      }),
    },
  ])

  const force = argv.force || false
  const name = packageName || targetDir
  const repo = template || argTemplate
  const commands = [
        `npx degit ${repo} ${name} --force ${force} --color=always`,
        `cd ${name}`,
        `npx ejs ./_README.md name=${name} description=${description} -o ./README.md`,
        `npx ejs ./_package.json name=${name} description=${description} -o ./package.json`,
        `npx rimraf _README.md _package.json`,
        `git init`,
        `npx ni --color=always`,
  ]
  shell.exec(commands.join(' && '), {
    fatal: true,
    silent: false,
  }, (code: number, _stdout: string, stderr: string) => {
    if (code !== 0)
      spinner.fail(stderr)
  })
}
