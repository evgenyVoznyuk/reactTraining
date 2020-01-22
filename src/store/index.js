import CartStore from '~s/cartstore';
import ProductsStore from '~s/productsstore';
import OrderStore from '~s/orderstore';


import * as products from '~/api/products';
import * as cart from '~/api/cart';

class RootStore {
	constructor() {

		this.api = {
			products,
			cart
		}

		this.storage = localStorage;

		this.cartStore = new CartStore(this);
		this.productsStore = new ProductsStore(this);
		this.orderStore = new OrderStore(this);
	}
}

export default new RootStore();
