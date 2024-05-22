import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'
import yaml from 'yaml'
import inquirer from 'inquirer'
import shell from 'shelljs'
import pc from 'picocolors'
import log from '../console'
import { ADD_GIT_USER_QUESTIONS, REMOVE_GIT_USER_QUESTIONS, USE_GIT_USER_QUESTIONS, spinner } from '../constants'

const gitUserProfilesPath = join(homedir(), '.git-user-profiles')

async function add() {
  const users = []
  if (existsSync(gitUserProfilesPath)) {
    const text = readFileSync(gitUserProfilesPath, 'utf8')
    users.push(...yaml.parse(text))
    log.i(pc.bold('Existing users:\n'))
    users.forEach((user) => {
      const tagify = `[${user.tag}]${''.padEnd(10 - user.tag.length, ' ')}`
      log.i(' ', pc.bold(tagify), pc.green(`${user.user} ${user.email}`))
    })
    log.i('')
  }
  // 开始新增
  const { tag, user, email } = await inquirer.prompt(ADD_GIT_USER_QUESTIONS)
  users.push({
    tag: tag.trim(),
    user: user.trim(),
    email: email.trim(),
  })
  writeFileSync(gitUserProfilesPath, yaml.stringify(users))
}

async function remove() {
  const users = []
  if (existsSync(gitUserProfilesPath)) {
    const text = readFileSync(gitUserProfilesPath, 'utf8')
    users.push(...yaml.parse(text))
  }

  if (users.length) {
    const { info } = await inquirer.prompt(REMOVE_GIT_USER_QUESTIONS(users))
    const [tag, user, email] = info.split(' ')
    const result = users.filter(u => u.tag !== tag && u.user !== user && u.email !== email)
    writeFileSync(gitUserProfilesPath, yaml.stringify(result))
  }
}

async function use() {
  if (existsSync(gitUserProfilesPath)) {
    const text = readFileSync(gitUserProfilesPath, 'utf8')
    const { info, scope } = await inquirer.prompt(USE_GIT_USER_QUESTIONS(yaml.parse(text)))
    const commands = [
        `git config ${scope}user.name ${info.split(' ')[0]} --add`,
        `git config ${scope}user.email ${info.split(' ')[1]} --add`,
    ]
    shell.exec(commands.join(' && '), {
      fatal: true,
      silent: true,
    }, (code: number, _stdout: string, stderr: string) => {
      if (code === 0) {
        // Complete processing
        spinner.succeed(`git user toggle successful`)
      }
      else {
        // Abnormal interrupt
        spinner.fail(stderr)
      }
    })
  }
  else {
    log.i(`💡 use ${pc.cyan('clt')} ${pc.yellow('gituser add')} to add users`)
  }
}

export default async (command: string) => {
  if (command === undefined)
    await use()
  if (command === 'add')
    await add()
  if (command === 'remove')
    await remove()
}
