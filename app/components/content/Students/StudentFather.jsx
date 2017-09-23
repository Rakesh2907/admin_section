import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

var menuItems4 = [];
var menuItems5 = [];
const todayDate = new Date();
export default class StudentFather extends React.Component
{
	constructor(props) 
    {
    	super(props);
    	this.state = {
    		father_full_name:'',
        father_adhar_card:'',
    		dob:todayDate,
    		father_education: '',
    		father_occupation: '',
    		father_income:'',
    		father_email:'',
    		father_office_add1:'',
    		father_office_add2:'',
    		father_state:'',
    		father_city:'',
        father_mobile: '',
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
    }
    handleChangeFname(event){
    	this.setState({father_full_name:event.target.value});
    }
    handleChangeAcard(event){
      this.setState({father_adhar_card:event.target.value});
    }
    handleChangeDob(event,date){
        this.setState({dob:date})
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
    	this.setState({father_office_add1:event.target.value})
    }
    handleChangeAddress2(event){
    	this.setState({father_office_add2:event.target.value})
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
    handleSubmit(event){
    	event.preventDefault();
      var studentId = sessionStorage.getItem('sess_student_id');
      var mystate = this.state.father_state;
      var mycity = this.state.father_city;
      var myeducation = this.state.father_education;
      var myoccupation = this.state.father_occupation;

       if(typeof this.props.Students!='undefined'){
            var myUrl =  base_url+'students_con/edit_father';
            var myData = $('#myform3').serialize()+'&father_state='+mystate+'&father_education='+myeducation+'&father_occupation='+myoccupation+'&student_id='+this.props.Students['student_id']+'&father_id='+this.props.Students['father_id'];
       }else{
            var myUrl =  base_url+'students_con/save_father';
            var myData = $('#myform3').serialize()+'&father_state='+mystate+'&father_education='+myeducation+'&father_occupation='+myoccupation+'&student_id='+studentId;
       }

       $.ajax({
                      type: 'POST',
                      url: myUrl,
                      data: myData,
                      dataType: 'json',
                      success: function (resdata) {
                          sessionStorage.setItem('sess_student_id', resdata.student_id);
                          swal({
                              title: "Father details Save Successfully...",
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
    componentDidMount()
    {
        if(typeof this.props.Students!='undefined'){
            $.ajax({
                    type: 'POST',
                    url: base_url+'students_con/get_father_details',
                    data: {
                      father_id: this.props.Students['father_id'],
                    },
                    dataType: 'json',
                    success: function (resdata) {
                      if(resdata.length > 0)
                      {

                          if(resdata[0]['father_dob'] == '0000-00-00'){
                              resdata[0]['father_dob'] = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();
                          }

                          this.setState({ 
                              father_full_name: resdata[0]['father_full_name'],
                              father_adhar_card: resdata[0]['father_adhar_card'], 
                              father_mobile: resdata[0]['father_mobile'],
                              dob: new Date(resdata[0]['father_dob']),
                              father_office_add1: resdata[0]['office_address1'],
                              father_office_add2: resdata[0]['office_address2'],
                              father_city: resdata[0]['city'], 
                              father_state: resdata[0]['state'],
                              father_education: resdata[0]['father_qualification'],
                              father_occupation: resdata[0]['father_occupation'],
                              father_email: resdata[0]['father_email'],
                              father_income: Math.round(resdata[0]['income']),
                          }, function(){$('input[name=dob]').trigger('change')});
                      }else{
                      }
                    }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                      }.bind(this)
            });
        }
    }
    componentWillMount(){
        
    	menuItems4 = [];
           $.ajax({
                type: 'POST',
                url: base_url+'admission_con/get_occupations',
                dataType:'json',
                 success: function (resdata) {
                  if(resdata.length > 0)
                  {
                      for(var i = 0;i < resdata.length;i++)
                      {
                          menuItems4.push(<MenuItem value={resdata[i]['occupations']} primaryText={resdata[i]['occupations']} />)
                      }
                  }
                 }.bind(this),
                    error: function(xhr, status, err) {
                      console.error(err.toString());
                }.bind(this)
           });

           menuItems5 = [];
           $.ajax({
                type: 'POST',
                url: base_url+'admission_con/get_states',
                dataType:'json',
                 success: function (resdata) {
                  if(resdata.length > 0)
                  {
                      for(var i = 0;i < resdata.length;i++)
                      {
                          menuItems5.push(<MenuItem value={resdata[i]['states']} primaryText={resdata[i]['states']} />)
                      }
                  }
                 }.bind(this),
                    error: function(xhr, status, err) {
                      console.error(err.toString());
                }.bind(this)
           });


    }
    render() 
    {
    	const styles = {
    		floatingLabelStyle: {
    			color: black500,
  			},
  			underlineStyle: {
    			borderColor: black500,
  			}
    	}
      	const {father_full_name,father_adhar_card,dob,father_education,father_occupation,father_income,father_email,father_office_add1,father_office_add2,father_state,father_city,father_mobile} = this.state;
    	return(
    		<ValidatorForm id="myform3" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
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
                name="father_adhar_card"
                type="text"
                value={father_adhar_card}
                id="father_adhar_card"
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
                    		name="dob" 
                    		id="dob" 
                    		value={this.state.dob}
                    		defaultDate={dob}
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
                        {menuItems4}
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
                      name="father_office_add1"
                      floatingLabelText="Office/Home Address1"
                      floatingLabelStyle={styles.floatingLabelStyle}
    	                inputStyle={styles.floatingLabelStyle}
    	                labelStyle={styles.floatingLabelStyle}
    	                underlineStyle={styles.underlineStyle}
                      onChange={this.handleChangeAddress1}
                      id="father_office_add1"
                      value={father_office_add1}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      fullWidth={true}
                />
              </div> 
             </div> 
             <div className="row clearfix">
               <div className="col-sm-6">  
                  <TextField
                        name="father_office_add2"
                        floatingLabelText="Office/Home Address2"
                        floatingLabelStyle={styles.floatingLabelStyle}
      	                inputStyle={styles.floatingLabelStyle}
      	                labelStyle={styles.floatingLabelStyle}
      	                underlineStyle={styles.underlineStyle}
                        onChange={this.handleChangeAddress2}
                        id="father_office_add2"
                        value={father_office_add2}
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
                      {menuItems5}
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
               </div> 
            </div>  
    		</ValidatorForm>
    	);
    }
}    	