import React from 'react';
import { Link } from 'react-router-dom';

import styles from './orderform.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { routesMap } from '~/router';

import withStore from '~/hocs/withstore';

class OrderForm extends React.Component {
	state = {
		isModal: false
	}

	showHideModal = (bool) => { this.setState({ isModal: bool }) }
	confirm = () => {
		this.props.stores.orderStore.sendOrder().then(() => {
			this.props.history.push(routesMap.result);
		});
	}

	render() {
		let cartStore = this.props.stores.cartStore;
		let orderStore = this.props.stores.orderStore;
		let productsStore = this.props.stores.productsStore;
		let formFields = [];
		for (let name in orderStore.data) {
			let field = orderStore.data[name];
			formFields.push(
				<Form.Group key={name}>
					<Form.Label>{field.title}</Form.Label>
					<Form.Control type="text"
						isInvalid={!orderStore.data[name].valid}
						value={field.value}
						placeholder={field.placeholder}
						onChange={(e) => orderStore.changeVal(name, e.target.value)} />
				</Form.Group>);
		}

		let modalRows = cartStore.products.map((pr) => {
			let prInfo = productsStore.getItem(pr.id);
			return <li key={pr.id}> {prInfo.title} - {pr.cnt} </li>
		});

		return <>
			<h2>Order Form</h2>
			<Form>
				{formFields}
				<Link className="btn btn-outline-secondary" to={routesMap.cart}>
					Back to Cart
				</Link>
				<Button className={styles.floatRight}
					variant="success"
					onClick={() => { this.showHideModal(true) }}
					disabled={!orderStore.readyToSubmit}
				>Submit</Button >
			</Form>
			<Modal show={this.state.isModal}>
				<Modal.Header>
					<Modal.Title>Check your order</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Your name: {orderStore.userInfo.name}</p>
					<p>Your email: {orderStore.userInfo.email}</p>
					<p>Your phone: {orderStore.userInfo.phone}</p>
					<p>You have ordered:</p>
					<ul>
						{modalRows}
					</ul>
					<p>Total: {cartStore.total}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary"
						onClick={() => { this.showHideModal(false) }}
					>Cancel</Button>
					<Button variant="success"
						onClick={this.confirm}
					>OK</Button>
				</Modal.Footer>
			</Modal>
		</>
	}
}

export default withStore(OrderForm);
