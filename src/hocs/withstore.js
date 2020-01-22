import React from 'react';
import { observer } from 'mobx-react';

import rootStore from '~s';


export default function (Component) {
	let ObservedComponent = observer(Component);
	return function (props) {
		return <ObservedComponent {...props} stores={rootStore} />
	};
};
