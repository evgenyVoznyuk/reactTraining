import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

import withStore from '~/hocs/withstore';


class CartBtn extends React.Component {

	static propTypes = {
		id: PropTypes.number.isRequired
	}

	render() {
		let cartStore = this.props.stores.cartStore;
		let id = this.props.id;
		let inProcess = cartStore.inProcess(id);
		let cartBtn;

		if (cartStore.inCart(id)) {
			cartBtn = <Button variant="outline-danger"
				onClick={() => cartStore.remove(id)}
				disabled={inProcess}
			>
				Remove from cart
			</Button>
		} else {
			cartBtn = <Button variant="success"
				onClick={() => cartStore.add(id)}
				disabled={inProcess}
			>
				Add to cart
			</Button>
		}
		return <>{cartBtn}</>
	}
}

export default withStore(CartBtn);
