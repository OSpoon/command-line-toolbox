import fs from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import { minimatch } from 'minimatch'
import log from '../console'

function filterFiles(files: string[], patterns: string[]): string[] {
  return files.filter((file) => {
    for (const pattern of patterns) {
      if (minimatch(file, pattern))
        return false
    }
    return true
  })
}

function sortFiles(files: string[]): string[] {
  const directories = files.filter(file => fs.statSync(file).isDirectory()).sort()
  const hiddenDirectories = directories.filter(file => file.startsWith('.')).sort()
  const visibleDirectories = directories.filter(file => !file.startsWith('.')).sort()
  const regularFiles = files.filter(file => fs.statSync(file).isFile()).sort()
  const hiddenFiles = regularFiles.filter(file => file.startsWith('.')).sort()
  const visibleFiles = regularFiles.filter(file => !file.startsWith('.')).sort()

  return [...hiddenDirectories, ...visibleDirectories, ...hiddenFiles, ...visibleFiles]
}

function tree(dir: string, prefix: string = '', patterns: string[]): void {
  const files = fs.readdirSync(dir).map(file => path.join(dir, file))
  const filteredFiles = filterFiles(files, patterns)
  const sortedFiles = sortFiles(filteredFiles)

  sortedFiles.forEach((file, index) => {
    const fileName = path.basename(file)
    const stats = fs.statSync(file)
    const isLast = index === sortedFiles.length - 1

    log.i(prefix + (isLast ? '└─ ' : '├─ ') + fileName)

    if (stats.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ')
      tree(file, newPrefix, patterns)
    }
  })
}

export default (patterns: string[]) => {
  log.i(path.parse(cwd()).name.toLocaleUpperCase())
  tree('.', '', ['.git', '.github', '.vscode', 'node_modules', 'dist'].concat(patterns))
}
