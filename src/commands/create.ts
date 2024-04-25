import inquirer from 'inquirer'
import ora from 'ora'
import shell from 'shelljs'
import { CREATE_QUESTIONS } from '../constants'

const spinner = ora({
  color: 'yellow',
})

export default async (argv: any) => {
  const { template, name, description } = await inquirer.prompt(CREATE_QUESTIONS)
  const commands = [
        `npx degit ${template} ${name} --force ${argv.force || false}`,
        `cd ${name}`,
        `npx ejs ./_README.md name=${name} description=${description} -o ./README.md`,
        `npx ejs ./_package.json name=${name} description=${description} -o ./package.json`,
        `npx rimraf _README.md _package.json`,
  ]
  spinner.start('init project template ...')
  shell.exec(commands.join(' && '), {
    fatal: true,
    silent: true,
  }, (code: number, _stdout: string, stderr: string) => {
    if (code === 0) {
      // Complete processing
      spinner.succeed('init project template successful')
    }
    else {
      // Abnormal interrupt
      spinner.fail(stderr)
    }
  })
}
