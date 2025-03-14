const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const open = require('open'); // You may need to install the open module: npm install open

// find free ai image generator api, generate images here


const key = 'G4h7716JA7LP5dCY4-64WUtik4RUkQ'
const url = 'https://api.starryai.com/creations/';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-API-Key': key
  },
  body: JSON.stringify({
    model: 'lyra',
    aspectRatio: 'square',
    highResolution: false,
    images: 1,
    steps: 20,
    initialImageMode: 'color',
    prompt: 'please print a cool image'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));