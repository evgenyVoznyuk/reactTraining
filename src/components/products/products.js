import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import styles from './products.module.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { routesMap, urlBuilder } from '~/router';

import withStore from '~/hocs/withstore';

import CartBtn from '~c/cartbtn';

class Products extends React.Component {
	render() {
		let productsStore = this.props.stores.productsStore;
		let productsItems = productsStore.products.map((pr) => {

			const prPath = {};
			prPath.id = pr.id;

			return <Col lg={3} md={4} sm={6} key={pr.id}>
				<Card>
					<Card.Body>
						<Card.Title>{pr.title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">#{pr.id}</Card.Subtitle>
						<Card.Text>
							Price: {pr.price}
						</Card.Text>
						<CartBtn id={pr.id} />
						<hr />
						<Card.Link as={Link} to={urlBuilder('item', prPath)}>
							Get more...
            </Card.Link>
					</Card.Body>
				</Card>
			</Col>
		});

		return <>
			<h2> Products</h2>
			<Row>{productsItems}</Row>
		</>
	}
}

export default withStore(Products);
