import React from 'react';

import withStore from '~/hocs/withstore';


class Result extends React.Component {
	render() {
		let resData = this.props.stores.orderStore.orderCartData;
		let productsStore = this.props.stores.productsStore;

		let resultRows = resData.productsInCart.map((pr) => {
			let prInfo = productsStore.getItem(pr.id);
			return <li key={pr.id} className="list-group-item">
				{prInfo.title} - {pr.cnt}
			</li>
		});

		return <>
			<h2>Thanks for your order, {resData.name}</h2>
			<h3>You have ordered:</h3>
			<ul className="list-group">
				{resultRows}
			</ul>
			<h3>Total is {resData.total} :)</h3>
		</>
	}
}

export default withStore(Result);
