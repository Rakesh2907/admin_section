import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';


var menuItems5 = [];
const todayDate = new Date();
export default class FatherForm extends React.Component
{
      constructor(props) {
            super(props);
            this.state = {
                father_full_name: '',
                father_adhar_card_number: '',
                father_dob: '',
                father_education: '',
                father_occupation: '',
                father_desigantion: '',
                father_address1: '',
                father_address2: '',
                father_city:'',
                father_state:'',
                father_mobile: '',
                father_email: '',
                father_income: ''
            }
            this.handleChangeFname = this.handleChangeFname.bind(this);
            this.handleChangeAcard = this.handleChangeAcard.bind(this);
            this.handleChangeDob = this.handleChangeDob.bind(this);
            this.handleChangeEducation = this.handleChangeEducation.bind(this);
            this.handleChangeOccupation = this.handleChangeOccupation.bind(this);
            this.handleChangeIncome = this.handleChangeIncome.bind(this);
            this.handleChangeEmail = this.handleChangeEmail.bind(this);
            this.handleChangeAddress1 = this.handleChangeAddress1.bind(this);
            this.handleChangeAddress2 = this.handleChangeAddress2.bind(this);
            this.handleChangeCity = this.handleChangeCity.bind(this);
            this.handleChangeStates = this.handleChangeStates.bind(this);
            this.handleChangeMobile = this.handleChangeMobile.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
      }
      handleCancel(){
          document.getElementById("cancelPanel").click();  
      }
      handleChangeFname(event){
          this.setState({father_full_name:event.target.value});
      }
      handleChangeAcard(event){
        this.setState({father_adhar_card_number:event.target.value});
      }
      handleChangeDob(event,date){
          this.setState({father_dob:date})
      }
      handleChangeEducation(event,index,value){
          //alert(value)
          this.setState({father_education:value})
      }
      handleChangeIncome(event){
        this.setState({father_income:event.target.value});
      }
      handleChangeOccupation(event,index,value){
        this.setState({father_occupation:value})
      }
      handleChangeEmail(event){
          this.setState({father_email:event.target.value})
      }
      handleChangeAddress1(event){
        this.setState({father_address1:event.target.value})
      }
      handleChangeAddress2(event){
        this.setState({father_address2:event.target.value})
      }
      handleChangeCity(event){
        this.setState({father_city:event.target.value})
      }
      handleChangeStates(event,index,value){
        this.setState({father_state:value})
      }
      handleChangeMobile(event){
         this.setState({father_mobile:event.target.value})
      }
      componentWillMount(){}
      componentDidMount(){}  
      componentWillReceiveProps(props) 
      {
           if(typeof props.fatherInfo['father_dob']!='undefined'){
              if(props.fatherInfo['father_dob'] == '0000-00-00'){
                  props.fatherInfo['father_dob'] = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();
              }
              this.setState({father_dob:new Date(props.fatherInfo['father_dob'])});
           }     

            this.setState({
               father_full_name:props.fatherInfo['father_full_name'],
               father_adhar_card_number:props.fatherInfo['father_adhar_card'],
               father_education:props.fatherInfo['father_qualification'],
               father_occupation:props.fatherInfo['father_occupation'],
               father_income:Math.round(props.fatherInfo['income']),
               father_email:props.fatherInfo['father_email'],
               father_address1:props.fatherInfo['office_address1'],
               father_address2:props.fatherInfo['office_address2'],
               father_state:props.fatherInfo['state'],
               father_city:props.fatherInfo['city'],
               father_mobile:props.fatherInfo['father_mobile'],
               myapplicantData:props.myapplicantData,
            });
      }
      handleSubmit(event){
          event.preventDefault();
          var mystate = this.state.father_state;
          var mycity = this.state.father_city;
          var myeducation = this.state.father_education;
          var myoccupation = this.state.father_occupation;

          $.ajax({
              url: base_url+'admin_con/edit_father?id='+this.state.myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#father_form').serialize()+'&father_state='+mystate+'&father_education='+myeducation+'&father_occupation='+myoccupation,
              success: function(resdata) {
                if(resdata.success){
                   swal({
                      title: "Records Updated successfully...",
                      type: "success",
                      confirmButtonClass: 'btn-success',
                      confirmButtonText: 'Okay'
                    });
                }
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
          const {father_full_name,father_adhar_card_number,father_dob,father_education,father_occupation,father_income,father_email,father_address1,father_address2,father_state,father_city,father_mobile} = this.state;
          return(
              <div className="body">
                 <ValidatorForm id="father_form" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
                    <div className="row clearfix">
                         <div className="col-sm-6">
                                    <TextValidator
                                        floatingLabelText="Full Name"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        inputStyle={styles.floatingLabelStyle}
                                        underlineStyle={styles.underlineStyle}
                                        onChange={this.handleChangeFname}
                                        name="father_full_name"
                                        type="text"
                                        value={father_full_name}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        id="father_full_name"
                                        fullWidth={true}
                                />
                          </div>
                         <div className="col-sm-6">       
                              <TextValidator
                                floatingLabelText="Aadhar Card"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                                underlineStyle={styles.underlineStyle}
                                onChange={this.handleChangeAcard}
                                name="father_adhar_card_number"
                                type="text"
                                value={father_adhar_card_number}
                                id="father_adhar_card_number"
                                validators={['isNumber']}
                                errorMessages={['enter only number']}
                                fullWidth={true}
                              />
                        </div>
                    </div> 
                    <div className="row clearfix">
                           <div className="col-sm-6">  
                                <DatePicker 
                                    floatingLabelText="Birth Date"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    onChange={this.handleChangeDob}
                                    openToYearSelection={true} 
                                    fullWidth={true} 
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    name="father_dob" 
                                    id="father_dob" 
                                    value={father_dob}
                                    defaultDate={father_dob}
                                    autoOk={true}
                                />
                          </div>
                          <div className="col-sm-6">
                              <SelectValidator 
                                    name="father_education" 
                                    floatingLabelText="Education"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    labelStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    value={father_education}
                                    defaultValue={father_education}
                                    onChange={this.handleChangeEducation}
                                    id="father_education"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    fullWidth={true}
                                  >
                                    <MenuItem value={null} primaryText="" />
                                    <MenuItem value="ssc" primaryText="SSC" />
                                    <MenuItem value="hsc" primaryText="HSC" />
                                    <MenuItem value="graduation" primaryText="Graduate" />
                                    <MenuItem value="post_graduation" primaryText="Post Graduate" />
                                    <MenuItem value="doctorate" primaryText="Doctorate" />
                                    <MenuItem value="others" primaryText="Others" />
                              </SelectValidator>
                          </div>
                   </div> 
                   <div className="row clearfix">
                       <div className="col-sm-6">  
                          <SelectValidator 
                                name="father_occupation" 
                                floatingLabelText="Occupation"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                                labelStyle={styles.floatingLabelStyle}
                                underlineStyle={styles.underlineStyle}
                                value={father_occupation}
                                defaultValue={father_occupation}
                                onChange={this.handleChangeOccupation}
                                id="father_occupation"
                                fullWidth={true}
                              >
                              {this.props.occuFatherInfo}
                          </SelectValidator>
                       </div> 
                       <div className="col-sm-6"> 
                         <TextValidator
                            floatingLabelText="Income (month)"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            labelStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeIncome}
                            name="father_income"
                            type="text"
                            value={father_income}
                            id="father_income"
                            validators={['isNumber']}
                            errorMessages={['enter only number']}
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
                          labelStyle={styles.floatingLabelStyle}
                          underlineStyle={styles.underlineStyle}
                          onChange={this.handleChangeEmail}
                          name="father_email"
                          type="email"
                          value={father_email}
                          id="father_email"
                          validators={['required','isEmail']}
                          errorMessages={['this field is required','enter valid email']}
                          fullWidth={true}
                  />
              </div>
              <div className="col-sm-6">    
                <TextValidator
                      name="father_address1"
                      floatingLabelText="Office/Home Address1"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      inputStyle={styles.floatingLabelStyle}
                      labelStyle={styles.floatingLabelStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={this.handleChangeAddress1}
                      id="father_address1"
                      value={father_address1}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      fullWidth={true}
                />
              </div> 
             </div> 
             <div className="row clearfix">
               <div className="col-sm-6">  
                  <TextField
                        name="father_address2"
                        floatingLabelText="Office/Home Address2"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        inputStyle={styles.floatingLabelStyle}
                        labelStyle={styles.floatingLabelStyle}
                        underlineStyle={styles.underlineStyle}
                        onChange={this.handleChangeAddress2}
                        id="father_address2"
                        value={father_address2}
                        fullWidth={true}
                  />
               </div>
               <div className="col-sm-6">   
                  <TextField
                        name="father_city"
                        floatingLabelText="City"
                        id="father_city"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        inputStyle={styles.floatingLabelStyle}
                        labelStyle={styles.floatingLabelStyle}
                        underlineStyle={styles.underlineStyle}
                        value={father_city}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={this.handleChangeCity}
                        fullWidth={true}
                  />
               </div>
              </div>
              <div className="row clearfix">
               <div className="col-sm-6">     
                  <SelectValidator 
                        name="father_state" 
                        floatingLabelText="States"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        inputStyle={styles.floatingLabelStyle}
                        labelStyle={styles.floatingLabelStyle}
                        underlineStyle={styles.underlineStyle}
                        value={father_state}
                        defaultValue={father_state}
                        onChange={this.handleChangeStates}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        id="father_state"
                        fullWidth={true}
                      >
                      {this.props.statesInfo}
                  </SelectValidator>
               </div>
               <div className="col-sm-6">   
                  <TextValidator
                      floatingLabelText="Mobile"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      inputStyle={styles.floatingLabelStyle}
                      labelStyle={styles.floatingLabelStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={this.handleChangeMobile}
                      name="father_mobile"
                      type="text"
                      value={father_mobile}
                      id="father_mobile"
                      validators={['required','isNumber']}
                      errorMessages={['this field is required','enter only number']}
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
                          primary={true}
                          type="button"
                          label="Cancel" 
                          onClick={this.handleCancel}
                    />
               </div> 
            </div>  
            </ValidatorForm> 
          </div>    
          );
    } 
            
}