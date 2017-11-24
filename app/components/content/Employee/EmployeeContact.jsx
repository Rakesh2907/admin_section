import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';

export default class EmployeeContact extends React.Component 
{
	    constructor(props) {
          super(props);
          this.state = { 
            address: '',
            phone: '',
            mobile: ''
          }
        }
        handleChangeAddress(event){
            this.setState({address:event.target.value});
        }
        handleChangePhone(event){
            this.setState({phone:event.target.value});
        }
        handleChangeMobile(event){
            this.setState({mobile:event.target.value});
        }
        loadEmployeeContact(employeeInfo){
            this.setState({
                address: employeeInfo['address'],
                phone: employeeInfo['phone'],
                mobile: employeeInfo['mobile']
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
                            if(resdata.length > 0){
                                 this.loadEmployeeContact(resdata[0]);
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
                  this.loadEmployeeContact(props.employeeInfo);
          }        
        }
        handleSubmit(event){
                event.preventDefault();
                if(typeof this.props.employeeInfo!='undefined'){
                    var myURL = base_url+'employee_con/edit_contact_info'; 
                    var myData = $('#myempform3').serialize()+'&employee_id='+this.props.employeeInfo['employee_id'];
                }else{
                   var employee_id = sessionStorage.getItem('sess_employee_id');
                   var myURL = base_url+'employee_con/edit_contact_info'; 
                   var myData = $('#myempform3').serialize()+'&employee_id='+employee_id;
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
                              document.getElementById("next_button_2").click();
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
          const {address,phone,mobile} = this.state;
        	return(
        		 <ValidatorForm id="myempform3" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
                <div className="row clearfix">
                      <div className="col-sm-6">
                           <TextValidator
                              floatingLabelText="Address"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              onChange={this.handleChangeAddress.bind(this)}
                              name="address"
                              type="text"
                              value={address}
                              id="address"
                              fullWidth={true}
                           />
                      </div>
                      <div className="col-sm-6">
                          <TextValidator
                              floatingLabelText="Phone"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              onChange={this.handleChangePhone.bind(this)}
                              name="phone"
                              type="text"
                              value={phone}
                              id="phone"
                              fullWidth={true}
                           />
                      </div>
                </div>
                <div className="row clearfix">
                      <div className="col-sm-6">
                           <TextValidator
                              floatingLabelText="Mobile"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              onChange={this.handleChangeMobile.bind(this)}
                              name="mobile"
                              type="text"
                              value={mobile}
                              id="mobile"
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