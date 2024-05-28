import process from 'node:process'
import shell from 'shelljs'
import iconv from 'iconv-lite'
import inquirer from 'inquirer'
import { IPDLIST_QUESTIONS, spinner } from '../constants'
import log from '../console'

function decode(content: string) {
  return iconv.decode(iconv.encode(content, 'base64'), 'gb2312')
}

async function killWin(port: string) {
  shell.exec(`netstat -nao | findstr LISTENING`, {
    fatal: true,
    silent: true,
    encoding: 'base64',
  }, async (code, stdout, stderr) => {
    if (code === 0) {
      const output = decode(stdout)
      const lines = output.split('\n').filter(i => i).map((line) => {
        const [protocol, local, remote, _, pid] = line.split(' ').filter(i => i)
        return {
          protocol,
          local,
          remote,
          pid: pid.replace('\r', ''),
        }
      })
      const data = lines.filter(l => new RegExp(`^(\\d.*|\\[[:1]*\\]):${port}$`).test(l.local))
      const { pid } = await inquirer.prompt(IPDLIST_QUESTIONS(data))
      shell.exec(`taskkill /F /PID ${pid}`, {
        fatal: true,
        silent: true,
        encoding: 'base64',
      }, (code, stdout, stderr) => {
        if (code === 0) {
          // kill successful
          log.i(decode(stdout))
        }
        else {
          // kill failed
          log.i('stderr \n', decode(stderr))
        }
      })
    }
    else {
      log.d('stderr \n', decode(stderr))
    }
  })
}

function killUnix(port: string) {
  shell.exec(`lsof -t -i:${port} | xargs kill -9`, {
    fatal: true,
    silent: true,
  }, (code: number, _stdout: string, stderr: string) => {
    if (code === 0) {
      // Complete processing
      spinner.succeed(`kill ${port} successful`)
    }
    else {
      // Abnormal interrupt
      spinner.fail(stderr)
    }
  })
}

export default async (port: string) => {
  const platform = process.platform === 'win32' ? 'win' : 'unix'
  const command = {
    unix: killUnix,
    win: killWin,
  }
  await command[platform](port)
}
