import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';

export default class EmployeeBankInfo extends React.Component 
{
	constructor(props) {
   			 super(props);
   			 this.state={
   			 	 	bank_name: '',
   			 	 	bank_account_number: '',
   			 	 	bank_ifc_code: ''
   			 }
    }
    handleChangeBname(event){
    	this.setState({bank_name:event.target.value});
    }
    handleChangeAccount(event){
    	this.setState({bank_account_number:event.target.value});
    }
    handleChangeIFSC(event){
    	this.setState({bank_ifc_code:event.target.value});
    }
    loadEmployeeBankInfo(employeeInfo){
    		this.setState({
    			bank_name:employeeInfo['bank_name'],
    			bank_account_number:employeeInfo['bank_account_number'],
    			bank_ifc_code:employeeInfo['bank_ifc_code'],

    		});	
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
                                 this.loadEmployeeBankInfo(resdata[0]);
                            }
                          }.bind(this),
                          error: function(xhr, status, err) {
                            console.error(err.toString());
                          }.bind(this)
                    });
            }else{

            }
    }        
    componentWillReceiveProps(props){
          if(typeof props.employeeInfo!='undefined'){
              this.loadEmployeeBankInfo(props.employeeInfo);
          }  
    }
    handleSubmit(event){
    	event.preventDefault();
    	if(typeof this.props.employeeInfo!='undefined'){
    		var myURL = base_url+'employee_con/edit_bank_info';
    		var myData = $('#myempform5').serialize()+'&employee_id='+this.props.employeeInfo['employee_id']
    	}else{
           var employee_id = sessionStorage.getItem('sess_employee_id');
           var myURL = base_url+'employee_con/edit_bank_info';
           var myData = $('#myempform5').serialize()+'&employee_id='+employee_id;
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
                              document.getElementById("next_button_4").click();
                          });
                      }.bind(this),
                        error: function(xhr, status, err) {
                          console.error(err.toString());
                      }.bind(this)
           });
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
        const {bank_name,bank_account_number,bank_ifc_code} = this.state;
    	return(
    		<ValidatorForm id="myempform5" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
    			<div className="row clearfix">
                      <div className="col-sm-6">
                      	<TextValidator
                            floatingLabelText="Bank Name"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeBname.bind(this)}
                            name="bank_name"
                            type="text"
                            value={bank_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            id="bank_name"
                            fullWidth={true}
                        />
                      </div>
                </div> 
                <div className="row clearfix">
                      <div className="col-sm-6">
                      	<TextValidator
                            floatingLabelText="Account Number"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeAccount.bind(this)}
                            name="bank_account_number"
                            type="text"
                            value={bank_account_number}
                            validators={['required','isNumber']}
                      		errorMessages={['this field is required','enter only number']}
                            id="bank_account_number"
                            fullWidth={true}
                        />
                      </div>
                </div> 
                <div className="row clearfix">
                      <div className="col-sm-6">
                      	<TextValidator
                            floatingLabelText="IFSC"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeIFSC.bind(this)}
                            name="bank_ifc_code"
                            type="text"
                            value={bank_ifc_code}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            id="bank_ifc_code"
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
                      </div>
                </div>          
    		</ValidatorForm>
    	);
    } 	
}  