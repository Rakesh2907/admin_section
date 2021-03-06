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
export default class StudentMother extends React.Component
{
	constructor(props) 
    {
    	super(props);
    	this.state = {
    		mother_full_name:'',
        mother_adhar_card:'',
    		dob:todayDate,
    		mother_education: '',
    		mother_occupation: '',
    		mother_income:'',
    		mother_email:'',
    		mother_office_add1:'',
    		mother_office_add2:'',
    		mother_state:'',
    		mother_city:'',
        mother_mobile: '',
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
    	this.setState({mother_full_name:event.target.value});
    }
    handleChangeAcard(event){
      this.setState({mother_adhar_card:event.target.value});
    }
    handleChangeDob(event,date){
        this.setState({dob:date})
    }
    handleChangeEducation(event,index,value){
        //alert(value)
        this.setState({mother_education:value})
    }
    handleChangeIncome(event){
    	this.setState({mother_income:event.target.value});
    }
    handleChangeOccupation(event,index,value){
    	this.setState({mother_occupation:value})
    }
    handleChangeEmail(event){
        this.setState({mother_email:event.target.value})
    }
    handleChangeAddress1(event){
    	this.setState({mother_office_add1:event.target.value})
    }
    handleChangeAddress2(event){
    	this.setState({mother_office_add2:event.target.value})
    }
    handleChangeCity(event){
    	this.setState({mother_city:event.target.value})
    }
    handleChangeStates(event,index,value){
      this.setState({mother_state:value})
    }
    handleChangeMobile(event){
       this.setState({mother_mobile:event.target.value})
    }
    handleSubmit(event){
    
    	event.preventDefault();
      var studentId = sessionStorage.getItem('sess_student_id');
      var mystate = this.state.mother_state;
      var mycity = this.state.mother_city;
      var myeducation = this.state.mother_education;
      var myoccupation = this.state.mother_occupation;

      if(typeof this.props.Students!='undefined'){
          var myUrl =  base_url+'students_con/edit_mother';
          var myData =  $('#myform4').serialize()+'&mother_state='+mystate+'&mother_education='+myeducation+'&mother_occupation='+myoccupation+'&student_id='+this.props.Students['student_id']+'&mother_id='+this.props.Students['mother_id'];
       }else{
          var myUrl =  base_url+'students_con/save_mother';
          var myData =  $('#myform4').serialize()+'&mother_state='+mystate+'&mother_education='+myeducation+'&mother_occupation='+myoccupation+'&student_id='+studentId; 
       }

      $.ajax({
                      type: 'POST',
                      url: myUrl,
                      data: myData,
                      dataType: 'json',
                      success: function (resdata) {
                          sessionStorage.setItem('sess_student_id', resdata.student_id);
                          swal({
                              title: "Mother details Save Successfully...",
                              type: "success",
                              confirmButtonClass: 'btn-success',
                              confirmButtonText: 'Okay'
                          },function(){
                                document.getElementById("next_button_3").click();
                          });
                      }.bind(this),
                        error: function(xhr, status, err) {
                          console.error(err.toString());
                      }.bind(this)
      });
    }
    componentDidMount()
    {
        if(typeof this.props.Students!='undefined')
        {
            $.ajax({
                    type: 'POST',
                    url: base_url+'students_con/get_mother_details',
                    data: {
                      mother_id: this.props.Students['mother_id'],
                    },
                    dataType: 'json',
                    success: function (resdata) {
                      if(resdata.length > 0)
                      {

                          if(resdata[0]['mother_dob'] == '0000-00-00'){
                              resdata[0]['mother_dob'] = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();
                          }
                          
                          this.setState({ 
                              mother_full_name: resdata[0]['mother_full_name'],
                              mother_adhar_card: resdata[0]['mother_adhar_card'], 
                              mother_mobile: resdata[0]['mother_mobile'],
                              dob: new Date(resdata[0]['mother_dob']),
                              mother_office_add1: resdata[0]['office_address1'],
                              mother_office_add2: resdata[0]['office_address2'],
                              mother_city: resdata[0]['city'], 
                              mother_state: resdata[0]['state'],
                              mother_education: resdata[0]['mother_qualification'],
                              mother_occupation: resdata[0]['mother_occupation'],
                              mother_email: resdata[0]['mother_email'],
                              mother_income: Math.round(resdata[0]['income']),
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
      	const {mother_full_name,mother_adhar_card,dob,mother_education,mother_occupation,mother_income,mother_email,mother_office_add1,mother_office_add2,mother_state,mother_city,mother_mobile} = this.state;
    	return(
    		<ValidatorForm id="myform4" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
         <div className="row clearfix">
             <div className="col-sm-6">
          			<TextValidator
                            floatingLabelText="Full Name"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeFname}
                            name="mother_full_name"
                            type="text"
                            value={mother_full_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            id="mother_full_name"
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
                  name="mother_adhar_card"
                  type="text"
                  value={mother_adhar_card}
                  id="mother_adhar_card"
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
                        name="mother_education" 
                        floatingLabelText="Education"
                        floatingLabelStyle={styles.floatingLabelStyle}
      	                inputStyle={styles.floatingLabelStyle}
      	                labelStyle={styles.floatingLabelStyle}
      	                underlineStyle={styles.underlineStyle}
                        value={mother_education}
                        defaultValue={mother_education}
                        onChange={this.handleChangeEducation}
                        id="mother_education"
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
                        name="mother_occupation" 
                        floatingLabelText="Occupation"
                        floatingLabelStyle={styles.floatingLabelStyle}
      	                inputStyle={styles.floatingLabelStyle}
      	                labelStyle={styles.floatingLabelStyle}
      	                underlineStyle={styles.underlineStyle}
                        value={mother_occupation}
                        defaultValue={mother_occupation}
                        onChange={this.handleChangeOccupation}
                        id="mother_occupation"
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
                    name="mother_income"
                    type="text"
                    value={mother_income}
                    id="mother_income"
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
                          name="mother_email"
                          type="email"
                          value={mother_email}
                          id="mother_email"
                          validators={['required','isEmail']}
                          errorMessages={['this field is required','enter valid email']}
                          fullWidth={true}
                  />
              </div>
              <div className="col-sm-6">    
                <TextValidator
                      name="mother_office_add1"
                      floatingLabelText="Office/Home Address1"
                      floatingLabelStyle={styles.floatingLabelStyle}
    	                inputStyle={styles.floatingLabelStyle}
    	                labelStyle={styles.floatingLabelStyle}
    	                underlineStyle={styles.underlineStyle}
                      onChange={this.handleChangeAddress1}
                      id="mother_office_add1"
                      value={mother_office_add1}
                      validators={['required']}
                      errorMessages={['this field is required']}
                      fullWidth={true}
                />
              </div>
             </div> 
             <div className="row clearfix">
               <div className="col-sm-6">   
                  <TextField
                        name="mother_office_add2"
                        floatingLabelText="Office/Home Address2"
                        floatingLabelStyle={styles.floatingLabelStyle}
      	                inputStyle={styles.floatingLabelStyle}
      	                labelStyle={styles.floatingLabelStyle}
      	                underlineStyle={styles.underlineStyle}
                        onChange={this.handleChangeAddress2}
                        id="mother_office_add2"
                        value={mother_office_add2}
                        fullWidth={true}
                  />
              </div>
              <div className="col-sm-6">    
                  <TextField
                        name="mother_city"
                        floatingLabelText="City"
                        id="mother_city"
                        floatingLabelStyle={styles.floatingLabelStyle}
      	                inputStyle={styles.floatingLabelStyle}
      	                labelStyle={styles.floatingLabelStyle}
      	                underlineStyle={styles.underlineStyle}
                        value={mother_city}
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
                        name="mother_state" 
                        floatingLabelText="States"
                        floatingLabelStyle={styles.floatingLabelStyle}
      	              inputStyle={styles.floatingLabelStyle}
      	              labelStyle={styles.floatingLabelStyle}
      	              underlineStyle={styles.underlineStyle}
                        value={mother_state}
                        defaultValue={mother_state}
                        onChange={this.handleChangeStates}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        id="mother_state"
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
                      name="mother_mobile"
                      type="text"
                      value={mother_mobile}
                      id="mother_mobile"
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