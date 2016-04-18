'use strict'

const fs = require('fs')

let readFile = (file) => {
    let execute = (resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            (err) ? reject(err) : resolve(data)
        })
    }

    return new Promise(execute)

}

let checkFile = (file) => {
    let execute = (resolve, reject) => {
        fs.access(file, fs.F_OK | fs.R_OK, (err) => {
            (err) ? reject(err) : resolve()
        })
    }

    return new Promise(execute)
}


let file = 'text.txt'
Promise.all([
    checkFile(file),
    readFile(file)
])
    .then(data => console.log(data))
    .catch(err => console.log(err))


/*
function fetchAsync (url, timeout, onData, onError) {
    …
}
let fetchPromised = (url, timeout) => {
    return new Promise((resolve, reject) => {
        fetchAsync(url, timeout, resolve, reject)
    })
}
Promise.all([
    fetchPromised("http://backend/foo.txt", 500),
    fetchPromised("http://backend/bar.txt", 500),
    fetchPromised("http://backend/baz.txt", 500)
]).then((data) => {
    let [ foo, bar, baz ] = data
    console.log(`success: foo=${foo} bar=${bar} baz=${baz}`)
}, (err) => {
    console.log(`error: ${err}`)
})*/