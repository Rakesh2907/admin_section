import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';

export default class EmployeeAdditionalInfo extends React.Component 
{
	constructor(props) {
   			 super(props);
   			 this.state={
   			 	'pan_number' : '',
   			 	'addhar_card' : '',
   			 	'passport_number' : ''
   			 }
    }
    handleChangePancard(event){
    	this.setState({pan_number:event.target.value});
    }
    handleChangeAadharCard(event){
    	this.setState({addhar_card:event.target.value});
    }
    handleChangePassport(event){
    	this.setState({passport_number:event.target.value});
    }
    componentDidMount(){
    		if(typeof this.props.EmployeeID!='undefined')
            {
            		$.ajax({
                          url: base_url+'employee_con/get_employee?id='+this.props.EmployeeID,
                          dataType: 'json',
                          method: 'GET',
                          success: function(resdata){
                            if(resdata.length > 0)
                            {
                                 this.loadEmployeeAdditionalInfo(resdata[0]);
                            }
                          }.bind(this),
                          error: function(xhr, status, err) {
                            console.error(err.toString());
                          }.bind(this)
                    });
            }else{

            }
    }
    loadEmployeeAdditionalInfo(employeeInfo){
    		this.setState({
    			pan_number:employeeInfo['pan_number'],
    			addhar_card:employeeInfo['addhar_card'],
    			passport_number:employeeInfo['passport_number'],
    		});
    }
    componentWillReceiveProps(props){
          if(typeof props.employeeInfo!='undefined'){
              this.loadEmployeeAdditionalInfo(props.employeeInfo);
          }  
    }
    handleSubmit(event){
    	event.preventDefault();
    	if(typeof this.props.employeeInfo!='undefined'){
    		var myURL = base_url+'employee_con/edit_additional_info';
    		var myData = $('#myempform6').serialize()+'&employee_id='+this.props.EmployeeID
    	}else{
        var employee_id = sessionStorage.getItem('sess_employee_id');
        var myURL = base_url+'employee_con/edit_additional_info';
        var myData = $('#myempform6').serialize()+'&employee_id='+employee_id
    	}

    	$.ajax({
                      type: 'POST',
                      url: myURL,
                      data: myData,
                      dataType: 'json',
                      success: function (resdata) {
                          sessionStorage.setItem('sess_employee_id', resdata.employee_id);
                          swal({
                              title: "Save Successfully...",
                              type: "success",
                              confirmButtonClass: 'btn-success',
                              confirmButtonText: 'Okay'
                          },function(){
                              document.getElementById("next_button_5").click();
                          });
                      }.bind(this),
                        error: function(xhr, status, err) {
                          console.error(err.toString());
                      }.bind(this)
           });

    }
    skip(){
        document.getElementById("next_button_5").click();    
    }
    render(){
    	const styles = {
            floatingLabelStyle: {
              color: black500,
            },
            underlineStyle: {
              borderColor: black500,
            }
        }
        const {pan_number,addhar_card,passport_number} = this.state;
    	return(
    		<ValidatorForm id="myempform6" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
    			<div className="row clearfix">
                      <div className="col-sm-6">
                      	<TextValidator
                            floatingLabelText="Pancard Number"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangePancard.bind(this)}
                            name="pan_number"
                            type="text"
                            value={pan_number}
                            id="pan_number"
                            fullWidth={true}
                        />
                      </div>
                </div>
                <div className="row clearfix">
                      <div className="col-sm-6">
                      	 <TextValidator
                            floatingLabelText="Aadhar Card Number"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeAadharCard.bind(this)}
                            name="addhar_card"
                            type="text"
                            value={addhar_card}
                            id="addhar_card"
                            fullWidth={true}
                         />
                      </div>
                </div>
                <div className="row clearfix">
                      <div className="col-sm-6">
                      	 <TextValidator
                            floatingLabelText="Passport Number"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangePassport.bind(this)}
                            name="passport_number"
                            type="text"
                            value={passport_number}
                            id="passport_number"
                            fullWidth={true}
                         />
                      </div>
                </div> 
                <div className="row clearfix">
                      <div className="col-sm-6">
                      		<RaisedButton 
                            	style={{marginRight: 12}} 
                            	primary={true}
                            	type="submit"
                            	label="Save" 
                            />
                            <RaisedButton 
                                style={{marginRight: 12}} 
                                primary={true}
                                type="button"
                                label="Skip" 
                                onClick={this.skip.bind(this)}
                            />
                      </div>
                </div>           
    		</ValidatorForm>
    	);
    }
}    			 