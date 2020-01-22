import { observable, computed, action, runInAction } from 'mobx';

class OrderStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.cart = this.rootStore.cartStore;
		this.productsInCart = this.rootStore.cartStore.products;
	}

	@observable data = {
		name: {
			title: 'Name',
			placeholder: 'Enter your name',
			value: '',
			pattern: /^[a-zA-Z ]{2,30}$/,
			valid: true
		},
		email: {
			title: 'Email',
			placeholder: 'Enter email',
			value: '',
			pattern: /^\S+@\S+\.\S+$/,
			valid: true
		},
		phone: {
			title: 'Phone',
			placeholder: 'Enter phone',
			value: '',
			pattern: /^[0-9]{7,14}$/,
			valid: true
		}
	};

	@observable orderCartData = {
		name: '',
		total: 0,
		productsInCart: []
	};


	@action changeVal(name, newVal) {
		let field = this.data[name];
		field.value = newVal;
		field.valid = field.pattern.test(newVal);
	}

	@action sendOrder() {
		return new Promise((resolve) => {
			this.orderCartData.total = this.cart.total;
			this.orderCartData.productsInCart = this.cart.products;
			this.cart.cleanCart().then(() => {
				runInAction(() => {
					this.orderCartData.name = this.data.name.value;
					for (let field in this.data) {
						this.data[field].value = '';
					}
				});
			});
			resolve();
		});
	}

	@computed get readyToSubmit() {
		return Object.values(this.data).every(name => name.valid && name.value !== '');
	}

	@computed get userInfo() {
		let info = {};
		for (let field in this.data) {
			info[field] = this.data[field].value;
		};
		return info;
	}
}

export default OrderStore;
