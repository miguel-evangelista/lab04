import { randomBytes } from 'node:crypto'

// 1. randomBytes "embrulhado" numa Promise
export function randomBytesPromise(size) {
    return new Promise((resolve, reject) => {
        randomBytes(size, (err, buffer) => {
            if (err) reject(err)
            else resolve(buffer)
        })
    })
}

// 2. Versão geral: serve para qualquer função com callback (err, result)
export function promisifyFunction(fn, ...args) {
    return new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}