import { observable, computed, action } from 'mobx';

class ProductsStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.api = this.rootStore.api.products;
	}

	@observable products = [];

	@computed get getItem() {
		return function (currentId) {
			let ind = this.products.findIndex(item => item.id === currentId);
			return ind in this.products ? this.products[ind] : null;
		}
	}

	@action load() {
		return new Promise((resolve) => {
			this.api.all().then((pr) => {
				this.products = pr;
				resolve();
			});
		});

	}
}

export default ProductsStore;
