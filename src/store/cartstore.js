import { observable, computed, action } from 'mobx';

class CartStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.api = this.rootStore.api.cart;
		this.storage = this.rootStore.storage;
		this.token = this.rootStore.storage.getItem('cartToken');
	}

	@observable products = [];
	@observable inProcessIds = {};


	@computed get total() {
		return this.products.reduce((total, item) => {
			let productInfo = this.rootStore.productsStore.getItem(item.id);
			return total + (item.cnt * productInfo.price);
		}, 0);
	}

	@computed get inProcess() {
		return id => id in this.inProcessIds;
	}

	@computed get inCart() {
		return function (id) {
			let ind = this.getIndexById(id);
			return ind >= 0;
		}
	}

	@action load() {
		return new Promise((resolve) => {
			this.api.load(this.token).then(data => {
				if (data.needUpdate) {
					this.storage.setItem('cartToken', data.token);
					this.token = data.token;
				}
				else {
					this.products = data.cart;
				}
				resolve();
			});
		});
	}

	@action add(id) {
		if (!this.inCart(id) && !this.inProcess(id)) {
			this.inProcessIds[id] = true;
			this.api.add(this.token, id).then((res) => {
				if (res) {
					this.products.push({ id, cnt: 1 });
				}
				delete this.inProcessIds[id];
			});
		};
	}

	@action changeCnt(id, cnt) {
		let ind = this.getIndexById(id);
		if (ind >= 0 && !this.inProcess(id)) {
			this.inProcessIds[id] = true;
			this.api.change(this.token, id, cnt).then((res) => {
				if (res) {
					this.products[ind].cnt = cnt;
				}
				delete this.inProcessIds[id];
			});
		}
	}


	@action remove(id) {
		let ind = this.getIndexById(id);
		if (ind >= 0 && !this.inProcess(id)) {
			this.inProcessIds[id] = true;
			this.api.remove(this.token, id).then((res) => {
				if (res) {
					this.products.splice(ind, 1);
				}
				delete this.inProcessIds[id];
			});
		}
	}

	@action cleanCart() {
		return new Promise((resolve) => {
			this.api.clean(this.token).then((res) => {
				if (res) {
					this.products = [];
					resolve();
				}
			});
		});

	}

	getIndexById(id) {
		return this.products.findIndex(pr => pr.id === id);
	}
}

export default CartStore;
