import crypto, { randomBytes } from "node:crypto";

// Exercício 1
export function randomBytesPromise(size) {
    return new Promise((resolve, reject) => {
        randomBytes(size, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

// Exercício 2
export function promisifyFunction(fn, ...args) {
    return new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// Exemplos de uso
randomBytesPromise(16)
    .then(buffer => {
        console.log("Random bytes (ex. 1):", buffer.toString("hex"));
    })
    .catch(err => {
        console.error("Error:", err);
    });

promisifyFunction(crypto.randomBytes, 16)
    .then(buffer => {
        console.log("Random bytes (ex. 2):", buffer.toString("hex"));
    })
    .catch(err => {
        console.error("Error:", err);
    });