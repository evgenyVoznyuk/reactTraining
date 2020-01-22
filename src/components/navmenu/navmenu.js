import React from 'react';
import { observer } from 'mobx-react';
import { NavLink, Link } from 'react-router-dom';

import styles from './navmenu.module.css';
import Nav from 'react-bootstrap/Nav';

import { navMap } from '~/router';


@observer class NavMenu extends React.Component {
	render() {
		let navTabs = [];
		for (let tab in navMap) {
			navTabs.push(
				<Nav.Item key={navMap[tab]}>
					<NavLink to={navMap[tab]}
						exact={true}
						className="nav-link">
						{tab}
					</NavLink>
				</Nav.Item>
			);
		}
		return <>
			<Nav variant="tabs">
				{navTabs}
			</Nav>
		</>
	}
}

export default NavMenu;
