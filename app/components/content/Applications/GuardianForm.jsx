import React from 'react';
import Input from '../fields/Input';
import DatePicker from 'react-bootstrap-date-picker';

var menuItems1 = [];
export default class GuardianForm extends React.Component
{
      constructor(props) {
            super(props);
            this.state = {
                guardian_birth:props.guardian_birth,
                mobile_num: props.guardian_mobile
            }
            this.handleChangeDate = this.handleChangeDate.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
      }
      handleCancel(){
            document.getElementById("cancelPanel").click();
      }
      handleChangeDate(value){
            this.setState({guardian_birth: value}); 
      }
      handleChange(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value == '' || re.test(e.target.value)) {
            this.setState({mobile_num: e.target.value})
        }
      }
      componentDidMount(){}
      componentWillReceiveProps(props) {
            this.setState({
              guardian_birth:props.guardian_birth,
              myapplicantData:props.myapplicantData,
              occuItems: props.occuItems
            });
      }
      handleSubmit(event){
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/edit_guardian?id='+this.state.myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#guardian_form').serialize(),
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
       var _inlineStyle = {
            marginRight: 10
       }
      return(
          <div className="body">
              <form id="guardian_form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group form-float">
                      <Input
                        labelname='Full Name'
                        textname='guar_full_name'
                        texttype='text'
                        required={true}
                      />
                </div>
                <div className="form-group form-float">
                      <Input
                        labelname='Relation to Candidate'
                        textname='guar_relation'
                        texttype='text'
                        required={true}
                      />
                </div>
                <div className="form-group form-float">
                      <Input
                        labelname='Adhar Card Number'
                        textname='guar_adhar_card'
                        texttype='text'
                        required={true}
                      />
                </div>
                <div className="form-group form-float">
                    <label className="form-label">Birth Date:</label>
                    <DatePicker id="guar_dob" dateFormat="YYYY/MM/DD" name="guar_dob" value={this.state.guardian_birth} required onChange={this.handleChangeDate}/>
                </div>
                <div className="form-group form-float">
                    <label className="form-label">Education:</label>
                    <select id="guar_education" className="form-control show-tick" data-live-search="true" name="guar_education">
                        <option value="ssc">SSC</option>
                        <option value="hsc">HSC</option>
                        <option value="graduate">Graduation</option>
                        <option value="post_graduate">Post Graduate</option>
                        <option value="doctorate">Doctorate</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group form-float">
                    <label className="form-label">Occupation:</label>
                    <select id="guar_occupation" className="form-control show-tick" data-live-search="true" name="guar_occupation">
                        <option value="0">Select </option>
                        {this.state.occuItems}
                    </select>
                </div>
                <div className="form-group form-float">
                    <div className="form-line">
                        <textarea name="guar_address" id="guar_address" cols="30" rows="3" className="form-control no-resize"  required></textarea>
                        <label className="form-label">Address</label>
                    </div>
                </div> 
                <div className="form-group form-float">
                      <Input
                        labelname='Mobile'
                        textname='guar_mobile'
                        texttype='number'
                        onChange={this.handleChange}
                        value={this.state.mobile_num}
                        required={true}
                      />
                </div>
                <div className="form-group form-float">
                      <Input
                        labelname='Email'
                        textname='guar_email'
                        texttype='email'
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