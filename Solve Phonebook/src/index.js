import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Preloader, Placeholder} from 'react-preloading-screen';

class SolvePhonebook extends React.Component{


	constructor(){
		super();
		this.state = {
			phoneArray: [],
			isLoading: true,
			searchTerm: ''
		}
		this.searchByAllTerm = this.searchByAllTerm.bind(this);
	}

	componentDidMount(){
		fetch('http://www.mocky.io/v2/581335f71000004204abaf83')
		.then(res => res.json())
		.then((contacts) => {
			this.setState({phoneArray: contacts});
			this.setState({isLoading: false});

		});
	}

	searchByAllTerm(event){
		const term = event.target.value.toLowerCase();
		this.setState({searchTerm: event.target.value});

	}
	render(){

		if(this.state.isLoading){
			return (
				<Preloader>
					<h1>Solve Phonebooks</h1>
					<Placeholder>
						<span>Loading ...</span>
					</Placeholder>
				</Preloader>
			)
		}else{
			let term = this.state.searchTerm;
			let filteredArray  = this.state.phoneArray.contacts;
			if(term != ''){
				filteredArray = this.state.phoneArray.contacts.filter((contact)=>{
					return contact.name.toLowerCase().indexOf(term) === 0 || contact.address.toLowerCase().indexOf(term) === 0;
				});
			}
			
			return (
				<div className="data">
				<h1>List of contacts</h1>
				

				<div className="form search-form">
					<input type="text" defaultValue="" onChange={this.searchByAllTerm} placeholder="Search for name, address or phone number" />
				</div>

				{filteredArray.map((contact,index)=>{

					return(
						<div className="wrapper" key={index}>
							<div className="contact-wrapper contact-title">{contact.name}</div>
							<div className="contact-wrapper contact-address">{contact.phone_number}</div>
							<div className="contact-wrapper contact-phonenumber">{contact.address}</div>
						</div>
					)

				})}

				</div>

			)

		}

	}

}

ReactDOM.render(<SolvePhonebook />, document.getElementById('app'));