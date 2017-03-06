'use strict';

require('dotenv').load();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
const mime = require('mime');
const path = require('path');
const crypto = require('crypto');

let file = {
  path: process.argv[2],
  title: process.argv[3]
};

let mimeType = mime.lookup(file.path);
let ext = path.extname(file.path);
let folder = (new Date()).toISOString().split('T')[0];
let stream = fs.createReadStream(file.path);

new Promise((resolve, reject) => {
  crypto.randomBytes(16, (err, buf) => {
    if (err) {
      reject(err);
    } else {
      resolve(buf.toString('hex'));
    }
  });
}).then((filename) => {
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${filename}${ext}`,
    Body: stream,
    ContentType: mimeType
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
})
.then(console.log)
.catch(console.error);
