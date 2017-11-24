import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class ApplicationFormStatus extends React.Component
{
      constructor(props) {
          super(props);
          this.state = {
            disabled: false,
            myapplicantData: props.myapplicantData,
            applicant_form_status: '',
            applicantion_for_class: '',
            transaction_id: '',
            payment_options: '',
            registration_number: '',
            interview_status: '',
            document_status:'',
            convert_student:''
          }
          this.handleCancel = this.handleCancel.bind(this);
          this.covertToStudent = this.covertToStudent.bind(this);
      }
      handleCancel(){
          document.getElementById("cancelPanel").click();
      }
      componentWillReceiveProps(props)
      {
          this.setState({
               myapplicantData: props.myapplicantData,
               form_steps:props.statusInfo['steps'],
               childId:props.statusInfo['child_id'],
               convertToStudent:props.statusInfo['convert_to_student'],
               applicant_form_status:props.statusInfo['form_status'],
               applicantion_for_class:props.statusInfo['class_id'],
               transaction_id:props.statusInfo['transaction_id'],
               payment_options:props.statusInfo['payment_option'],
               registration_number:props.statusInfo['admission_registration_number'],
               interview_status:props.statusInfo['interview_status'],
               document_status:props.statusInfo['document_status'],
               convert_student:props.statusInfo['convert_to_student']
          });

          if(props.statusInfo['convert_to_student'] == '1')
          {
              this.setState({disabled:true});
          }else{
              this.setState({disabled:false});
          }  
      }
      covertToStudent(event,index,value)
      {
           this.setState({convert_student:value});
           $.ajax({
              url: base_url+'admin_con/convert_to_student',
              dataType: 'json',
              type: 'POST',
              data: {
                  applicant_id: this.state.myapplicantData,
                  converto: value,
                  child_id: this.state.childId,
                  class_id: this.state.applicantion_for_class
              },
              success: function(resdata) 
              {
                if(resdata.success)
                {
                   swal({
                      title: "Convert to Student Successfully",
                      type: "success",
                      confirmButtonClass: 'btn-success',
                      confirmButtonText: 'Okay'
                    },function(){
                        //location.reload();
                    });
                    this.setState({disabled:true});
                }else{
                    this.setState({disabled:false});
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
         const {applicant_form_status,applicantion_for_class,payment_options,transaction_id,registration_number,interview_status,document_status,convert_student} = this.state;
         let mysteps;
         if(this.state.form_steps === '9')
         {
            mysteps = (
                <div className="col-sm-6">
                    <SelectValidator 
                              name="convert_student" 
                              floatingLabelText="Convert To Student"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={convert_student}
                              defaultValue={convert_student}
                              onChange={this.covertToStudent.bind(this)}
                              id="convert_student"
                              fullWidth={true}
                              disabled={this.state.disabled}
                            >
                            <MenuItem value="0" primaryText="NO" />
                            <MenuItem value="1" primaryText="YES" />
                   </SelectValidator>
                </div>
             )
         }else{
              <div className="col-sm-6"></div>
         }
        return(
            <div className="body">
                 <ValidatorForm id="form_status" ref="form" onError={errors => console.log(errors)}>
                    <div className="row clearfix">
                       <div className="col-sm-6">
                          <TextField
                                floatingLabelText="Form Status"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                                labelStyle={styles.floatingLabelStyle}
                                underlineStyle={styles.underlineStyle}
                                value={applicant_form_status}
                                fullWidth={true}
                                disabled={true}
                          />
                       </div>
                       <div className="col-sm-6">
                            <SelectValidator 
                                name="applicantion_for_class" 
                                floatingLabelText="Selected Standard"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                                labelStyle={styles.floatingLabelStyle}
                                underlineStyle={styles.underlineStyle}
                                value={applicantion_for_class}
                                defaultValue={applicantion_for_class}
                                id="applicantion_for_class"
                                fullWidth={true}
                                disabled={true}
                              >
                              {this.props.classInfo}
                          </SelectValidator>
                       </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-sm-6">
                             <TextField
                                  floatingLabelText="Payment Options"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={payment_options}
                                  fullWidth={true}
                                  disabled={true}
                            />
                        </div>
                        <div className="col-sm-6">
                              <TextField
                                  floatingLabelText="Transaction ID"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={transaction_id}
                                  fullWidth={true}
                                  disabled={true}
                             />
                        </div>
                    </div> 
                    <div className="row clearfix">
                        <div className="col-sm-6">
                              <TextField
                                  floatingLabelText="Registration Number"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={registration_number}
                                  fullWidth={true}
                                  disabled={true}
                              />
                        </div>
                        <div className="col-sm-6">
                             <TextField
                                  floatingLabelText="Interview Status"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={interview_status}
                                  fullWidth={true}
                                  disabled={true}
                              />
                        </div>
                    </div> 
                    <div className="row clearfix">
                        <div className="col-sm-6">
                            <TextField
                                  floatingLabelText="Document Status"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={document_status}
                                  fullWidth={true}
                                  disabled={true}
                              />
                        </div>
                       {mysteps}
                    </div> 
                 </ValidatorForm>
            </div>
        );
    } 
} 