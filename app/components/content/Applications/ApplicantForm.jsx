import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';

export default class ApplicantForm extends React.Component
{
      constructor(props) {
            super(props);
             this.state = {
                applicant_name: '',
                applicant_email: '',
                applicant_mobile: '',
                applicant_adhar_card: '',
                applicant_password: ''
             }
             this.handleCancel = this.handleCancel.bind(this);
             this.handleChangeName = this.handleChangeName.bind(this);
             this.handleChangeEmail = this.handleChangeEmail.bind(this);
             this.handleChangeMobile = this.handleChangeMobile.bind(this);
             this.handleChangeAcard = this.handleChangeAcard.bind(this);
             this.handleChangePassword = this.handleChangePassword.bind(this);
      } 
      handleChangeName(event){
          this.setState({applicant_name:event.target.value});
      }
      handleChangeEmail(event){
          this.setState({applicant_email:event.target.value});
      }
      handleChangeMobile(event){
          this.setState({applicant_mobile:event.target.value});
      }
      handleChangeAcard(event){
          this.setState({applicant_adhar_card:event.target.value});
      }
      handleChangePassword(event){
          this.setState({applicant_password:event.target.value});
      }
      componentWillReceiveProps(props){
          this.setState({
            applicant_name:props.applicantDetails['applicant_name'],
            applicant_email:props.applicantDetails['applicant_email'],
            applicant_mobile:props.applicantDetails['applicant_mobile'],
            applicant_adhar_card:props.applicantDetails['applicant_adhar_card'],
            applicant_password:props.applicantDetails['applicant_password'],
            myapplicantData:props.myapplicantData
          });
      }
      componentDidMount(){

      }
      handleCancel()
      {
            document.getElementById("cancelPanel").click();  
      }
      handleSubmit(event){
      event.preventDefault();
      $.ajax({
          url: base_url+'admin_con/edit_applicant?id='+this.state.myapplicantData,
          dataType: 'json',
          type: 'POST',
          data: $('#applicant_form').serialize(),
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
    render() {
        var _inlineStyle = {
            marginRight: 10
        }
        const styles = {
          floatingLabelStyle: {
            color: black500,
          },
          underlineStyle: {
            borderColor: black500,
          }
        }

        const {applicant_name,applicant_email,applicant_mobile,applicant_adhar_card,applicant_password} = this.state;
        return(
          <div className="body">
            <ValidatorForm id="applicant_form" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
               <div className="row clearfix">
                   <div className="col-sm-6">
                      <TextValidator
                            floatingLabelText="Name"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeName}
                            name="applicant_name"
                            type="text"
                            value={applicant_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            id="applicant_name"
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
                          name="applicant_email"
                          type="email"
                          id="applicant_email"
                          value={applicant_email}
                          validators={['required', 'isEmail']}
                          errorMessages={['this field is required', 'email is not valid']}
                          fullWidth={true}
                       />
                   </div>
               </div>
               <div className="row clearfix">
                   <div className="col-sm-6">
                      <TextValidator
                        floatingLabelText="Mobile Number"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        inputStyle={styles.floatingLabelStyle}
                        underlineStyle={styles.underlineStyle}
                        onChange={this.handleChangeMobile}
                        name="applicant_mobile"
                        type="text"
                        value={applicant_mobile}
                        id="applicant_mobile"
                        validators={['isNumber']}
                        errorMessages={['enter only number']}
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
                          name="applicant_adhar_card"
                          type="text"
                          value={applicant_adhar_card}
                          id="applicant_adhar_card"
                          validators={['isNumber']}
                          errorMessages={['enter only number']}
                          fullWidth={true}
                     />
                   </div>
               </div>
               <div className="row clearfix">
                   <div className="col-sm-6">
                      <TextValidator
                            floatingLabelText="Password"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangePassword}
                            name="applicant_password"
                            type="text"
                            value={applicant_password}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            id="applicant_password"
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
                          label="Update" 
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