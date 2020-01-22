import React from 'react';
import PropTypes from 'prop-types';

import styles from './minmax.module.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export default class extends React.Component {
	static propTypes = {
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		onChange: PropTypes.func,
		inProcess: PropTypes.bool
	}

	static defaultProps = {
		onChange: function () { }
	}

	state = {
		inputVal: this.props.value
	}

	increase = () => this.set(this.props.value + 1)
	decrease = () => this.set(this.props.value - 1)

	set(newCnt) {
		let value = Math.max(this.props.min, Math.min(newCnt, this.props.max));
		this.setState({ inputVal: value });
		this.props.onChange(value);
	}

	onInput = (e) => {
		this.setState({ inputVal: e.target.value });
	}

	applyValue = () => {
		if (this.props.value.toString() !== this.state.inputVal) {
			let cnt = parseInt(this.state.inputVal);
			this.set(isNaN(cnt) ? this.props.min : cnt);
		}
	}

	render() {
		return <div>
			<InputGroup className={styles.jcs} size="sm">
				<InputGroup.Prepend>
					<Button variant="info"
						onClick={this.decrease}
						disabled={this.props.inProcess ||
							parseInt(this.state.inputVal) === this.props.min
						}
					>-1</Button>
				</InputGroup.Prepend>
				<input type="text"
					className={styles.inp}
					value={this.state.inputVal}
					onChange={this.onInput}
					onBlur={this.applyValue}
					disabled={this.props.inProcess}
				/>
				<InputGroup.Append>
					<Button variant="info"
						onClick={this.increase}
						disabled={this.props.inProcess ||
							parseInt(this.state.inputVal) === this.props.max
						}
					>+1</Button>
				</InputGroup.Append>
			</InputGroup>
		</div>
	}
}
