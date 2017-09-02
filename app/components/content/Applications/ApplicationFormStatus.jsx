import React from 'react';

export default class ApplicationFormStatus extends React.Component
{
      constructor(props) {
          super(props);
          this.state = {
            form_steps: props.form_steps,
            childId: props.childId,
            convertToStudent: props.convertToStudent,
            disabled: false,
            myapplicantData: props.myapplicantData
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
                form_steps:props.form_steps,
                childId:props.childId,
                convertToStudent: props.convertToStudent,
                myapplicantData: props.myapplicantData
          });

          if(props.convertToStudent == '1')
          {
              this.setState({disabled:true});
          }else{
              this.setState({disabled:false});
          }  
      }
      covertToStudent(e)
      {
          //alert(e.target.value+" "+this.state.childId+" "+myapplicantData);

           $.ajax({
              url: base_url+'admin_con/convert_to_student',
              dataType: 'json',
              type: 'POST',
              data: {
                  applicant_id: this.state.myapplicantData,
                  converto: e.target.value,
                  child_id: this.state.childId 
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
         let mysteps;
         if(this.state.form_steps === '10')
         {
            var selectedYes = this.state.convertToStudent == 1 ? 'selected' : '';
            var selectedNo = this.state.convertToStudent == 0 ? 'selected' : '';

            mysteps = (
                <div className="form-group form-float">
                        <label className="form-label">Convert To Student:</label>
                        <select disabled={this.state.disabled} id="convert_student" className="form-control show-tick" data-live-search="true" name="convert_student" onChange={this.covertToStudent.bind(this)}>
                            <option value="0" selected={selectedNo}>No</option>
                            <option value="1" selected={selectedYes}>Yes</option>
                        </select> 
                </div>
             )
         }else{
            <div className="form-group form-float"></div>
         }
        return(
            <div className="body">
                <form id="form_status" onSubmit={this.handleSubmit}>
                    <div className="form-group form-float">
                         <label className="form-label">Application Form Status:</label>
                          <select id="applicant_form_status" className="form-control show-tick" data-live-search="true" name="applicant_form_status">
                            <option value="incomplete">Incomplete</option>
                            <option value="completed">Completed</option>
                        </select> 
                    </div>
                    <div className="form-group form-float">
                         <label className="form-label">Application for Class:</label>
                          <select id="applicantion_for_class" className="form-control show-tick" data-live-search="true" name="applicantion_for_class">
                            <option value="1">Nursery</option>
                            <option value="2">KG</option>
                            <option value="3">I</option>
                            <option value="4">II</option>
                            <option value="5">III</option>
                        </select> 
                    </div>
                    <div className="form-group form-float">
                        <label className="form-label">Payment Options:</label>
                        <span id="payment_options"></span>
                    </div>
                    <div className="form-group form-float">
                        <label className="form-label">Transaction Id:</label>
                        <span id="transaction_id"></span>
                    </div>
                    <div className="form-group form-float">
                        <label className="form-label">Application Number:</label>
                        <span id="registration_number"></span>
                    </div>
                    <div className="form-group form-float">
                        <label className="form-label">Interview Status:</label>
                        <span id="interview_status"></span>
                    </div>
                    <div className="form-group form-float">
                        <label className="form-label">Document Status:</label>
                        <span id="document_status"></span>
                    </div>
                    {mysteps}
                    <button className="btn btn-primary waves-effect" type="button" onClick={this.handleCancel}>Cancel</button>   
                </form>
            </div>
        );
    } 
} 