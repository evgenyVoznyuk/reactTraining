import React from 'react';

import withStore from '~/hocs/withstore';

import E404 from '~c/errors/e404';

import CartBtn from '~c/cartbtn';


class Item extends React.Component {

	render() {
		let productsStore = this.props.stores.productsStore;
		let id = +this.props.match.params.id;
		let item = productsStore.getItem(id);
		let cartBtn;

		if (item === null) {
			return <E404 />
		}
		return <>
			<h1>{item.title}</h1>
			<p>#{item.id}</p>
			<p>Price: {item.price}</p>
			<CartBtn id={id} />
		</>
	}
}

export default withStore(Item);
