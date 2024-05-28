import shell from 'shelljs'
import { spinner } from '../constants'

export default (path: string[]) => {
  const command = `npx rimraf ${path.join(' ')}`
  spinner.start(`rm -rf ${path.join(' ')} ...`)
  shell.exec(command, {
    fatal: true,
    silent: true,
  }, (code: number, _stdout: string, stderr: string) => {
    if (code === 0) {
      // Complete processing
      spinner.succeed('remove successful')
    }
    else {
      // Abnormal interrupt
      spinner.fail(stderr)
    }
  })
}
