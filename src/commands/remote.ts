import os from 'node:os'
import shell from 'shelljs'

function getRrmoteUrl(name: string) {
  const { code, stdout } = shell.exec(`git remote get-url ${name}`, { silent: true })
  if (code === 0 && stdout)
    return stdout.trim()
  return ''
}

function genCommand(remoteUrl: string) {
  return {
    win32: `start ${remoteUrl}`,
    darwin: `open ${remoteUrl}`,
    linux: `xdg-open ${remoteUrl}`,
  }
}

export default (argv: any) => {
  const remote = argv._[1] || 'origin'
  const platform = os.platform().toString()
  const url = getRrmoteUrl(remote)
  if (url) {
    const command = Reflect.get(genCommand(url), platform)
    shell.exec(command)
  }
}
