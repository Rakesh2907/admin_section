import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

var position = [];
const todayDate = new Date();
export default class EmployeeGeneral extends React.Component
{
		constructor(props) {
          super(props);
          this.state = { 
              employee_id: 0,
              joining_date: todayDate,
              first_name:'',
              last_name: '',
              email: '',
              gender: 'male',
              birth_date: todayDate,
              department_id: 0,
              category_id: 0,
              position_id: 0,
              job_title: '',
              qualification: '',
              experience_info: '',
              experience_year: 0,
              experience_month: 0,
              positionInfo: []
          }
        }
        handleChangeJoinDate(event,date){
            this.setState({joining_date:date});
        }
        handleChangeFname(event){
            this.setState({first_name:event.target.value});
        }
        handleChangeLname(event){
            this.setState({last_name:event.target.value});   
        }
        handleChangeEmail(event){
            this.setState({email:event.target.value});
        }
        handleChangeDob(event,date){
            this.setState({birth_date:date});
        }
        handleChangeDepartment(event,index,value){
            this.setState({department_id:value});
        }
        handleChangeCategory(event,index,value){
            this.setState({category_id:value});
            position = [];
            $.ajax({
                  type: 'POST',
                  url: base_url+'employee_con/get_position',
                  data: {
                    category_id:value
                  },
                  dataType: 'json',
                  success: function (resdata) {
                    if(resdata.length > 0)
                    {
                        for(var i = 0;i < resdata.length;i++)
                        {
                            position.push(<MenuItem value={resdata[i]['position_id']} primaryText={resdata[i]['position_name']} />)
                        }
                        this.setState({positionInfo:position});
                    }
                   }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                  }.bind(this)
             });
        }
        handleChangePosition(event,index,value){
            this.setState({position_id:value});
        }
        handleChangeTitle(event){
            this.setState({job_title:event.target.value});
        }
        handleChangeQualification(event){
            this.setState({qualification:event.target.value});
        }
        handleChangeExperienceInfo(event){
            this.setState({experience_info:event.target.value});
        }
        handleChangeExpYears(event,index,value){
            this.setState({experience_year:value});
        }
        handleChangeExpMonths(event,index,value){
            this.setState({experience_month:value});
        }
        loadEmployeeGeneral(employeeInfo){
               this.setState({
                  employee_id: employeeInfo['employee_id'],
                  joining_date: new Date(employeeInfo['joining_date']),
                  first_name: employeeInfo['first_name'],
                  last_name: employeeInfo['last_name'],
                  email: employeeInfo['email'],
                  gender: employeeInfo['gender'],
                  department_id: employeeInfo['department_id'],
                  category_id: employeeInfo['category_id'],
                  position_id: employeeInfo['position_id'],
                  job_title: employeeInfo['job_title'],
                  qualification: employeeInfo['qualification'],
                  experience_info: employeeInfo['experience_info'],
                  experience_year: employeeInfo['experience_year'],
                  experience_month: employeeInfo['experience_month'],
                  birth_date: new Date(employeeInfo['birth_date'])
               });
        }
        componentWillMount(){
           
            if(typeof this.props.EmployeeID!='undefined')
                 {
                      $.ajax({
                          url: base_url+'employee_con/get_employee?id='+this.props.EmployeeID,
                          dataType: 'json',
                          method: 'GET',
                          success: function(resdata){
                            if(resdata.length > 0)
                            {
                                 this.loadEmployeeGeneral(resdata[0]);
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
              this.loadEmployeeGeneral(props.employeeInfo);
          }  
        }
        handleSubmit(event){
            event.preventDefault();
            var myDepartmentId = this.state.department_id;
            var myCategortyId = this.state.category_id;
            var myPositionId = this.state.position_id;
            var myExYear = this.state.experience_year;
            var myExMonth = this.state.experience_month;

            if(typeof this.props.employeeInfo!='undefined'){
              var myURL = base_url+'employee_con/edit_general_info';
              var myData = $('#myempform1').serialize()+'&department_id='+myDepartmentId+'&category_id='+myCategortyId+'&position_id='+myPositionId+'&experience_year='+myExYear+'&experience_month='+myExMonth+'&employee_id='+this.props.employeeInfo['employee_id'];
            }else{
              var myURL = base_url+'employee_con/save_general_info';
              var myData = $('#myempform1').serialize()+'&department_id='+myDepartmentId+'&category_id='+myCategortyId+'&position_id='+myPositionId+'&experience_year='+myExYear+'&experience_month='+myExMonth;
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
                              document.getElementById("next_button_0").click();
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
            },
            radioButton: {
              marginTop:16,
              marginLeft:10,
              width: 'auto',
              display: 'inline-block'
            }
          }
          const {employee_id,joining_date,first_name,last_name,email,gender,birth_date,department_id,category_id,position_id,job_title,qualification,experience_info,experience_year,experience_month,positionInfo} = this.state;

        	return(
        		  <ValidatorForm id="myempform1" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
                  <div className="row clearfix">
                      <div className="col-sm-6">
                        <TextField
                                    floatingLabelText="Employee ID"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="employee_id"
                                    value={employee_id}
                                    id="employee_id"
                                    fullWidth={true}
                                    disabled={true}
                        />
                      </div>
                      <div className="col-sm-6">
                          <DatePicker 
                            floatingLabelText="Joining Date"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeJoinDate.bind(this)}
                            openToYearSelection={true} 
                            fullWidth={true} 
                            validators={['required']}
                            errorMessages={['this field is required']}
                            name="joining_date" 
                            id="joining_date" 
                            value={joining_date}
                            defaultDate={joining_date}
                            autoOk={true}
                          />
                      </div> 
                  </div>
                  <div className="row clearfix">
                    <div className="col-sm-6">
                        <TextValidator
                            floatingLabelText="First Name"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeFname.bind(this)}
                            name="first_name"
                            type="text"
                            value={first_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            id="first_name"
                            fullWidth={true}
                        />
                    </div>
                    <div className="col-sm-6">
                          <TextValidator
                            floatingLabelText="Last Name"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeLname.bind(this)}
                            name="last_name"
                            type="text"
                            value={last_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            id="last_name"
                            fullWidth={true}
                         />
                    </div>
                  </div>
                  <div className="row clearfix">
                      <div className="col-sm-6">
                        <TextValidator
                          floatingLabelText="Email"
                          floatingLabelStyle={styles.floatingLabelStyle}
                          inputStyle={styles.floatingLabelStyle}
                          underlineStyle={styles.underlineStyle}
                          onChange={this.handleChangeEmail.bind(this)}
                          name="email"
                          type="email"
                          id="email"
                          value={email}
                          validators={['required', 'isEmail']}
                          errorMessages={['this field is required', 'email is not valid']}
                          fullWidth={true}
                       />
                      </div>
                      <div className="col-sm-6">
                          <label>Gender</label>
                          <RadioButtonGroup name="gender" valueSelected={gender} onChange={this.handleGender}>
                             <RadioButton
                                    value="male"
                                    label="Male"
                                    style={styles.radioButton}
                                    labelStyle={styles.floatingLabelStyle}
                                 />
                                 <RadioButton
                                    value="female"
                                    label="Female"
                                    style={styles.radioButton}
                                    labelStyle={styles.floatingLabelStyle}
                                />
                          </RadioButtonGroup>
                      </div>
                  </div> 
                  <div className="row clearfix">
                      <div className="col-sm-6">
                          <DatePicker 
                             floatingLabelText="Birth Date"
                             floatingLabelStyle={styles.floatingLabelStyle}
                             inputStyle={styles.floatingLabelStyle}
                             underlineStyle={styles.underlineStyle}
                             onChange={this.handleChangeDob.bind(this)}
                             openToYearSelection={true} 
                             fullWidth={true} 
                             validators={['required']}
                             errorMessages={['this field is required']}
                             name="birth_date" 
                             id="birth_date" 
                             value={birth_date}
                             defaultDate={birth_date}
                             autoOk={true}
                          />
                      </div>
                      <div className="col-sm-6">
                            <SelectValidator 
                              name="department_id" 
                              floatingLabelText="Department"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={department_id}
                              defaultValue={department_id}
                              onChange={this.handleChangeDepartment.bind(this)}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              id="department_id"
                              fullWidth={true}
                            >
                            {this.props.departmentInfo}
                          </SelectValidator>
                      </div>
                  </div> 
                  <div className="row clearfix">
                      <div className="col-sm-6">
                          <SelectValidator 
                              name="category_id" 
                              floatingLabelText="Category"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={category_id}
                              defaultValue={category_id}
                              onChange={this.handleChangeCategory.bind(this)}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              id="category_id"
                              fullWidth={true}
                            >
                            {this.props.categoryInfo}
                          </SelectValidator>
                      </div>
                      <div className="col-sm-6">
                          <SelectValidator 
                              name="position_id" 
                              floatingLabelText="Position"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={position_id}
                              defaultValue={position_id}
                              onChange={this.handleChangePosition.bind(this)}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              id="position_id"
                              fullWidth={true}
                            >
                            <MenuItem value="0" primaryText="Select"/> 
                            {positionInfo}
                          </SelectValidator>
                      </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-sm-6">
                        <TextValidator
                            floatingLabelText="Job Title"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeTitle.bind(this)}
                            name="job_title"
                            type="text"
                            value={job_title}
                            id="job_title"
                            fullWidth={true}
                        />
                    </div>
                    <div className="col-sm-6">
                        <TextValidator
                            floatingLabelText="Qualification"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeQualification.bind(this)}
                            name="qualification"
                            type="text"
                            value={qualification}
                            id="qualification"
                            fullWidth={true}
                        />
                    </div>
                  </div> 
                  <div className="row clearfix">
                      <div className="col-sm-6">
                           <TextField
                              floatingLabelText="About"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              onChange={this.handleChangeExperienceInfo.bind(this)}
                              name="experience_info"
                              type="text"
                              value={experience_info}
                              id="experience_info"
                              fullWidth={true}
                          />
                      </div>
                      <div className="col-sm-3">
                           <SelectValidator 
                              name="experience_year" 
                              floatingLabelText="Experience(Years)"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={experience_year}
                              defaultValue={experience_year}
                              onChange={this.handleChangeExpYears.bind(this)}
                              id="experience_year"
                              fullWidth={true}
                            >
                            <MenuItem value="0" primaryText="Select"/> 
                            <MenuItem value="1" primaryText="1"/>
                            <MenuItem value="2" primaryText="2"/>
                            <MenuItem value="3" primaryText="3"/>
                            <MenuItem value="4" primaryText="4"/>
                            <MenuItem value="5" primaryText="5"/>
                            <MenuItem value="6" primaryText="6"/>
                            <MenuItem value="7" primaryText="7"/>
                            <MenuItem value="8" primaryText="8"/>
                            <MenuItem value="9" primaryText="9"/>
                            <MenuItem value="10" primaryText="10"/>
                            <MenuItem value="11" primaryText="11"/>
                            <MenuItem value="12" primaryText="12"/>
                            <MenuItem value="13" primaryText="13"/>
                            <MenuItem value="14" primaryText="14"/>
                            <MenuItem value="15" primaryText="15"/>
                            <MenuItem value="16" primaryText="16"/>
                            <MenuItem value="18" primaryText="18"/>
                            <MenuItem value="19" primaryText="19"/>
                            <MenuItem value="20" primaryText="20"/>
                          </SelectValidator>
                      </div> 
                      <div className="col-sm-3">    
                          <SelectValidator 
                              name="experience_month" 
                              floatingLabelText="Experience(Months)"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={experience_month}
                              defaultValue={experience_month}
                              onChange={this.handleChangeExpMonths.bind(this)}
                              id="experience_month"
                              fullWidth={true}
                            >
                              <MenuItem value="0" primaryText="Select"/> 
                              <MenuItem value="1" primaryText="1"/>
                              <MenuItem value="2" primaryText="2"/>
                              <MenuItem value="3" primaryText="3"/>
                              <MenuItem value="4" primaryText="4"/>
                              <MenuItem value="5" primaryText="5"/>
                              <MenuItem value="6" primaryText="6"/>
                              <MenuItem value="7" primaryText="7"/>
                              <MenuItem value="8" primaryText="8"/>
                              <MenuItem value="9" primaryText="9"/>
                              <MenuItem value="10" primaryText="10"/>
                              <MenuItem value="11" primaryText="11"/>
                              <MenuItem value="12" primaryText="12"/>
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