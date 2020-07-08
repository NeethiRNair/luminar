const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');

new Promise((resolve,reject)=>{
    fs.readFile('./sample.txt', function(err,data){
        if(err){
            return reject(err);
        }
        resolve(data.toString())
    });
}).then(data =>{
    console.log(data)
    return new Promise((resolve,reject)=>{
        fs.writeFile('./sample2.txt', 'sample2 content', (err,data)=>{
            if(err){
                return console.log("Err",err);
            }
            console.log("Saved")
        })
    })
    
})


