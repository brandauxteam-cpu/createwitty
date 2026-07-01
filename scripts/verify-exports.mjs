// Checks that every local named/default import matches an export in the target file.
import { parse } from '@babel/parser'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const ROOT = resolve('src')
const PLUGINS = ['jsx', 'classProperties', 'objectRestSpread', 'optionalChaining', 'nullishCoalescingOperator']
const exts = ['', '.js', '.jsx', '/index.js', '/index.jsx']

const files = []
;(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(js|jsx)$/.test(n)) files.push(p)
  }
})(ROOT)

const parseFile = (f) => parse(readFileSync(f, 'utf8'), { sourceType: 'module', plugins: PLUGINS })
const resolveFile = (base, src) => {
  const t = resolve(dirname(base), src)
  for (const e of exts) if (existsSync(t + e)) return t + e
  return null
}

function exportsOf(file) {
  const named = new Set()
  let hasDefault = false
  for (const n of parseFile(file).program.body) {
    if (n.type === 'ExportDefaultDeclaration') hasDefault = true
    else if (n.type === 'ExportNamedDeclaration') {
      const d = n.declaration
      if (d) {
        if (d.declarations) for (const dec of d.declarations) named.add(dec.id.name)
        else if (d.id) named.add(d.id.name)
      }
      for (const s of n.specifiers || []) named.add(s.exported.name)
    }
  }
  return { named, hasDefault }
}

let errs = 0
for (const file of files) {
  for (const n of parseFile(file).program.body) {
    if (n.type !== 'ImportDeclaration') continue
    const src = n.source.value
    if (!src.startsWith('.')) continue
    const target = resolveFile(file, src)
    if (!target) continue
    let ex
    try { ex = exportsOf(target) } catch { continue }
    for (const s of n.specifiers) {
      if (s.type === 'ImportDefaultSpecifier' && !ex.hasDefault) {
        console.log(`NO DEFAULT EXPORT  ${file.replace(ROOT, 'src')} <- ${src}`); errs++
      } else if (s.type === 'ImportSpecifier' && !ex.named.has(s.imported.name)) {
        console.log(`MISSING NAMED EXPORT '${s.imported.name}'  ${file.replace(ROOT, 'src')} <- ${src}`); errs++
      }
    }
  }
}
console.log(errs === 0 ? '✓ EXPORT/IMPORT NAMES CONSISTENT' : `✗ ${errs} mismatch(es)`)
process.exit(errs ? 1 : 0)
