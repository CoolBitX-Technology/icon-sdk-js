import assert from 'assert';
import { IconValidator } from '../';

const tests = [
    { value: '0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: true },
    { value: '0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: false },
]

describe('data/Validator', function () {
    describe('isBlockHash()', function () {
        tests.forEach(function (test) {
            it(`${test.value} is ${test.is}`, function () {
                assert.strictEqual(IconValidator.isBlockHash(test.value), test.is);
            });
        })
    });
});

