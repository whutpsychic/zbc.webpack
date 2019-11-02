import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

class Default extends React.Component {

	state = {
		value: 111123423
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				value: "zbbdf"
			});
		}, 1000);
	}

	render() {
		const { value } = this.state;
		return <h3>{value}</h3>;
	}
}

ReactDOM.render(<Default />, document.getElementById("root"));
