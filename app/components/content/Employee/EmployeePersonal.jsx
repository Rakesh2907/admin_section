import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';

export default class EmployeePersonal extends React.Component
{
		constructor(props) {
          super(props);
          this.state = { 
              martial_status:'single',
              father_name: '',
              mother_name: '',
              blood_group: 'unknown',
              nationality: 'india'
          }
    }
    handleChangeMartial(event,index,value){
          this.setState({martial_status:value});
    }
    handleChangeFname(event){
           this.setState({father_name:event.target.value});
    }
    handleChangeMname(event){
           this.setState({mother_name:event.target.value});
    }
    handleChangeBlood(event,index,value){
          this.setState({blood_group:value});
    }
    handleChangeNationality(event,index,value){
        this.setState({nationality:value})
    }
    loadEmployeePersonal(employeeInfo){
            this.setState({
                martial_status: employeeInfo['martial_status'],
                father_name: employeeInfo['father_name'],
                mother_name: employeeInfo['mother_name'],
                blood_group: employeeInfo['blood_group'],
                nationality: employeeInfo['nationality']
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
                           this.loadEmployeePersonal(resdata[0]);
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
            this.loadEmployeePersonal(props.employeeInfo);
        }    
    }
    handleSubmit(event){
        event.preventDefault();
        var myMS = this.state.martial_status;
        var bloodGroup = this.state.blood_group;
        var mynationality = this.state.nationality;
        if(typeof this.props.employeeInfo!='undefined'){
          var myURL = base_url+'employee_con/edit_personal_info'; 
          var myData = $('#myempform2').serialize()+'&employee_id='+this.props.employeeInfo['employee_id']+'&martial_status='+myMS+'&blood_group='+bloodGroup+'&nationality='+mynationality;
        }else{
            var employee_id = sessionStorage.getItem('sess_employee_id');
            var myURL = base_url+'employee_con/edit_personal_info'; 
            var myData = $('#myempform2').serialize()+'&employee_id='+employee_id+'&martial_status='+myMS+'&blood_group='+bloodGroup+'&nationality='+mynationality;
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
                              document.getElementById("next_button_1").click();
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
          const {martial_status,father_name,mother_name,blood_group,nationality} = this.state;
        	return(
        		 <ValidatorForm id="myempform2" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
                <div className="row clearfix">
                      <div className="col-sm-6">
                        <SelectValidator 
                              name="martial_status" 
                              floatingLabelText="Martial Status"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={martial_status}
                              defaultValue={martial_status}
                              onChange={this.handleChangeMartial.bind(this)}
                              id="martial_status"
                              fullWidth={true}
                            >
                            <MenuItem value="single" primaryText="Single"/> 
                            <MenuItem value="married" primaryText="Married"/>
                            <MenuItem value="divorced" primaryText="Divorced"/>
                            <MenuItem value="widowed" primaryText="Widowed"/>
                          </SelectValidator>
                      </div>
                      <div className="col-sm-6">
                        <TextValidator
                            floatingLabelText="Father's Name"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeFname.bind(this)}
                            name="father_name"
                            type="text"
                            value={father_name}
                            id="father_name"
                            fullWidth={true}
                        />
                      </div>
                </div>
                <div className="row clearfix">
                      <div className="col-sm-6">
                          <TextValidator
                            floatingLabelText="Mother's Name"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeMname.bind(this)}
                            name="mother_name"
                            type="text"
                            value={mother_name}
                            id="mother_name"
                            fullWidth={true}
                        />
                      </div>
                      <div className="col-sm-6">
                          <SelectValidator 
                            name="blood_group" 
                            floatingLabelText="Blood Group"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            labelStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            value={blood_group}
                            defaultValue={blood_group}
                            onChange={this.handleChangeBlood.bind(this)}
                            id="blood_group"
                            fullWidth={true}
                          >
                          <MenuItem value="unknown" primaryText="Unknown"/> 
                          <MenuItem value="A positive" primaryText="A+"/>
                          <MenuItem value="A negative" primaryText="A-"/>
                          <MenuItem value="B positive" primaryText="B+"/>
                          <MenuItem value="B negative" primaryText="B-"/>
                          <MenuItem value="O positive" primaryText="O+"/>
                          <MenuItem value="O negative" primaryText="O-"/>
                          <MenuItem value="AB positive" primaryText="AB+"/>
                          <MenuItem value="AB negative" primaryText="AB-"/>
                        </SelectValidator>
                      </div>
                </div> 
                <div className="row clearfix">
                      <div className="col-sm-6">
                          <SelectValidator 
                            name="nationality" 
                            floatingLabelText="Nationality"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            labelStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            value={nationality}
                            defaultValue={nationality}
                            onChange={this.handleChangeNationality.bind(this)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            id="nationality"
                            fullWidth={true}
                          >
                            <MenuItem value="afghanistan" primaryText="Afghanistan"/>
                            <MenuItem value="india" primaryText="India"/>
                         </SelectValidator>
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