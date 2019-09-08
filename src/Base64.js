class Base64 {
    constructor() {
        
    }

    reverse(s) {
        return s.split("").reverse().join("");
    }

    toAscii(str) {
        let output = [];

        if (str != null && str.length) {
            for (let i = 0; i < str.length; i++) {
                output.push(parseInt(str.charCodeAt(i)));
            }
            // output = output.join(' ');
        } else if (str == null) {
            output = null;
        }

        // console.log(output);

        return output;
    }

    /* Return a 8 Bit Binary number */
    toBinary(num) {
        let res = '';

        if (num != null && typeof (num) === 'number') {
            while (num != 0) {
                res += num % 2;
                num = Math.floor(num / 2);

            }

            while (res.length % 8 != 0) {
                res = res + '0';
            }

            res = this.reverse(res);
        } else {
            res = null;
        }

        return res;
    }

    /* Returns a Binary Array */

    allToBinary(arr) {
        let res = [];

        for (let i = 0; i < arr.length; i++) {
            res.push(this.toBinary(arr[i]));
        }

        return res;

    }

    to6Bit(arr) {

        let str = [];

        str = arr.join("");

        while (str.length % 6 != 0) {
            str += '0';
        }

        return str;
    }

    /* Returns a 6 Bit Array */

    to6BitArray(str) {
        // str = '010011010100010101001110010011110100111000';

        let arr = [];
        let temp = '';

        for (let i = 1; i <= str.length; i++) {
            temp += str[i - 1];

            if (i % 6 === 0) {
                arr.push(temp);
                temp = '';
            }

        }

        return arr;

    }

    toDecimal(str) {
        str = this.reverse(str);
        let res = 0;
        for (let i = 0; i < str.length; i++) {
            res += parseInt(str[i]) * Math.pow(2, i);

        }

        return res;
    }

    /* To Decimal Array */

    toDecimalArray(arr) {
        /* arr => array of string Ex: [ '1010100', '010101101' ] */
        let decimalArr = [];
        for (let i = 0; i < arr.length; i++) {
            const decimalValue = this.toDecimal(arr[i]);
            decimalArr.push(decimalValue);
        }
        return decimalArr;
    }

    Base64Encode(str) {
        const numArray = this.toDecimalArray(this.to6BitArray(this.to6Bit(this.allToBinary(this.toAscii(str)))));
        const char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let encodedStr = '';

        for (let i = 0; i < numArray.length; i++) {
            encodedStr += char_set[numArray[i]];
        }

        while (encodedStr.length % 4 != 0) {
            encodedStr += '=';
        }
        //console.log(numArray);
        return encodedStr;

    }

    to6BitBinary(num) {
        let res = '';

        

        if (num != null && typeof (num) === 'number') {
            
                        
            if(num != 0) {
                while (num != 0) {
                    res += num % 2;
                    num = Math.floor(num / 2);
    
                }
            } else {
                /* condition when the supplied number is 0 */
                res = '000000';
            }

            while (res.length % 6 != 0) {
                res = res + '0';

            }
            
            res = this.reverse(res);
        } else {
            res = null;
        }
        return res;
    }

    to6BitBinaryArray(arr) {
        let res = [];

        for (let i = 0; i < arr.length; i++) {
            res.push(this.to6BitBinary(arr[i]));
        }

        return res;

    }

    to8BitBinaryArray(str) {

        let arr = [];
        let temp = '';

        for (let i = 1; i <= str.length; i++) {
            temp += str[i - 1];

            if (i % 8 === 0) {
                arr.push(temp);
                temp = '';
            }

        }

        return arr;

    }

    toCharacterString(numArray){
        for (let i = 0; i < numArray.length; i++) {
            numArray[i] = String.fromCharCode(numArray[i]);
        }
        numArray = numArray.join("");
        return numArray;
    }

    Base64Decode(str) {

        const char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let temp = [];
        str = str.trim();

        while (str[str.length - 1] === "=") {
            str = str.slice(0, str.length - 1);
        }

        if (str.search("=") != -1) {
            console.log("NOW THROWING ERROR");
            throw new Error();
        }

        /* Converting Characters to decimal values */
        for (let i = 0; i < str.length; i++) {
            temp.push(char_set.indexOf(str[i]));
        }

        temp = this.to6BitBinaryArray(temp);

        temp = temp.join("");
        
        temp = this.to8BitBinaryArray(temp);
        
        
        temp = this.toDecimalArray(temp);
        
        temp = this.toCharacterString(temp);

        // const fs = require('fs');

        // fs.writeFile('./test/test_data/sam.xml', temp,(err) => {
        //     if(err) {
        //         console.log("ERROR Saving file");
        //     } else {
        //         console.log("Output File Generated!!!");
        //     }
        // });

        // console.log(temp);

        return temp;
    }


}

module.exports = Base64;
