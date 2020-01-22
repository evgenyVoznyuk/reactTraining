import React from 'react';
import ReactDom from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import rootStore from '~s';

import App from '~c/app';

rootStore.cartStore.load();

rootStore.productsStore.load().then(() => {
	ReactDom.render(<App />, document.querySelector('#app'));
});
