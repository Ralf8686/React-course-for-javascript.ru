import React, {Component} from 'react';

import Select from 'react-select'
import "react-select/dist/react-select.css"
var options = [
			    { value: 'all', label: 'All' },
			    { value: 'two', label: 'Two' }
			];

function logChange(val) {
    console.log("Selected: " + val);
}

export default class CommentPageAll extends Component {
	render() {
		return (
			<div>
				<Select
				    name="form-field-name"
				    value="all"
				    options={options}
				    onChange={logChange}
				/>
			</div>
		);
	}
}
