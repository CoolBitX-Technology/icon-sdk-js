import assert from 'assert';
import IconService, {
	HttpProvider, SignedTransaction, IconValidator, IconWallet, IconBuilder, IconConverter, IconAmount,
} from '..';

const { IcxTransactionBuilder } = IconBuilder;

const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const from = 'hx902ecb51c109183ace539f247b4ea1347fbf23b5';
const to = 'hxd008c05cbc0e689f04a5bb729a66b42377a9a497';
const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
const stepLimit = IconConverter.toBigNumber(100000);
const nid = IconConverter.toBigNumber(3);
const nonce = IconConverter.toBigNumber(1);
const version = IconConverter.toBigNumber(3);
const timestamp = (new Date()).getTime() * 1000;
const builder = new IcxTransactionBuilder();
const transaction = builder
	.from(from)
	.to(to)
	.value(value)
	.stepLimit(stepLimit)
	.nid(nid)
	.nonce(nonce)
	.version(version)
	.timestamp(timestamp)
	.build();

const testWallet = IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6');

const signedTransaction = new SignedTransaction(transaction, testWallet);

describe('IconService', () => {
	describe('sendTransaction() - IcxTransaction', () => {
		it('should return the tx hash', async () => {
			const txHash = await iconService.sendTransaction(signedTransaction).execute();
			assert.ok(IconValidator.isTransactionHash(txHash));
		});
	});
});
