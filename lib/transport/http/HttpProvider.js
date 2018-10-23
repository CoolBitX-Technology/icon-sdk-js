import HttpClient from './client/HttpClient';
import HttpRequest from './client/HttpRequest';
import HttpCall from './client/HttpCall';

/**
 * @description HttpProvider class transports as http jsonrpc
 */
export default class HttpProvider {
	constructor(url) {
		this.url = url;
	}

	request(request, converter) {
		const body = JSON.stringify(request, (key, value) => {
			if (value) {
				return value;
			}

			return undefined;
		});
		const httpRequest = new HttpRequest(this.url, body);
		return new HttpCall(HttpClient.newCall(httpRequest), converter);
	}
}
