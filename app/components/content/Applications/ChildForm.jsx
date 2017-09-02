import React from 'react';
import Input from '../fields/Input';
import DatePicker from 'react-bootstrap-date-picker';

export default class ChildForm extends React.Component
{
        constructor(props) {
            super(props); 
             this.state = {
                 child_birth: props.child_birth,
                 mobile_num: props.child_mobile
             }
             this.handleChangeDate = this.handleChangeDate.bind(this);
             this.handleChange = this.handleChange.bind(this);
             this.handleCancel = this.handleCancel.bind(this);
        }
        handleCancel(){
            document.getElementById("cancelPanel").click();  
        }
        componentWillReceiveProps(props){
              this.setState({
                child_birth: props.child_birth,
                myapplicantData:props.myapplicantData
              });
        }
        handleChange(e){
          const re = /^[0-9\b]+$/;
          if (e.target.value == '' || re.test(e.target.value)){
            this.setState({mobile_num: e.target.value})
          }
        }
        handleChangeDate(value){
           this.setState({
              child_birth: value
           });
        }
        handleSubmit(event){
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/edit_child?id='+this.state.myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#child_form').serialize(),
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
              <form id="child_form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group form-float">
                    <Input
                        labelname='First Name'
                        textname='child_first_name'
                        texttype='text'
                        required={true}
                    />
                </div>
                <div className="form-group form-float">
                    <Input
                        labelname='Last Name'
                        textname='child_last_name'
                        texttype='text'
                        required={true}
                    />
                </div>
                <div className="form-group form-float">
                    <Input
                        labelname='Adhar Card Number'
                        textname='adhar_card_number'
                        texttype='text'
                        required={true}
                    />
                </div>
                <div className="form-group form-float">
                    <label className="form-label">Siblings (Real brothers / Sisters):</label>
                    <select id="siblings" name="siblings" className="show-tick form-control" data-live-search="true">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                    </select>
                </div>
                <div className="form-group form-float">
                    <label className="form-label">Birth Date:</label>
                    <DatePicker id="example-datepicker" dateFormat="YYYY/MM/DD" name="child_dob" value={this.state.child_birth} required onChange={this.handleChangeDate}/>
                </div>
                <div className="form-group form-float">
                    <label className="form-label">Gender:</label>
                   <select id="child_gender" className="form-control show-tick" data-live-search="true">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group form-float">
                    <div className="form-line">
                        <textarea name="child_address" id="child_address" cols="30" rows="3" className="form-control no-resize"  required></textarea>
                        <label className="form-label">Address</label>
                    </div>
                </div>
                <div className="form-group form-float">
                    <Input
                        labelname='Mobile Number'
                        textname='mobile_number'
                        texttype='number'
                        onChange={this.handleChange}
                        value={this.state.mobile_num}
                        required={true}
                    />
                </div>
                <div className="form-group form-float">
                    <Input
                        labelname='Email'
                        textname='email'
                        texttype='text'
                        required={true}
                    />
                </div>
                <div className="form-group form-float">
                    <Input
                        labelname='Previous School'
                        textname='previous_school'
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