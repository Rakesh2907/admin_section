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
export default class MotherForm extends React.Component
{
      constructor(props) {
            super(props);
            this.state = {
                mother_full_name:'',
                mother_adhar_card:'',
                mother_dob:todayDate,
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
            this.handleCancel = this.handleCancel.bind(this);
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
      handleCancel(){
           document.getElementById("cancelPanel").click(); 
      }
      handleChangeFname(event){
          this.setState({mother_full_name:event.target.value});
      }
      handleChangeAcard(event){
        this.setState({mother_adhar_card:event.target.value});
      }
      handleChangeDob(event,date){
          this.setState({mother_dob:date})
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
      componentWillReceiveProps(props) {

          if(typeof props.matherInfo['mother_dob']!='undefined'){
             if(props.matherInfo['mother_dob'] == '0000-00-00'){
                    props.matherInfo['mother_dob'] = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();
             }
             this.setState({mother_dob:new Date(props.matherInfo['mother_dob'])});
          } 
          this.setState({
            myapplicantData:props.myapplicantData,
            mother_full_name:props.matherInfo['mother_full_name'],
            mother_adhar_card:props.matherInfo['mother_adhar_card'],
            //mother_dob:new Date(props.matherInfo['mother_dob']),
            mother_education:props.matherInfo['mother_qualification'],
            mother_occupation:props.matherInfo['mother_occupation'],
            mother_income:Math.round(props.matherInfo['income']),
            mother_email:props.matherInfo['mother_email'],
            mother_office_add1: props.matherInfo['office_address1'],
            mother_office_add2: props.matherInfo['office_address2'],
            mother_state: props.matherInfo['state'],
            mother_city: props.matherInfo['city'],
            mother_mobile: props.matherInfo['mother_mobile']
          });
      }
      componentWillMount(){
         
      }
      componentDidMount(){}
      handleSubmit(event){
          event.preventDefault();
          var mystate = this.state.mother_state;
          var mycity = this.state.mother_city;
          var myeducation = this.state.mother_education;
          var myoccupation = this.state.mother_occupation;

          $.ajax({
              url: base_url+'admin_con/edit_mother?id='+this.state.myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#mother_form').serialize()+'&mother_state='+mystate+'&mother_education='+myeducation+'&mother_occupation='+myoccupation,
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

          const {mother_full_name,mother_adhar_card,mother_dob,mother_education,mother_occupation,mother_income,mother_email,mother_office_add1,mother_office_add2,mother_state,mother_city,mother_mobile} = this.state;

          return(
              <div className="body">
                  <ValidatorForm id="mother_form" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
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
                          name="mother_dob" 
                          id="mother_dob" 
                          value={mother_dob}
                          defaultDate={mother_dob}
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
                            {this.props.occuInfo}
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