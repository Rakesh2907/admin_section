import React from 'react';

export default class Radio extends React.Component {
	
	constructor(props) {
    	super(props);
    	this.state = {}
    	this.handleClick = this.handleClick.bind(this);
    }
    handleClick()
    {
    	console.info('onchange');
    }
    statuschecked(){

    }
    render(){
      return (
        <div>
      	 <input 
      		type="radio" 
      		name={this.props.radioname} 
      		id={this.props.radioid}
      		className="with-gap"
      		value={this.props.radiovalue}
      		required
      	 />
        	<label htmlFor={this.props.radioid}>{this.props.radiolabel}</label>
        </div>
      );
    }  
}