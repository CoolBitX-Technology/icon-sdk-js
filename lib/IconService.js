import Request from './transport/jsonrpc/Request';
import HttpProvider from './transport/http/HttpProvider';
import Wallet from './Wallet';
import Builder from './builder';
import SignedTransaction from './SignedTransaction';
import * as Validator from './data/Validator';
import * as Converter from './data/Converter';
import * as Format from './data/Format';

/**
 * @description IconService which provides APIs of ICON network.
 */
export default class IconService {
	constructor(provider) {
		this.provider = provider;
		this.Wallet = Wallet;
		this.Builder = Builder;
		this.SignedTransaction = SignedTransaction;
	}

	/**
	 * @description Get the total number of issued coins
	 */
	getTotalSupply() {
		const requestId = (new Date()).getTime();
		const request = new Request(requestId, 'icx_getTotalSupply', null);
		return this.provider.request(request, Converter.toBigNumber);
	}

	/**
	 * @description Get the balance of the address
	 * @param {string} address EOA or SCORE address
	 * @return {BigNumber} Number of ICX coins
	 */
	getBalance(address) {
		if (!Validator.isAddress(address)) {
			throw new Error('invalid address');
		} else {
			const requestId = (new Date()).getTime();
			const params = { address };
			const request = new Request(requestId, 'icx_getBalance', params);
			return this.provider.request(request, Converter.toBigNumber);
		}
	}

	/**
	 * @description Get the block information
	 * @param {mixed} value
	 * @return {object}
	 */
	getBlock(value) {
		if (Validator.isBlockNumber(value)) {
			const requestId = (new Date()).getTime();
			const params = { height: value };
			const request = new Request(requestId, 'icx_getBlockByHeight', params);
			return this.provider.request(request, Format.toBlock);
		}
		if (Validator.isBlockHash(value)) {
			const requestId = (new Date()).getTime();
			const params = { hash: value };
			const request = new Request(requestId, 'icx_getBlockByHash', params);
			return this.provider.request(request, Format.toBlock);
		}
		if (Validator.isPredefinedBlockValue(value)) {
			const requestId = (new Date()).getTime();
			const request = new Request(requestId, 'icx_getLastBlock', null);
			return this.provider.request(request, Format.toBlock);
		}

		throw new Error('invalid block value');
	}

	/**
	 * @description Get the SCORE API list
	 * @param {string} address SCORE address
	 * @return {array} API list
	 */
	getScoreApi(address) {
		if (!Validator.isScoreAddress(address)) {
			throw new Error('invalid contract address');
		} else {
			const requestId = (new Date()).getTime();
			const params = { address };
			const request = new Request(requestId, 'icx_getScoreApi', params);
			return this.provider.request(request);
		}
	}

	/**
	 * @description Get the transaction informaion
	 * @param {string} hash Transaction hash
	 * @return {object} API list
	 */
	getTransaction(hash) {
		if (!Validator.isSignedTransactionHash(hash)) {
			throw new Error('invalid tx hash');
		} else {
			const requestId = (new Date()).getTime();
			const params = { txHash: hash };
			const request = new Request(requestId, 'icx_getTransactionByHash', params);
			return this.provider.request(request, Format.toTransaction);
		}
	}

	getTransactionResult(hash) {
		if (!Validator.isSignedTransactionHash(hash)) {
			throw new Error('invalid tx hash');
		} else {
			const requestId = (new Date()).getTime();
			const params = { txHash: hash };
			const request = new Request(requestId, 'icx_getTransactionResult', params);
			return this.provider.request(request, Format.toTransactionResult);
		}
	}

	sendTransaction(signedTransaction) {
		if (!Validator.isSignedTransaction(signedTransaction)) {
			throw new Error('invalid transaction data');
		} else {
			const requestId = (new Date()).getTime();
			const params = signedTransaction;
			const request = new Request(requestId, 'icx_sendTransaction', params);
			return this.provider.request(request);
		}
	}

	call(call) {
		if (!Validator.isCall(call)) {
			throw new Error('invalid call data');
		} else {
			const requestId = (new Date()).getTime();
			const params = call;
			const request = new Request(requestId, 'icx_call', params);
			return this.provider.request(request);
		}
	}
}

IconService.providers = {
	HttpProvider,
};
