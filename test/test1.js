const assert = require('assert');
const base64en = require('../src/Base64');

const fs = require('fs');
const path = require('path');

describe('Testing the Encoding Functions', () => {

  const base64En = new base64en();


  describe('Testing ASCII', () => {


    /* toAscii test */
    it('Should return ASCII String', () => {

      const asciiStr = base64En.toAscii("Hello World");
      const arr = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];

      assert(asciiStr.toString() === arr.toString());

    });

    it('Should Return an Empty Object', () => {

      const asciiStr = base64En.toAscii("");

      assert(asciiStr.length == 0);

    });

    it('Should Return an Empty Object for null value', () => {

      const asciiStr = base64En.toAscii(null);

      assert(asciiStr === null);

    });

  });

  describe('Testing Binary Methods', () => {

    it('Should return a binary value', () => {

      const binary = base64En.toBinary(308);

      assert(binary === '0000000100110100');

    });

    it('Should return a null value on null input', () => {
      const binary = base64En.toBinary(null);
      assert(binary == null);

    });

    it('Should return a null value on non Integer input', () => {
      const binary = base64En.toBinary("A");
      assert(binary == null);
    });

    it('Should return a binary array', () => {
      const arr = base64En.allToBinary(base64En.toAscii("Hello, World"));
      const expec = ['01001000', '01100101', '01101100', '01101100', '01101111', '00101100', '00100000', '01010111', '01101111', '01110010', '01101100', '01100100'];
      assert(arr.toString() === expec.toString());
    });

    it('Should return a 6 bit string', () => {
      const arr = base64En.to6Bit(base64En.allToBinary(base64En.toAscii("MENON")));
      const expected = '010011010100010101001110010011110100111000';
      assert(arr === expected);
    });

    it('Should return a 6 bit array', () => {
      const arr = base64En.to6BitArray(base64En.to6Bit(base64En.allToBinary(base64En.toAscii("MENON"))));
      const exp = ['010011', '010100', '010101', '001110', '010011', '110100', '111000'];

      assert(arr.toString() === exp.toString());

    });

  });

  describe('Testing Decimal Functions', () => {

    it('Should return a decimal value', () => {
      result = base64En.toDecimal('00100011');
      assert(result === 35);
    });

    it('Should return an array of decimal values', () => {
      const input = ['010011', '010100', '010101', '001110', '010011', '110100', '111000'];
      const tobe = [19, 20, 21, 14, 19, 52, 56];
      const result = base64En.toDecimalArray(input);
      assert(result.toString() == tobe.toString());
    });

  });

  describe('Testing the encoding function', () => {

    it('Should return a final Encoded String', () => {
      const str = base64En.Base64Encode("MENON");
      const res = "TUVOT04=";
      assert(str === res);
    });

    it('Should return encoded string of Hello World', () => {
      const input = "Hello, World!=";
      const encodedStr = base64En.Base64Encode(input);
      const output = "SGVsbG8sIFdvcmxkIT0=";
      assert(encodedStr === output);

    });

    it('Should return encoded tabs properly', () => {
      const input = "    ";
      const encodedStr = base64En.Base64Encode(input);
      const output = "ICAgIA==";
      assert(encodedStr === output);

    });

    it('Should Correctly encode an Entire XML', async () => {

      let input = new Promise((resolve, reject) => {
        fs.readFile('./test/test_data/books.xml', { encoding: 'utf-8' }, (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            console.log(err);
          }
        });
      });

      let output = new Promise((resolve, reject) => {
        
        fs.readFile('./test/test_data/booksEncoded.txt', { encoding: 'utf-8' }, (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            console.log(err);
          }
        });
      
      });

      input = await input;
      output = await output;

      const encodedString = base64En.Base64Encode(input);

      // console.log('Encoded String : ' + encodedString);

      assert(encodedString === output);
    });


  });

});
