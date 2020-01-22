import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routesMap, routes } from '~/router';

import NavMenu from '~c/navmenu';


class App extends React.Component {
	render() {
		let routesItems = routes.map((route) => {
			return <Route key={route.path}
				path={route.path}
				component={route.component}
				exact={route.exact}
			/>
		});

		return <BrowserRouter>
			<div className="container">
				<NavMenu />
				<Switch>
					{routesItems}
				</Switch>
			</div>
		</BrowserRouter>
	}
}

export default App;
