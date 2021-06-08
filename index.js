import { existsSync, realpathSync } from 'fs'
import { join, dirname } from 'path'
import globalDirs from 'global-dirs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export const getPackagePath = (name) => {
  console.log(`process.cwd(): ${process.cwd()}`)
  console.log(`process.env.PWD: ${process.env.PWD}`)
  console.log(`process.env.INIT_CWD: ${process.env.INIT_CWD}`)
  console.log(`process.env.npm_package_json: ${process.env.npm_package_json}`)
  console.log(`process.env._: ${process.env._}`)

  const nodeModulesPath = `node_modules/${name}`
  const pathInNodeModules = join(process.cwd(), nodeModulesPath)

  if (existsSync(pathInNodeModules)) {
    console.log(`pathInNodeModules: ${pathInNodeModules}`)
  }

  if (process.env._) {
    const npxPath = process.env._.replace(`.bin/${name}`, name)

    if (existsSync(npxPath)) {
      console.log(`npxPath: ${npxPath}`)
    }
  }

  console.log(
    `require.resolve('get-package-path'): ${require.resolve(
      'get-package-path'
    )}`
  )

  const resolvePath = require.resolve(name)

  if (resolvePath && resolvePath.includes(nodeModulesPath)) {
    const resolvePathWithoutFile =
      resolvePath.split(nodeModulesPath)[0] + nodeModulesPath

    if (existsSync(resolvePathWithoutFile)) {
      console.log(`resolvePathWithoutFile: ${resolvePathWithoutFile}`)
    }
  }

  const importMetaPath = dirname(new URL(import.meta.url).pathname)

  console.log(`importMetaPath: ${importMetaPath}`)

  const npmGlobalDir = join(realpathSync(globalDirs.npm.packages), name)

  if (existsSync(realpathSync(globalDirs.npm.packages))) {
    console.log('npm global found.')
  }

  if (existsSync(npmGlobalDir)) {
    console.log(`npmGlobalDir: ${npmGlobalDir}`)
  }

  const yarnGlobalDir = join(globalDirs.yarn.packages, name)

  if (existsSync(globalDirs.yarn.packages)) {
    console.log('yarn global found.')
  }

  if (existsSync(yarnGlobalDir)) {
    console.log(`yarnGlobalDir: ${npmGlobalDir}`)
  }
}
