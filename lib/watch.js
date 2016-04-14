'use strict'
const MongoClient = require('mongodb').MongoClient
const config = require('./config.js')
const logger = require('./logger.js')

/** Class to operate with watch files. */
class Watch {
    /**
     * @constructor
     */
    constructor() {
        this.url = config.mongoUrl
        this.collection = 'register'
    }
    /**
     * Function to join a file with user, if user and file already exists dont add.
     * @param {string} userId  - The user id
     * @param {string} filePath - The path to file to watch
     * @return {boolean} True is inserted or false if value dont inserted
     * @throws will throw an error if database problems
     */
    register(userId, filePath) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, db) => {
                if (err) {
                    logger.warn(`Error to connect to Database : ${err}`)
                    return reject(err)
                }
                db.collection(this.collection).find({
                    userId: userId,
                    file: filePath
                })
                    .toArray((err, doc) => {
                        if (err) {
                            logger.warn(`Error to connect to Database : ${err}`)
                            return reject(err)
                        }

                        if (doc.length !== 0) {
                            db.close()
                            return resolve(false)
                        }

                        db.collection(this.collection).insertOne({
                            userId: userId,
                            file: filePath
                        }, (err, result) => {
                            db.close()
                            if (err) {
                                logger.warn(`Error to connect to Database : ${err}`)
                                return reject(err)
                            }
                                                        
                            return resolve(result.ops[0]._id.toString())
                        })
                    })
            })
        })
    }

    /**
       * Search all registers in DataBase 
       * @returns Array with value
       * @throws will throw an error if database problems
       */
    search() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, db) => {
                if (err) {
                    logger.warn(`Error to connect to Database : ${err}`)
                    return reject(err)
                }
                db.collection(this.collection).find({}, { _id: 0 })
                    .toArray((err, doc) => {
                        db.close()
                        if (err) {
                            logger.warn(`Error to connect to Database : ${err}`)
                            return reject(err)
                        }
                        return resolve(doc)
                    })
            })
        })
    }

    /**
   * Search all registers in DataBase 
   * @returns Array with value
   * @throws will throw an error if database problems
   */
    searchOne(userId, filePath) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, db) => {
                if (err) {
                    logger.warn(`Error to connect to Database : ${err}`)
                    return reject(err)
                }
                db.collection(this.collection).find({
                    userId: userId,
                    file: filePath
                }, { userId:0, file:0 })
                    .toArray((err, doc) => {
                        db.close()
                        if (err) {
                            logger.warn(`Error to connect to Database : ${err}`)
                            return reject(err)
                        }
                        return resolve(doc[0]._id.toString())
                    })
            })
        })
    }


    /**
     * Function to delete a register user with file 
     * @param {string} userId  - The user id
     * @param {string} filePath - The path to file to watch
     * @returns 
     * @throws will throw an error if database problems
     */
    unregister(userId, filePath) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, db) => {
                if (err) {
                    logger.warn(`Error to connect to Database : ${err}`)
                    return reject(err)
                }
                db.collection(this.collection).deleteOne({
                    'userId': userId,
                    'file': filePath
                }, (err, result) => {
                    db.close()

                    if (err) {
                        logger.warn(`Error to connect to Database : ${err}`)
                        return reject(err)
                    }

                    if (result.result.n === 0) return resolve(false)

                    return resolve(true)
                })
            })
        })
    }
}

module.exports = Watch