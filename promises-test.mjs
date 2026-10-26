import { randomBytes } from 'node:crypto'
import { randomBytesPromise, promisifyFunction } from './promises.js'

randomBytesPromise(16)
    .then(buffer => console.log('randomBytesPromise:', buffer.toString('hex')))
    .catch(err => console.error('Error:', err))

promisifyFunction(randomBytes, 16)
    .then(buffer => console.log('promisifyFunction:', buffer.toString('hex')))
    .catch(err => console.error('Error:', err))

randomBytesPromise(-1)
    .then(buffer => console.log('should not happen'))
    .catch(err => console.error('Error (expected):', err.code))