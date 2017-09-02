import React from 'react';
import Input from '../fields/Input';

export default class ApplicantForm extends React.Component
{
      constructor(props) {
            super(props);
             this.state = {}
             this.handleCancel = this.handleCancel.bind(this);
      } 
      componentWillReceiveProps(props){
          this.setState({myapplicantData:props.myapplicantData});
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
        return(
            <div className="body">
              <form id="applicant_form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group form-float">
                      <Input
                        labelname='Name'
                        textname='applicant_name'
                        texttype='text'
                        required={true}
                      />
                </div>
                <div className="form-group form-float">
                      <Input
                        labelname='Email'
                        textname='applicant_email'
                        texttype='email'
                        required={true}
                      />
                </div>
                <div className="form-group form-float">
                      <Input
                        labelname='Mobile'
                        textname='applicant_mobile'
                        texttype='number'
                        mypattern='[0-9]{10}'
                        required={true}
                      />
                </div>
                <div className="form-group form-float">
                      <Input
                        labelname='Adhar Card Number'
                        textname='applicant_adhar_card'
                        texttype='text'
                        required={true}
                      />
                </div>
                <div className="form-group form-float">
                      <Input
                        labelname='Password'
                        textname='applicant_password'
                        texttype='text'
                        required={true}
                      />
                </div>
                <button className="btn btn-primary waves-effect" type="submit" style={_inlineStyle}>Update</button>
                <button className="btn btn-primary waves-effect" type="button" onClick={this.handleCancel}>Cancel</button>
              </form>
            </div>
        );
    }      
}