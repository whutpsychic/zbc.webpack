import React from "react";
import ReactDOM from "react-dom";

class Default extends React.Component {
	componentDidMount() {
		console.log(11111122233333);
	}

	render() {
		return <h3>zbc</h3>;
	}
}

ReactDOM.render(<Default />, document.getElementById("root"));

