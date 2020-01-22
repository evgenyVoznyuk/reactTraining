import React from 'react';
import { Link } from 'react-router-dom';

import styles from './cart.module.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { routesMap } from '~/router';

import withStore from '~/hocs/withstore';

import Minmax from '~c/counters/minmax';


class Cart extends React.Component {
	render() {
		let cartStore = this.props.stores.cartStore;
		let productsStore = this.props.stores.productsStore;
		let productsRows = cartStore.products.map((pr) => {
			let productInfo = productsStore.getItem(pr.id);
			let inProcess = cartStore.inProcess(pr.id);
			return <tr key={productInfo.id}>
				<td className={styles.leftText}>{productInfo.title}</td>
				<td>{productInfo.price}</td>
				<td>
					<Minmax min={1}
						max={productInfo.rest}
						value={pr.cnt}
						onChange={(val) => cartStore.changeCnt(pr.id, val)}
						inProcess={inProcess}
					/>
				</td>
				<td>{productInfo.price * pr.cnt}</td>
				<td>
					<Button variant="danger"
						size="sm"
						className={styles.delete}
						onClick={() => cartStore.remove(pr.id)}
						disabled={inProcess}
					>X</Button>
				</td>
			</tr>
		});

		return <>
			<h2>Cart</h2>
			<Table>
				<tbody>
					<tr>
						<th className={styles.leftText}>Title</th>
						<th>Price</th>
						<th>Count</th>
						<th>Total</th>
						<th>Delete Item</th>
					</tr>
					{productsRows}
				</tbody>
			</Table>
			<h3>Total: {cartStore.total}</h3>
			<Link className="btn btn-success" to={routesMap.order}>Order now!</Link>
		</>
	}
}

export default withStore(Cart);
