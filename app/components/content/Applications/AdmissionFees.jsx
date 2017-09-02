import React from 'react';
import Input from '../fields/Input';

export default class AdmissionFees extends React.Component
{
      constructor(props) {
          super(props);
          this.state = {
              childId : props.childId,
              myapplicantData: props.myapplicantData
          }
          this.handleCancel = this.handleCancel.bind(this);
      }
      componentWillReceiveProps(props) {
         this.setState({
            childId : props.childId,
            myapplicantData: props.myapplicantData
          });
      }
      componentDidMount(){
      }
      handleSubmit(event)
      {
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/add_fees?id='+this.state.myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#fees_form').serialize()+"&child_id="+this.state.childId,
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
      handleCancel(){
          document.getElementById("cancelPanel").click();
      }
      render()
      {
          var _inlineStyle = {
            marginRight: 10
          }
          return(
            <div className="body">
                <form id="fees_form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group form-float">
                        <Input
                          labelname='Tution Fee'
                          textname='tution_fee'
                          texttype='number'
                          required={true}
                          id='tution_fee'
                        />
                    </div>
                    <div className="form-group form-float">
                        <Input
                          labelname='Admission Fee'
                          textname='admission_fee'
                          texttype='number'
                          required={true}
                          id='admission_fee'
                        />
                    </div>
                    <div className="form-group form-float">
                        <Input
                          labelname='Annual Funds'
                          textname='annual_funds'
                          texttype='number'
                          required={true}
                        />
                    </div>
                    <div className="form-group form-float">
                        <Input
                          labelname='Practical Charges'
                          textname='practical_charges'
                          texttype='number'
                          required={true}
                        />
                    </div>
                    <div className="form-group form-float">
                        <Input
                          labelname='Test Session Fee'
                          textname='test_session'
                          texttype='number'
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