#!/usr/bin/env node
import { getPackagePath } from './index.js'

const path = getPackagePath('get-package-path')

console.log(`get-package-path is found in ${path}.`)
