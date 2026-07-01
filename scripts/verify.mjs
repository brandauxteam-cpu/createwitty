// Static verification: parse every JS/JSX file (syntax + JSX) and resolve local imports.
import { parse } from '@babel/parser'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { dirname, join, resolve, extname } from 'node:path'

const ROOT = resolve('src')
const files = []
;(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(js|jsx)$/.test(name)) files.push(p)
  }
})(ROOT)

let errors = 0
const localImports = []

for (const file of files) {
  const code = readFileSync(file, 'utf8')
  let ast
  try {
    ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties', 'objectRestSpread', 'optionalChaining', 'nullishCoalescingOperator'],
    })
  } catch (e) {
    console.log(`SYNTAX ERROR  ${file.replace(ROOT, 'src')}: ${e.message}`)
    errors++
    continue
  }
  for (const node of ast.program.body) {
    if (node.type === 'ImportDeclaration') {
      const src = node.source.value
      if (src.startsWith('.')) localImports.push({ file, src })
    }
  }
}

// Resolve local imports
const exts = ['', '.js', '.jsx', '/index.js', '/index.jsx']
for (const { file, src } of localImports) {
  const basedir = dirname(file)
  const target = resolve(basedir, src)
  const ok = exts.some((e) => existsSync(target + e) || (extname(target) && existsSync(target)))
  if (!ok) {
    console.log(`MISSING IMPORT  ${file.replace(ROOT, 'src')}  ->  ${src}`)
    errors++
  }
}

console.log(`\nParsed ${files.length} files, checked ${localImports.length} local imports.`)
console.log(errors === 0 ? '✓ ALL CHECKS PASSED' : `✗ ${errors} problem(s) found`)
process.exit(errors === 0 ? 0 : 1)
