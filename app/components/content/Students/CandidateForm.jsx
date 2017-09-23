import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';

var menuItems1 = []
export default class CandidateForm extends React.Component 
{
	constructor(props) 
    {
     	super(props);
     	const todayDate = new Date();
     	this.state={
     		first_name: '',
     		last_name: '',
     		adhar_card_number: '',
     		mobile: '',
     		dob: todayDate,
     		nationality: 'india',
     		address1: '',
     		address2: '',
     		states: 'Maharashtra',
     		city: '',
     		email: '',
     		blood_group: 'unknown',
        gender: "male",
        Students: props.Students
     	}
     	this.handleChangeFname = this.handleChangeFname.bind(this);
     	this.handleChangeLname = this.handleChangeLname.bind(this);
     	this.handleChangeAcard = this.handleChangeAcard.bind(this);
     	this.handleChangeMobile = this.handleChangeMobile.bind(this);
     	this.handleChangeDob = this.handleChangeDob.bind(this);
     	this.handleChangeNationality = this.handleChangeNationality.bind(this);
     	this.handleChangeAddress1 = this.handleChangeAddress1.bind(this);
     	this.handleChangeAddress2 = this.handleChangeAddress2.bind(this);
     	this.handleChangeState = this.handleChangeState.bind(this);
     	this.handleChangeCity = this.handleChangeCity.bind(this);
     	this.handleChangePin = this.handleChangePin.bind(this);
     	this.handleChangeEmail = this.handleChangeEmail.bind(this);
     	this.handleChangeBlood = this.handleChangeBlood.bind(this);
      this.handleGender = this.handleGender.bind(this);
    }
    handleChangeFname(event){
    	this.setState({first_name:event.target.value})
    }
    handleChangeLname(event){
    	this.setState({last_name:event.target.value})
    }
    handleChangeAcard(event){
    	this.setState({adhar_card_number:event.target.value})
    }
    handleChangeMobile(event){
    	this.setState({mobile:event.target.value})
    }
    handleChangeDob(event,date){
        this.setState({dob:date})
    }
    handleChangeNationality(event,index,value){
    	this.setState({nationality:value})
    }
    handleChangeAddress1(event){
    	this.setState({address1:event.target.value})
    }
    handleChangeAddress2(event){
    	this.setState({address2:event.target.value})
    }
    handleChangeState(event,index,value){
        this.setState({states:value})
    }
    handleChangeCity(event){
      this.setState({city:event.target.value})
    }
    handleChangePin(event){
        this.setState({pin:event.target.value})
    }
    handleChangeEmail(event){
    	this.setState({email:event.target.value})
    }
    handleChangeBlood(event,index,value){
    		this.setState({blood_group:value})
    }
    handleGender(event,value){
       this.setState({gender:value});
    }
    handleSubmit(event){
    	event.preventDefault();
      var mystate = this.state.states;
      var mynationality = this.state.nationality;
      var myblood = (this.state.blood_group);
      if(typeof this.props.Students!='undefined'){
          var myUrl =  base_url+'students_con/edit_student';
          var myData = $('#myform1').serialize()+'&states='+mystate+'&nationality='+mynationality+'&blood_group='+myblood+'&child_id='+this.props.Students['child_id']+'&student_id='+this.props.Students['student_id'];
      }else{
          var myUrl =  base_url+'students_con/save_student';
          var myData = $('#myform1').serialize()+'&states='+mystate+'&nationality='+mynationality+'&blood_group='+myblood
      }

      $.ajax({
                      type: 'POST',
                      url: myUrl,
                      data: myData,
                      dataType: 'json',
                      success: function (resdata) {
                          sessionStorage.setItem('sess_student_id', resdata.student_id);
                          sessionStorage.setItem('sess_child_id', resdata.child_id);
                          swal({
                              title: "Student Save Successfully...",
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
    componentWillReceiveProps(props){

    }
    componentDidMount(){

      if(typeof this.props.Students!='undefined')
      {
          $.ajax({
                    type: 'POST',
                    url: base_url+'students_con/get_candidate_details',
                    data: {
                      child_id: this.props.Students['child_id'],
                    },
                    dataType: 'json',
                    success: function (resdata) {
                      if(resdata.length > 0)
                      {
                          this.setState({ 
                              first_name: resdata[0]['child_firstname'],
                              last_name: resdata[0]['child_lastname'], 
                              adhar_card_number: resdata[0]['child_adhar_card'],
                              mobile: resdata[0]['mobile'],
                              dob: new Date(resdata[0]['child_dob']),
                              address1: resdata[0]['address_line1'],
                              address2: resdata[0]['address_line2'],
                              city: resdata[0]['city'], 
                              states: resdata[0]['states'],
                              pin: resdata[0]['pin'],
                              email: resdata[0]['email'],
                              blood_group: resdata[0]['blood_group'],
                              nationality: resdata[0]['nationality'],
                              gender: resdata[0]['gender'] 
                          }, function(){
                             
                            });
                      }else{
                      }
                    }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                      }.bind(this)
            });
      }
    }
    componentWillMount()
    {
          menuItems1 = [];
           $.ajax({
                type: 'POST',
                url: base_url+'admission_con/get_states',
                dataType:'json',
                 success: function (resdata) {
                  if(resdata.length > 0)
                  {
                      for(var i = 0;i < resdata.length;i++)
                      {
                          menuItems1.push(<MenuItem value={resdata[i]['states']} primaryText={resdata[i]['states']} />)
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
  			},
  			radioButton: {
    			    marginTop:16,
    			    marginLeft:10,
              width: 'auto',
              display: 'inline-block'
    	    }
    	}
    	const {first_name,last_name,adhar_card_number,mobile,dob,nationality,address1,address2,states,city,pin,email,blood_group,gender} = this.state; 
    	return(
    		<ValidatorForm id="myform1" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
         <div className="row clearfix">
             <div className="col-sm-6">
          			   <TextValidator
                            floatingLabelText="First Name"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeFname}
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
                          onChange={this.handleChangeLname}
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
  	                floatingLabelText="Aadhar Card"
  	                floatingLabelStyle={styles.floatingLabelStyle}
  	                inputStyle={styles.floatingLabelStyle}
  	                underlineStyle={styles.underlineStyle}
  	                onChange={this.handleChangeAcard}
  	                name="adhar_card_number"
  	                type="text"
  	                value={adhar_card_number}
  	                id="adhar_card_number"
  	                validators={['isNumber']}
  	                errorMessages={['enter only number']}
  	                fullWidth={true}
                />
             </div>
             <div className="col-sm-6"> 
                <TextValidator
                    floatingLabelText="Parent Mobile Number"
                    floatingLabelStyle={styles.floatingLabelStyle}
  	                inputStyle={styles.floatingLabelStyle}
  	                underlineStyle={styles.underlineStyle}
                    onChange={this.handleChangeMobile}
                    name="mobile"
                    type="text"
                    value={mobile}
                    id="mobile"
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
                  	value={dob}
                  	defaultDate={dob}
                  	autoOk={true}
                />
              </div>
            <div className="col-sm-6">      
                <label>Nationality</label>
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
           			<SelectValidator 
                        name="blood_group" 
                        floatingLabelText="Blood Group"
                        floatingLabelStyle={styles.floatingLabelStyle}
    	                  inputStyle={styles.floatingLabelStyle}
    	                  labelStyle={styles.floatingLabelStyle}
    	                  underlineStyle={styles.underlineStyle}
                        value={blood_group}
                        defaultValue={blood_group}
                        onChange={this.handleChangeBlood}
                        validators={['required']}
                        errorMessages={['this field is required']}
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
                      onChange={this.handleChangeNationality}
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
      	            <TextValidator
      		              floatingLabelText="Address Line1"
      		              floatingLabelStyle={styles.floatingLabelStyle}
                        inputStyle={styles.floatingLabelStyle}
                        underlineStyle={styles.underlineStyle}
      		              onChange={this.handleChangeAddress1}
      		              name="address1"
      		              type="text"
      		              value={address1}
      		              validators={['required']}
      		              errorMessages={['this field is required']}
      		              id="address1"
      		              fullWidth={true}
                  	 />
                  </div>
                  <div className="col-sm-6">    
      	            <TextValidator
      	              floatingLabelText="Address Line2"
      	              floatingLabelStyle={styles.floatingLabelStyle}
      		          inputStyle={styles.floatingLabelStyle}
      		          underlineStyle={styles.underlineStyle}
      	              onChange={this.handleChangeAddress2}
      	              name="address2"
      	              type="text"
      	              value={address2}
      	              id="address2"
      	              fullWidth={true}
      	            />
                  </div>
             </div>
             <div className="row clearfix">  
              <div className="col-sm-6">  
  	            <SelectValidator 
                    name="states" 
                    floatingLabelText="States"
                    floatingLabelStyle={styles.floatingLabelStyle}
  	                inputStyle={styles.floatingLabelStyle}
  	                labelStyle={styles.floatingLabelStyle}
  	                underlineStyle={styles.underlineStyle}
                    value={states}
                    defaultValue={states}
                    onChange={this.handleChangeState}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    id="states"
                    fullWidth={true}
                  >
                  {menuItems1}
                 </SelectValidator>
               </div>
               <div className="col-sm-6">   
                 <TextValidator
  	              floatingLabelText="City"
  	              floatingLabelStyle={styles.floatingLabelStyle}
  		            inputStyle={styles.floatingLabelStyle}
  		            underlineStyle={styles.underlineStyle}
  	              onChange={this.handleChangeCity}
  	              name="city"
  	              type="text"
  	              value={city}
  	              validators={['required']}
  	              errorMessages={['this field is required']}
  	              id="city"
  	              fullWidth={true}
                />
              </div>
             </div> 
             <div className="row clearfix"> 
              <div className="col-sm-6">   
                <TextValidator
  	              floatingLabelText="Pin Code"
  	              floatingLabelStyle={styles.floatingLabelStyle}
  		          inputStyle={styles.floatingLabelStyle}
  		          underlineStyle={styles.underlineStyle}
  	              onChange={this.handleChangePin}
  	              name="pin"
  	              type="text"
  	              value={pin}
  	              validators={['required','isNumber']}
  	              errorMessages={['this field is required', 'enter only number']}
  	              id="pin"
  	              fullWidth={true}
               />
              </div>
              <div className="col-sm-6"> 
                  <TextValidator
                          floatingLabelText="Email"
                          floatingLabelStyle={styles.floatingLabelStyle}
      		          	    inputStyle={styles.floatingLabelStyle}
      		          	    underlineStyle={styles.underlineStyle}
                          onChange={this.handleChangeEmail}
                          name="email"
                          type="email"
                          id="email"
                          value={email}
                          validators={['required', 'isEmail']}
                          errorMessages={['this field is required', 'email is not valid']}
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