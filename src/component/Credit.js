import React, { Component } from "react";
import visaLogo from "../visaLogo.png";
import puce from "../puce.png";

export default class Credit extends Component {
	state = {
		name: "",
		number: "",
		validThru: ""
	};

	nameChange = n => {
		if (!n.target.value.match(/[0-9]/g)) {              //is used to find any character between the brackets.			
			this.setState({
				name: n.target.value
			});
		}
	};

	numberChange = c => {
		if (!c.target.value.match(/[^0-9]/g)) {   //is used to find any character that is NOT a digit			
			this.setState({
				number: c.target.value
			});
		}
	};


	typeValidThru=e=>{
		if(!e.target.value.match(/[^0-9/]/gi) && e.target.value.length < 6 && e.target.value.slice(0,2) < 13) {
			this.setState({
				validThru:e.target.value
				.replace(/[^\d]/g, "")
				.replace(/(.{2})/g, "$1/")
				.replace(/^['/'\uFEFF\xA0]+|['/'\uFEFF\xA0]+$/g, "").slice(0,5)
			})
		}
	}

	renderCardNumber = numb => {
		let num = numb.toString();
		let result = "";
		for (let i = 0; i < num.length; i += 4) {
			result += num.slice(i, i + 4) + " ";
		}
		return result.trim();
	};
	renderValidThru = num => {
		let a = num.toString();
		return a.slice(0, 2) + "/" + a.slice(2);
	};

	render() {
		return (
			<div className="Cardin">
				<div className="credit-card">
					<h1 className="type-card">Company name</h1>
					<div className="emv-logo">
						<img className="puce" src={puce} alt="" width="70" />
					</div>
					<div className="card-number">
						
						{this.renderCardNumber(this.state.number.padEnd(16, "*"))}
					</div>
					<div className="card-info">
						<div className="info-name">
							<h2>{this.state.name.toUpperCase()}</h2>
						</div>

						<div className="card-expiry">
							<div>
								{/* {this.renderValidThru(this.state.validity.padEnd(4, "*"))} */}
								{String(this.state.validThru).padEnd(5,"*")}
							</div>
						</div>

						<div className="credit-visa">
							<img className="logo" src={visaLogo} alt="" width="130" />
						</div>
					</div>
				</div>
				<div className="forms">
					<label>
						<h4 >Cardholder</h4>
						<input className="in"
							type="text"
							value={this.state.name}
							placeholder="Card Holder"
							maxLength="20"
							onChange={this.nameChange}
						/>
					</label>
					<label>
						<h4>Card number</h4>
						<input className="in"
							type="text"
							placeholder="Card Number"
							value={this.state.number}
							maxLength="16"
							onChange={this.numberChange}
						/>
					</label>

					<label>
					<h4>Valid thru</h4>
						
						<input className="in"
							type="text"
							placeholder="MM/YY"
							value={this.state.validThru}
							
							onChange={this.typeValidThru}
							maxLength= "5"
						/>
					</label>
				</div>
			</div>
		);
	}
}
