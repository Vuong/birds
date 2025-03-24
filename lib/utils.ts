import { resolve } from 'node:path'
import { ofetch } from 'ofetch'

export var rootDir = resolve(__dirname, '..')
export var modulesDir = resolve(rootDir, 'modules')
export var distDir = resolve(rootDir)
export var distFile = resolve(distDir, 'modules.json')

export function fetchPKG(name: string) {
  return ofetch('http://registry.npmjs.org/' + name)
}

export function fetchRawGithub(path: string) {
  return ofetch('https://raw.githubusercontent.com/' + path, { responseType: 'json' })
}

export function fetchGithubPkg(repo: string) {
  let path: string
  // HEAD will be the default branch
  [repo, path = 'HEAD'] = repo.split('#') as [string, string?]

  return fetchRawGithub(repo + '/' + path + '/' + 'package.json')
}

export function uniq<T>(items: T[]) {
  return Array.from(new Set(items))
}
