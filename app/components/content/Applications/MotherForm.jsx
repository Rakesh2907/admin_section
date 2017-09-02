import React from 'react';
import Input from '../fields/Input';
import DatePicker from 'react-bootstrap-date-picker';

var menuItems2 = [];
export default class MotherForm extends React.Component
{
      constructor(props) {
            super(props);
            this.state = {
                mother_birth:props.mother_birth,
                mobile_num: props.mother_mobile
            }
            this.handleChangeDate = this.handleChangeDate.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
      }
      handleCancel(){
           document.getElementById("cancelPanel").click(); 
      }
      handleChangeDate(value){
          this.setState({mother_birth: value}); 
      }
      handleChange(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value == '' || re.test(e.target.value)) 
        {
            this.setState({mobile_num: e.target.value})
        }
      }
      componentWillReceiveProps(props) {
          this.setState({
            mother_birth:props.mother_birth,
            myapplicantData:props.myapplicantData,
            occuItems: props.occuItems
          });
      }
      componentDidMount(){}
      handleSubmit(event){
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/edit_mother?id='+this.state.myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#mother_form').serialize(),
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
                  <form id="mother_form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group form-float">
                          <Input
                            labelname='Full Name'
                            textname='mother_full_name'
                            texttype='text'
                            required={true}
                          />
                        </div>
                        <div className="form-group form-float">
                          <Input
                            labelname='Adhar Card Number'
                            textname='mother_adhar_card_number'
                            texttype='text'
                            required={true}
                          />
                      </div>
                      <div className="form-group form-float">
                        <label className="form-label">Birth Date:</label>
                        <DatePicker id="mother-datepicker" dateFormat="YYYY/MM/DD" name="mother_dob" value={this.state.mother_birth} required onChange={this.handleChangeDate}/>
                      </div>
                      <div className="form-group form-float">
                        <label className="form-label">Education:</label>
                        <select id="mother_education" className="form-control show-tick" data-live-search="true" name="mother_education">
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
                        <select id="mother_occupation" className="form-control show-tick" data-live-search="true" name="mother_occupation">
                            <option value="0">Select </option>
                            {this.state.occuItems}
                        </select>
                    </div>
                    <div className="form-group form-float">
                          <Input
                            labelname='Desigantion'
                            textname='mother_desigantion'
                            texttype='text'
                            required={true}
                          />
                    </div> 
                    <div className="form-group form-float">
                        <div className="form-line">
                            <textarea name="mother_address" id="mother_address" cols="30" rows="3" className="form-control no-resize"  required></textarea>
                            <label className="form-label">Address</label>
                        </div>
                    </div> 
                    <div className="form-group form-float">
                          <Input
                            labelname='Mobile'
                            textname='mother_mobile'
                            texttype='number'
                            onChange={this.handleChange}
                            value={this.state.mobile_num}
                            required={true}
                          />
                    </div>
                    <div className="form-group form-float">
                          <Input
                            labelname='Email'
                            textname='mother_email'
                            texttype='text'
                            required={true}
                          />
                    </div> 
                    <div className="form-group form-float">
                        <label className="form-label">Whether an Alumni of the school:</label>
                        <select id="mother_alumni" className="form-control show-tick" data-live-search="true" name="mother_alumni">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>  
                    <button className="btn btn-primary waves-effect" type="submit" style={_inlineStyle}>Update</button> 
                    <button className="btn btn-primary waves-effect" type="button" onClick={this.handleCancel}>Cancel</button> 
                  </form>
              </div>
         );
    }        
}