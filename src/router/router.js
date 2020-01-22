import Products from '~c/products';
import Item from '~c/item';
import Cart from '~c/cart';
import OrderForm from '~c/orderform';
import Result from '~c/result';
import E404 from '~c/errors/e404';

const routes = [
	{
		name: 'products',
		path: '/',
		component: Products,
		exact: true,
		inNav: true
	},
	{
		name: 'cart',
		path: '/cart',
		component: Cart,
		exact: true,
		inNav: true
	},
	{
		name: 'order',
		path: '/order',
		component: OrderForm,
		exact: true,
		inNav: true
	},
	{
		name: 'result',
		path: '/result',
		component: Result,
		exact: true
	},
	{
		name: 'item',
		path: '/product/:id',
		component: Item,
		exact: true
	},
	{
		path: '**',
		component: E404
	}
];

const routesMap = {};
const navMap = {};

routes.forEach((route) => {
	if (route.hasOwnProperty('name')) {
		routesMap[route.name] = route.path;
		if (route.hasOwnProperty('inNav')) {
			navMap[route.name] = route.path;
		}
	}
});

let xxx = { id: 100 };

function urlBuilder(name, path) {
	if (!routesMap.hasOwnProperty(name)) {
		return null;
	}

	let routePath = routesMap[name];
	for (let key in path) {
		return routePath.replace(`:${key}`, path[key]);
	}
}

export { routes, routesMap, navMap, urlBuilder }
