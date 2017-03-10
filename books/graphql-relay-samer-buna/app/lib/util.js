const humps = require('humps');
const _ = require('lodash');
const fs = require('fs');

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  orderedFor: (rows, collection, field, singleObject) => {
       // return the rows ordered for the collection
       const data = humps.camelizeKeys(rows);
       const inGroupsOfField = _.groupBy(data, field);
       return collection.map(element => {
           const elementArray = inGroupsOfField[element];
           if (elementArray) {
               return singleObject ? elementArray[0] : elementArray;
           } 
           return  singleObject ? {} : [];
       });
    },
    slug: str => {
        return str.toLowerCase().replace(/[\s\W-]+/,'-');
    },
    readLastLinePromise: (path) => {
        let promise = new Promise((resolve,reject) => {
            fs.readFile(path, (err, data) => {
                if(err) throw reject(err);
                resolve(data.toString().trim().split('\n').slice(-1)[0]);
            });
        });
        return promise;
    },
    appendLinePromise: (path, line) => {
        let promise = new Promise((resolve,reject) => {
            fs.appendFile(path, `\n${line}`, err => {
                if(err) throw reject(err);
                resolve(line);
            });
        });
        return promise;
    }


}

