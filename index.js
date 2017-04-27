const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

axios
    .get('https://originbooks.herokuapp.com')
    .then(response => {
        const $ = cheerio.load(response.data);

        const books = 
            $('.panel')
                .toArray()
                .map(panel => ({
                    title: $(panel).children('.panel-heading').text().trim(),
                    author: $(panel).children('.panel-body').children('p').text().trim(),
                    imageUrl: $(panel).children('.panel-body').children('img').attr('src'),
                    price: $(panel).children('.panel-body').children('small.green').text().trim()
                }));

        fs.writeFile('output.json', JSON.stringify(books, null, 2), () => console.log('done'));
    });