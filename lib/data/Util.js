import secp256k1 from 'secp256k1';
import BigNumber from 'bignumber.js';
import { isObject } from 'util';
import { add0xPrefix, is0xPrefix } from './Hexadecimal';
import { isString, isByte, isNumeric } from './Type';

export function concatTypedArrays(a, b) {
	const c = new (a.constructor)(a.length + b.length);
	c.set(a, 0);
	c.set(b, a.length);
	return c;
}

export function hasProperties(obj, propertySet) {
	if (!isObject(obj)) {
		return false;
	}

	let result = true;
	propertySet.forEach((property) => {
		if (Object.prototype.hasOwnProperty.call(obj, property)) {
			result = false;
		}
	});

	return result;
}

export function convertToHex(value) {
	if (isNumeric(value)) {
		return add0xPrefix(value.toString(16));
	}

	if (isString(value)) {
		const bytes = [];
		let convertedText = '';

		for (let i = 0; i < value.length; i += 1) {
			const originBytes = unescape(encodeURIComponent(value[i]));
			for (let j = 0; j < originBytes.length; j += 1) {
				bytes.push(originBytes[j].charCodeAt(0));
			}
		}

		const textToHexFormat = '%x';
		for (let i = 0; i < bytes.length; i += 1) {
			const byte = bytes[i];
			let hexByte = byte.toString(16);
			if (hexByte.length === 1) {
				hexByte = `0${hexByte}`;
			}
			let char = textToHexFormat;
			char = char.replace(/%x/g, hexByte);
			convertedText += char;
		}

		return add0xPrefix(convertedText);
	}

	if (isByte(value)) {
		const encoded = value.reduce((output, elem) => (output + (`0${elem.toString(16)}`).slice(-2)), '');
		return add0xPrefix(encoded);
	}

	return value;
}

export function convertParamsValueToHex(params) {
	const converted = {};

	Object.keys(params).forEach((key) => {
		converted[key] = convertToHex(params[key]);
	});

	return converted;
}

export function isValidPrivateKey(privKey) {
	// return secp256k1.privateKeyVerify(new Buffer(privKey, 'hex'));
	return secp256k1.privateKeyVerify(Buffer.alloc(privKey, 'hex'));
}

export function isValidPublicKey(pubKey) {
	// return secp256k1.privateKeyVerify(new Buffer(pubKey, 'hex'));
	return secp256k1.privateKeyVerify(Buffer.alloc(pubKey, 'hex'));
}

export function createPrivate() {
	const weakMap = new WeakMap();
	const internal = (key) => {
		if (!weakMap.has(key)) {
			weakMap.set(key, {});
		}
		return weakMap.get(key);
	};
	return internal;
}

export function toDecimal(data) {
	if (isString(data) && is0xPrefix(data)) {
		return parseFloat(new BigNumber(data, 16), 10);
	}

	return parseFloat(data, 10); // TODO NaN 체크
}

export function toBigNumber(data) {
	if (isString(data) && is0xPrefix(data)) {
		return new BigNumber(data, 16);
	}

	return new BigNumber(data, 10);
}
