import process from 'node:process'
import { join } from 'node:path'
import { createWriteStream, existsSync } from 'node:fs'
import { chmod, mkdir, unlink } from 'node:fs/promises'
import { homedir } from 'node:os'
import { log } from 'node:console'
import { Octokit } from '@octokit/core'
import axios from 'axios'
import shell from 'shelljs'
import { spinner } from '../constants'

function fullFileName(tagName: string) {
  const targetValues = {
    'darwin-x64': 'darwin-amd64',
    'darwin-arm64': 'darwin-arm64',
    'linux-x64': 'linux-amd64',
    'linux-arm': 'linux-arm',
    'linux-arm64': 'linux-arm64',
    'win32-x64': 'windows-amd64.exe',
    'win32-arm64': 'windows-arm64.exe',
  }

  const platform = process.platform
  const architecture = process.arch
  const key = `${platform}-${architecture}`
  const target = Reflect.get(targetValues, key)
  return `mkcert-${tagName}-${target}`
}

async function downloadFile(remoteUrl: string, filePath: string) {
  return new Promise((resolve, reject) => {
    spinner.start(`downloading mkcert ...`)
    axios.get(remoteUrl, {
      responseType: 'stream', // 设置响应类型为流
    }).then((resp) => {
      // 创建可写流并将响应数据写入文件
      const writer = createWriteStream(filePath)
      resp.data.pipe(writer)
      // 监听写入完成事件
      writer.on('finish', async () => {
        resolve('finish')
      })
    }).catch(async (error) => {
      await unlink(filePath) // 删除未完成的文件
      reject(error)
    })
  })
}

async function getSourceInfo() {
  const octokit = new Octokit()
  const { data } = await octokit.request('GET /repos/FiloSottile/mkcert/releases/latest')
  const version = data.tag_name
  const filename = fullFileName(version)
  const url = data.assets.find((i: { name: string }) =>
    i.name.includes(filename),
  )?.browser_download_url
  return {
    filename,
    url,
  }
}

async function getMkcertSourceFile(remoteUrl: string, filePath: string) {
  try {
    await mkdir(join(homedir(), '.mkcert'), { recursive: true })
    await downloadFile(remoteUrl, filePath)
    await chmod(filePath, 0o777)
    spinner.stopAndPersist({
      text: `download mkcert successfully, please restart the program.`,
    })
  }
  catch (error) {
    spinner.stopAndPersist({
      text: `download mkcert failed, please try again. \n ${error}`,
    })
  }
}

function uninstall(cmd: string) {
  shell.exec(`${cmd} -uninstall`, {
    fatal: true,
    silent: true,
  }, (_code: number, _stdout: string, stderr: string) => {
    log(stderr)
  })
}

function generate(cmd: string, hosts: string[]) {
  const commands = [
    `${cmd} -install`,
    `${cmd} ${hosts.join(' ')}`,
  ]
  shell.exec(commands.join(' && '), {
    fatal: true,
    silent: true,
  }, (_code: number, _stdout: string, stderr: string) => {
    log(stderr)
  })
}

export default async (argv: any) => {
  const { url: remoteUrl, filename } = await getSourceInfo()
  const filePath = join(homedir(), `.mkcert`, filename)
  if (!existsSync(filePath)) {
    await getMkcertSourceFile(remoteUrl, filePath)
  }
  else {
    if (argv.uninstall)
      uninstall(filePath)
    if (argv.host) {
      const hosts = typeof argv.host === 'string' ? [argv.host] : argv.host
      generate(filePath, hosts)
    }
  }
}
