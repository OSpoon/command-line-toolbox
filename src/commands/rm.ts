import shell from 'shelljs'
import { spinner } from '../constants'

export default (pathname: string) => {
  const command = `npx rimraf ${pathname}`
  spinner.start(`deleting ${pathname} ...`)
  shell.exec(command, {
    fatal: true,
    silent: true,
  }, (code: number, _stdout: string, stderr: string) => {
    if (code === 0) {
      // Complete processing
      spinner.succeed('deleted successful')
    }
    else {
      // Abnormal interrupt
      spinner.fail(stderr)
    }
  })
}
