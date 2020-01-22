import React from 'react';
import { Link } from 'react-router-dom';

import { routesMap } from '~/router';


class E404 extends React.Component {
	back = () => {
		this.props.history.goBack();
	}
	render() {
		return <div className="container">
			<h1>Error 404</h1>
			<p>Page not found</p>
			<p>
				Try start from
				<Link to={routesMap.products}> homepage</Link>
			</p>
			<p>
				Go <span onClick={this.back}>back</span>!
			</p>
		</div>
	}
}

export default E404;
