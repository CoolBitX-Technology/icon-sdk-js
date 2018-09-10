import { 
    IcxTransaction, 
    IcxTransactionBuilder 
} from './IcxTransaction';

class MessageTransaction extends IcxTransaction {
    constructor(to, from, value, stepLimit, nid, nonce, version, timestamp, data) {
        super(to, from, value, stepLimit, nid, nonce, version, timestamp);
        this.dataType = "message";
        this.data = data;
    }
}

export class MessageTransactionBuilder extends IcxTransactionBuilder {
    constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
        super(to, from, value, stepLimit, nid, nonce, version, timestamp);
    }

    data(data) {
        this._data = data;
        return this;
    }

    build() {
        return new MessageTransaction(
            this._to, 
            this._from, 
            this._value, 
            this._stepLimit, 
            this._nid, 
            this._nonce, 
            this._version, 
            this._timestamp, 
            this._data,
        );
    }
}