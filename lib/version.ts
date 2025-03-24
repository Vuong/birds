import path from 'node:path'
import { promises as fsp } from 'node:fs'
import { hashFile } from 'hasha'
import { rootDir, distFile } from './utils'
import { build } from './modules'

export async function version() {
  await build()

  let pkgFile = path.resolve(rootDir, 'package.json')
  let pkg = JSON.parse(await fsp.readFile(pkgFile, 'utf8'))

  let hash = await hashFile(distFile).then(r => r.substr(0, 6))

  pkg.version = pkg.version.split('-')[0] + '-' + hash

  await fsp.writeFile(pkgFile, JSON.stringify(pkg, null, 2))
}
