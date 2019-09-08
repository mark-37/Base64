const assert = require('assert');
const base64en = require('../src/Base64');

//previous filename base64encode

const fs = require('fs');
const path = require('path');

describe('Testing Decoding Logic', () => {
    const base64 = new base64en();

    it('Testing the Decode function', () => {
        const input = 'TUVOT04=';
        const output = base64.Base64Decode(input);
        const expectedOutput = "MENON";
        assert(output === expectedOutput);
    });

    it('Final Decoding Tests', async function() {
        
        let input = new Promise((resolve, reject) => {
            fs.readFile('./test/test_data/booksEncoded.txt', {encoding: 'utf-8'}, (err, data) => {
                if(!err) {
                  resolve(data);
                } else {
                  console.log(err);
                }
              });
        });

        let expectedOutput = new Promise((resolve, reject) => {
            fs.readFile('./test/test_data/books.xml', {encoding: 'utf-8'}, (err, data) => {
                if(!err) {
                  resolve(data);
                } else {
                  console.log(err);
                }
              });
        });
  

        input = await input;
        expectedOutput = await expectedOutput;

        const output = base64.Base64Decode(input);
        
        assert(output === expectedOutput);

    });

});
