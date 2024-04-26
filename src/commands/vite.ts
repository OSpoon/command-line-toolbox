import shell from 'shelljs'
import inquirer from 'inquirer'
import { VITE_QUESTIONS, spinner } from '../constants'

export default async () => {
  const { name, template } = await inquirer.prompt(VITE_QUESTIONS)
  const command = `npm create vite@latest ${name} -- --template ${template}`
  spinner.start('init project template ...')
  shell.exec(command, {
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
