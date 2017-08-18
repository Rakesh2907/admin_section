import './less/input-moment.less';
import './less/app.less';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from './InputMoment';

export default class App extends Component 
{
	state = {
      m: moment()
    };

    handleChange = m => {
    	this.setState({ m });
    };

  	handleSave = () => {
  	    //alert(this.props.applicantId);
    	//console.log('saved', this.state.m.format('llll'));

    	var selectedDate = this.state.m.format('YYYY-MM-DD HH:mm');

    	$.ajax({
    	   url: 'http://localhost/school_product/admin_con/set_interview_shedule',
        	dataType: 'json',
        	type: 'POST',
	        data:{
	            applicant_id: this.props.applicantId,
	            interview: selectedDate 
	        },	
    	   	success: function(resdata)
    	   	{
	            if(resdata.success)
	            {
	                   document.getElementById("controlled-tab-example-tab-7").click();   
	            }
	         }.bind(this),
	              error: function(xhr, status, err) {
	                console.error(err.toString());
	         }.bind(this)
    	});

    };
    handleCancel = () => {
    		document.getElementById("controlled-tab-example-tab-7").click(); 
    };
	render() {
    	return (
    		<div className="app">
    		   <form>
    		   		<div className="input">
            			<input type="text" value={this.state.m.format('llll')} readOnly />
          			</div>
          			<InputMoment
            			moment={this.state.m}
            			onChange={this.handleChange}
            			onSave={this.handleSave}
            			onCancel={this.handleCancel}
          			/>
    		   </form>
    		</div>
    	)
    }

}
