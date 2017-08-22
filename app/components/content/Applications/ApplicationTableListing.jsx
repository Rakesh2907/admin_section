import React from 'react';
import { DataTable } from 'react-data-components';
import Input from '../fields/Input';
import {Button, Modal, Tabs, Tab, Panel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import Radio from '../fields/Radio';
import CalenderTime from '../modules/CalendarTime/App';
import moment from 'moment';

var myapplicantData = 0;
var statusApplicant = false;

var ActionMenu = React.createClass({

    getInitialState: function(){
            return {
                isOpen: false,
                applicantId: this.props.applicantId,
                applicantStatus: this.props.applicantStatus
            };
    },
    handleActionClick: function(e){
        e.stopPropagation();
            console.log("buttonApplicant click", this.state.isOpen);
            this.setState({isOpen: !this.state.isOpen});
    },
    render: function(){
            return (
                <div>
                  <a onClick={this.handleActionClick} href="javascript:void(0)"><i className="material-icons">open_in_new</i></a>
                  <ActionSubMenu isOpen={this.state.isOpen} applicantId={this.props.applicantId} applicantStatus={this.props.applicantStatus}/>
                </div>
            );
    }

});

var ActionSubMenu = React.createClass({
    
       getInitialState: function(){
            return {
              modalShow: false,
            };
        },  
        handleDelete:function()
        {
          this.setState({ modalShow: true})
        },
        noDelete:function()
        {
          this.setState({ modalShow: false})
        },
        yesDelete:function(applicantId)
        {
            var mydata = {
                'delete': 'applicant',
                'id': applicantId
            }

            $.ajax({
              url: base_url+'admin_con/delete',
              dataType: 'json',
              type: 'POST',
              data: mydata,
              success: function(resdata) {
                if(resdata.success){
                  window.location.reload()
                }else{
                  //alert('inn11');
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
        },
        handleEdit:function(applicantId,applicantStatus)
        {
           myapplicantData = applicantId;
           if(applicantStatus === 'incomplete'){
              statusApplicant = true;
           }else{
              statusApplicant = false;
           }
           document.getElementById("show").click();
        },
        render: function()
        {
            if (this.props.isOpen)
            {
                var _style = {
                    display:"block"  
              };
              
                return (
                    <div className="dropdown">
                        <ul className="dropdown-menu pull-right" style={_style}>
                            <li><a className=" waves-effect waves-block" href="javascript:void(0)" onClick={this.handleEdit.bind(this,this.props.applicantId,this.props.applicantStatus)}>Applicant Info</a></li>
                        </ul>
                        <Modal show={this.state.modalShow} onHide={this.noDelete} container={this} aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title">Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure delete applicant details?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.yesDelete.bind(this,this.props.applicantId)}>Yes</Button>
                            <Button bsStyle="primary" onClick={this.noDelete}>No</Button>
                        </Modal.Footer>
                      </Modal>  
                    </div>
                );
            }
            return null;
        }
    });

const ControlledTabs = React.createClass({
  getInitialState() {
    return {
        key: 1,
        child_birth: 0,
        father_birth: 0,
        mother_birth:0,
        guardian_birth:0,
        disabled: statusApplicant,
        interview_date: null,
        time_condition: 0,
        form_steps: 1,
        child_id: 0,
        convert_to_students: 0
    };
  },
  componentDidMount()
  {
      this.getApplicant(myapplicantData);  
  },
  handleSelect(key) {

    switch(key)
    {
      case 1:
        this.getApplicant(myapplicantData);
      break;

      case 2:
        this.getChild(myapplicantData);
      break;

      case 3:
        this.getFather(myapplicantData);
      break;

      case 4:
        this.getMother(myapplicantData);
      break;

      case 5:
        this.getGuardian(myapplicantData);
      break;

      case 6:
        this.getStatus(myapplicantData);
      break;
      case 7:
        this.getInterviewShedule(myapplicantData)
      break;
    }
    this.setState({key});
  },
  getInterviewShedule(applicant_id)
  {
      $.ajax({
        url: base_url+'admin_con/get_interview_shedule',
        dataType: 'json',
        type: 'POST',
        data:{
            applicant_id: applicant_id
        },
        success: function(resdata){
            if(resdata)
            {
                if(resdata.length > 0)
                {
                      if(resdata[0]['interview_shedule'] == null)
                      {
                          this.setState({interview_date:null});
                      }else{
                          this.setState({interview_date:resdata[0]['interview_shedule']});
                      }
                      this.setState({time_condition:resdata[3]['time_condition']});
                }
            }
        }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
        }.bind(this)
      });
  },
  getStatus(applicant_id)
  {
      $.ajax({
        url: base_url+'admin_con/get_status',
        dataType: 'json',
        type: 'POST',
        data:{
            applicant_id: applicant_id
        },
        success: function(resdata){
           if(resdata)
           {
               if(resdata.length > 0)
               {
                   $("#transaction_id").html(" "+resdata[0]['transaction_id']); 
                   $("#payment_options").html(" "+resdata[0]['payment_option']);
                   $("#registration_number").html(" "+resdata[0]['admission_registration_number']);
                   $("#interview_status").html(" "+resdata[0]['interview_status']);
                   $("#document_status").html(" "+resdata[0]['document_status']);
                   $("#applicant_form_status > [value="+resdata[0]['form_status']+"]").attr("selected", "true");
                   $("#applicantion_for_class > [value="+resdata[0]['class_id']+"]").attr("selected", "true");
                   this.setState({
                        form_steps: resdata[0]['steps'],
                        convert_to_students: resdata[0]['convert_to_student'],
                        child_id: resdata[0]['child_id']
                   });
               }
           }
         }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
         }.bind(this)      
      });
  },
  getGuardian(applicant_id)
  {
      $.ajax({
        url: base_url+'admin_con/get_guardian',
        dataType: 'json',
        type: 'POST',
        data:{
            applicant_id: applicant_id
        },
        success: function(resdata){
           if(resdata)
           {
               if(resdata.length > 0)
               {
                    $("input[name='guar_full_name']").val(resdata[0]['guardian_full_name']);
                    $("input[name='guar_relation']").val(resdata[0]['relation_to_candidate']);
                    $("input[name='guar_adhar_card']").val(resdata[0]['guardian_adhar_card']);
                    this.setState({guardian_birth:resdata[0]['guardian_dob']});
                    var address = resdata[0]['office_address1']+' '+resdata[0]['office_address2']+' '+resdata[0]['state']+' '+resdata[0]['city'];
                    $("#guar_education > [value="+resdata[0]['guardian_qualification']+"]").attr("selected", "true");
                    $("#guar_occupation > [value='"+resdata[0]['guardian_occupation']+"']").attr("selected", "true");
                    $("#mother_address").val(address);
                    $("input[name='guar_mobile']").val(resdata[0]['guardian_mobile']);
                    this.setState({mobile_number:resdata[0]['guardian_mobile']});
                    $("input[name='guar_email']").val(resdata[0]['guardian_email']);
               }
           }
        }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
          }.bind(this)
      });
  },
  getMother(applicant_id)
  {
      $.ajax({
        url: base_url+'admin_con/get_mother',
        dataType: 'json',
        type: 'POST',
        data:{
            applicant_id: applicant_id
        },
        success: function(resdata){
           if(resdata)
           {
               if(resdata.length > 0)
               {
                    $("input[name='mother_full_name']").val(resdata[0]['mother_full_name']);
                    $("input[name='mother_adhar_card_number']").val(resdata[0]['mother_adhar_card']);
                    this.setState({mother_birth:resdata[0]['mother_dob']});
                    $("input[name='mother_desigantion']").val(resdata[0]['mother_designation']);
                    $("#mother_education > [value="+resdata[0]['mother_qualification']+"]").attr("selected", "true");
                    $("#mother_occupation > [value='"+resdata[0]['mother_occupation']+"']").attr("selected", "true");
                    $("#mother_alumni > [value="+resdata[0]['mother_alumni']+"]").attr("selected", "true");
                    var address = resdata[0]['office_address1']+' '+resdata[0]['office_address2']+' '+resdata[0]['state']+' '+resdata[0]['city'];
                    $("#mother_address").val(address);
                    $("input[name='mother_mobile']").val(resdata[0]['mother_mobile']);
                    this.setState({mobile_number:resdata[0]['mother_mobile']});
                    $("input[name='mother_email']").val(resdata[0]['mother_email']);
               }
           }
        }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
          }.bind(this)
      });
  },
  getFather(applicant_id)
  {
      $.ajax({
        url: base_url+'admin_con/get_father',
        dataType: 'json',
        type: 'POST',
        data:{
            applicant_id: applicant_id
        },
        success: function(resdata){
           if(resdata)
           {
               if(resdata.length > 0)
               {
                    $("input[name='father_full_name']").val(resdata[0]['father_full_name']);
                    $("input[name='father_adhar_card_number']").val(resdata[0]['father_adhar_card']);
                    this.setState({father_birth:resdata[0]['father_dob']});
                    $("input[name='father_desigantion']").val(resdata[0]['father_designation']);
                    $("#father_education > [value="+resdata[0]['father_qualification']+"]").attr("selected", "true");
                    $("#father_occupation > [value='"+resdata[0]['father_occupation']+"']").attr("selected", "true");
                    var address = resdata[0]['office_address1']+' '+resdata[0]['office_address2']+' '+resdata[0]['state']+' '+resdata[0]['city'];
                    $("#father_transferred > [value="+resdata[0]['job_transferable']+"]").attr("selected", "true");
                    $("#father_alumni > [value="+resdata[0]['father_alumni']+"]").attr("selected", "true");
                    $("#father_address").val(address);
                    $("input[name='father_mobile']").val(resdata[0]['father_mobile']);
                    this.setState({mobile_number:resdata[0]['father_mobile']});
                    $("input[name='father_email']").val(resdata[0]['father_email']);
               }
           }
        }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
          }.bind(this)
      });
  },
  getChild(applicant_id)
  {
      $.ajax({
          url: base_url+'admin_con/get_child',
          dataType: 'json',
          type: 'POST',
          data: {
                applicant_id: applicant_id
          },
          success: function(resdata){
            if(resdata)
            {
                    if(resdata.length > 0)
                    {
                        $("input[name='child_first_name']").val(resdata[0]['child_firstname']);
                        $("input[name='child_last_name']").val(resdata[0]['child_lastname']);
                        $("input[name='adhar_card_number']").val(resdata[0]['child_adhar_card']);
                        $("#siblings > [value="+ resdata[0]['siblings']+"]").attr("selected", "true");
                        $("#child_gender > [value="+resdata[0]['gender']+"]").attr("selected", "true");
                        this.setState({child_birth:resdata[0]['child_dob']});
                        var address = resdata[0]['address_line1']+' '+resdata[0]['address_line2']+' '+resdata[0]['city']+' '+resdata[0]['state']+' '+resdata[0]['pin'];
                        $("#child_address").val(address);
                        $("input[name='mobile_number']").val(resdata[0]['mobile']);
                        this.setState({mobile_number:resdata[0]['mobile']});
                        $("input[name='email']").val(resdata[0]['email']);
                        $("input[name='previous_school']").val(resdata[0]['previous_school_name']);
                    }
            }        
          }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
          }.bind(this)
      });     
  },
  getApplicant(applicant_id)
  {
      $.ajax({
              url: base_url+'admin_con/get_applicant',
              dataType: 'json',
              type: 'POST',
              data: {
                applicant_id: applicant_id
              },
              success: function(resdata) {
                if(resdata)
                {
                    if(resdata.length > 0)
                    {
                        $("input[name='applicant_name']").val(resdata[0]['applicant_name']);
                        $("input[name='applicant_email']").val(resdata[0]['applicant_email']);
                        $("input[name='applicant_mobile']").val(resdata[0]['applicant_mobile']);
                        $("input[name='applicant_adhar_card']").val(resdata[0]['applicant_adhar_card']);
                        $("input[name='applicant_password']").val(resdata[0]['applicant_password']);
                    }  
                }else{
                  //alert('inn11');
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
      });
  },
  render() {
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Applicant"><ApplicantForm /></Tab>
        <Tab eventKey={2} title="Child"><ChildForm child_birth={this.state.child_birth} child_mobile={this.state.mobile_number}/></Tab>
        <Tab eventKey={3} title="Father"><FatherForm father_birth={this.state.father_birth} father_mobile={this.state.mobile_number}/></Tab>
        <Tab eventKey={4} title="Mother"><MotherForm mother_birth={this.state.mother_birth} mother_mobile={this.state.mobile_number}/></Tab>
        <Tab eventKey={5} title="Guardian"><GuardianForm guardian_birth={this.state.guardian_birth} guardian_mobile={this.state.mobile_number}/></Tab>
        <Tab eventKey={7} title="Interview Shedule/Result" disabled={this.state.disabled}><Interview interviewDate={this.state.interview_date} timeCondition={this.state.time_condition}/></Tab>
        <Tab eventKey={8} title="Document" disabled={this.state.disabled}><ApplicantDocument /></Tab>
        <Tab eventKey={6} title="Status"><ApplicationFormStatus form_steps={this.state.form_steps} childId={this.state.child_id} convertToStudent={this.state.convert_to_students}/></Tab>
      </Tabs>
    );
  }
});
class ApplicantDocument extends React.Component
{
      constructor(props) {
          super(props);
      }
      render()
      {
          return(
            <div className="body table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Document Name</th>
                                        <th>Downloads</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Profile Picture</td>
                                        <td>Download</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Adhar Card</td>
                                        <td>Download</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Application</td>
                                        <td>Download</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
          );
      }
}

class InterviewResult extends React.Component
{
      constructor(props) {
        super(props);
         this.state = {
            interviewDate: props.interviewDate,
            isDisabled: false
         };
         this.handleEnable = this.handleEnable.bind(this);
      }
      handleEnable(){
          this.setState({
                isDisabled: false
          });
      }
      componentWillReceiveProps(props) {
           this.setState({
              interviewDate: props.interviewDate
           });  
      }
      componentDidMount()
      {
          $.ajax({
              url: base_url+'admin_con/get_inteview_result',
              dataType: 'json',
              type: 'POST',
              data:{
                  applicant_id: myapplicantData
              },
              success: function(resdata) {
                if(resdata.length > 0)
                {
                      $("#maths_percentage > [value="+ resdata[0]['maths_percentage']+"]").attr("selected", "true");
                      $("#english_percentage > [value="+ resdata[0]['english_percentage']+"]").attr("selected", "true");
                      $("#gk_percentage > [value="+ resdata[0]['gk_percentage']+"]").attr("selected", "true");
                      $("#result > [value="+ resdata[0]['result']+"]").attr("selected", "true");
                      this.setState({
                          isDisabled: true
                      });
                }else{
                   this.setState({
                          isDisabled: false
                    });
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)
         });
      }
      handleSubmit(event)
      {
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/set_inteview_result?id='+myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#interview_result').serialize(),
              success: function(resdata) {
                if(resdata.success){
                   swal({
                      title: "Records Saved successfully...",
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
      render()
      {
           var _inlineStyle = {
              marginRight: 10
           }
          return(
            <div className="body">
                <form id="interview_result" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group form-float">
                        <label className="form-label">Scheduled Date</label> 
                        <div className="form-line">
                            <input type="text" value={moment(this.state.interviewDate).format('llll')} readOnly className="form-control"/>
                        </div> 
                    </div>                  
                    <div className="form-group form-float">
                                    <div className="form-line">
                                        <label className="form-label">Maths</label>
                                        <select id="maths_percentage" className="form-control show-tick" data-live-search="true" name="maths_percentage">
                                            <option value="0">0%</option>
                                            <option value="10">10%</option>
                                            <option value="30">30%</option>
                                            <option value="50">50%</option>
                                            <option value="70">70%</option>
                                            <option value="90">90%</option>
                                        </select>
                                    </div>
                    </div>
                    <div className="form-group form-float">
                        <div className="form-line">
                                        <label className="form-label">English</label>
                                        <select id="english_percentage" className="form-control show-tick" data-live-search="true" name="english_percentage">
                                            <option value="0">0%</option>
                                            <option value="10">10%</option>
                                            <option value="30">30%</option>
                                            <option value="50">50%</option>
                                            <option value="70">70%</option>
                                            <option value="90">90%</option>
                                        </select>
                        </div>
                    </div>
                    <div className="form-group form-float">
                        <div className="form-line">
                                        <label className="form-label">GK</label>
                                        <select id="gk_percentage" className="form-control show-tick" data-live-search="true" name="gk_percentage">
                                            <option value="0">0%</option>
                                            <option value="10">10%</option>
                                            <option value="30">30%</option>
                                            <option value="50">50%</option>
                                            <option value="70">70%</option>
                                            <option value="90">90%</option>
                                        </select>
                        </div>
                    </div>
                    <div className="form-group form-float">
                        <div className="form-line">
                              <label className="form-label">Result</label>
                              <select id="result" className="form-control show-tick" data-live-search="true" name="result">
                                  <option value="NULL">Select</option>
                                  <option value="PASS">PASS</option>
                                  <option value="FAIL">FAIL</option>
                                  <option value="ABSENT">ABSENT</option>
                              </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary m-t-15 waves-effect" style={_inlineStyle}>Save</button>
                    <button type="button" className="btn btn-primary m-t-15 waves-effect" onClick={this.props.resheduleHandler}>Reshedule</button>
                </form>
            </div>
          )
      }
}
class Interview extends React.Component
{
      constructor(props) {
         super(props);
         this.state = {
            interviewDate: props.interviewDate,
            timeCondition: props.timeCondition
         };
         this.handleReshedule = this.handleReshedule.bind(this);
         this.resheduleHandler = this.resheduleHandler.bind(this);
      } 
      componentWillReceiveProps(props) {
          this.setState({
              interviewDate: props.interviewDate,
              timeCondition: props.timeCondition
          });
      }
      handleReshedule(){
           this.setState({interviewDate:null});
      }
      resheduleHandler(){
           this.setState({
              interviewDate:null,
              timeCondition: 0
           });
      }
      render(){
          //alert(this.state.timeCondition);
          if(this.state.interviewDate!=null && !this.state.timeCondition)
          {
            return(
               <div className="app">
                 <form>
                    <div className="input">
                        <input type="text" value={moment(this.state.interviewDate).format('llll')} readOnly />
                    </div>
                    <div className="m-input-moment">
                      <button type="button"className="im-btn btn-save btn btn-primary waves-effect" onClick={this.handleReshedule}>Reshedule</button>
                    </div>
                 </form>
               </div>      
            );
         }else if(this.state.interviewDate==null && !this.state.timeCondition){
             return(
                <div><CalenderTime applicantId={myapplicantData}/></div>
             );
         }else if(this.state.timeCondition){
              return(
                <div><InterviewResult applicantId={myapplicantData} resheduleHandler={this.resheduleHandler} interviewDate={this.state.interviewDate}/></div>
              );
         }
      }
}
class ApplicationFormStatus extends React.Component
{
      constructor(props) {
          super(props);
          this.state = {
            form_steps: props.form_steps,
            childId: props.childId,
            convertToStudent: props.convertToStudent,
            disabled: false
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
                convertToStudent: props.convertToStudent
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
                  applicant_id: myapplicantData,
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
class GuardianForm extends React.Component
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
      componentWillReceiveProps(props) {
            this.setState({guardian_birth:props.guardian_birth});
      }
      handleSubmit(event){
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/edit_guardian?id='+myapplicantData,
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
              <form id="guardian_form" onSubmit={this.handleSubmit}>
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
                        <option value="Academician/Teacher">Academician/Teacher</option>
                        <option value="Advertising">Advertising</option>
                        <option value="Advocate">Advocate</option>
                        <option value="Airways">Airways</option>
                        <option value="Amity Employee">Amity Employee</option>
                        <option value="Architect">Architect</option>
                        <option value="Army/Navy/Air Force - Defence Service">Army/Navy/Air Force - Defence Service</option>
                        <option value="Bank Employee">Bank Employee</option>
                        <option value="Businessman/ Industrialist">Businessman/ Industrialist</option>
                        <option value="Central Government Employee">Central Government Employee</option>
                        <option value="Charted Accountant/Company Secretary">Charted Accountant/Company Secretary</option>
                        <option value="Civil Services/Bureaucrat">Civil Services/Bureaucrat</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Educationist">Educationist</option>
                        <option value="Embassy Employee">Embassy Employee</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Fashion Industry">Fashion Industry</option>
                        <option value="Financial Organisation Employee">Financial Organisation Employee</option>
                        <option value="Home Maker">Home Maker</option>
                        <option value="Hotel / Hospitality Employee">Hotel / Hospitality Employee</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="International Organisation">International Organisation</option>
                        <option value="Journalist/AIR/Print Media/T.V.">Journalist/AIR/Print Media/T.V.</option>
                        <option value="Judge/ Judicial Officer">Judge/ Judicial Officer</option>
                        <option value=">Merchant Navy/Pvt. Shipping Co.">Merchant Navy/Pvt. Shipping Co.</option>
                        <option value="Others">Others</option>
                        <option value="Politician">Politician</option>
                        <option value="Private Sector Employee">Private Sector Employee</option>
                        <option value="Public Sector Employee">Public Sector Employee</option>
                        <option value="Railway Employee">Railway Employee</option>
                        <option value="Scientist/Researcher">Scientist/Researcher</option>
                        <option value="Shop keeper/ Small Business">Shop keeper/ Small Business</option>
                        <option value="State Government Employee">State Government Employee</option>
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
                        texttype='text'
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
class MotherForm extends React.Component
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
          this.setState({mother_birth:props.mother_birth});
      }
      handleSubmit(event){
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/edit_mother?id='+myapplicantData,
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
                  <form id="mother_form" onSubmit={this.handleSubmit}>
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
                            <option value="Academician/Teacher">Academician/Teacher</option>
                            <option value="Advertising">Advertising</option>
                            <option value="Advocate">Advocate</option>
                            <option value="Airways">Airways</option>
                            <option value="Amity Employee">Amity Employee</option>
                            <option value="Architect">Architect</option>
                            <option value="Army/Navy/Air Force - Defence Service">Army/Navy/Air Force - Defence Service</option>
                            <option value="Bank Employee">Bank Employee</option>
                            <option value="Businessman/ Industrialist">Businessman/ Industrialist</option>
                            <option value="Central Government Employee">Central Government Employee</option>
                            <option value="Charted Accountant/Company Secretary">Charted Accountant/Company Secretary</option>
                            <option value="Civil Services/Bureaucrat">Civil Services/Bureaucrat</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Educationist">Educationist</option>
                            <option value="Embassy Employee">Embassy Employee</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Fashion Industry">Fashion Industry</option>
                            <option value="Financial Organisation Employee">Financial Organisation Employee</option>
                            <option value="Home Maker">Home Maker</option>
                            <option value="Hotel / Hospitality Employee">Hotel / Hospitality Employee</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="International Organisation">International Organisation</option>
                            <option value="Journalist/AIR/Print Media/T.V.">Journalist/AIR/Print Media/T.V.</option>
                            <option value="Judge/ Judicial Officer">Judge/ Judicial Officer</option>
                            <option value=">Merchant Navy/Pvt. Shipping Co.">Merchant Navy/Pvt. Shipping Co.</option>
                            <option value="Others">Others</option>
                            <option value="Politician">Politician</option>
                            <option value="Private Sector Employee">Private Sector Employee</option>
                            <option value="Public Sector Employee">Public Sector Employee</option>
                            <option value="Railway Employee">Railway Employee</option>
                            <option value="Scientist/Researcher">Scientist/Researcher</option>
                            <option value="Shop keeper/ Small Business">Shop keeper/ Small Business</option>
                            <option value="State Government Employee">State Government Employee</option>
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
                            texttype='text'
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
class FatherForm extends React.Component
{
      constructor(props) {
            super(props);
            this.state = {
                father_birth:props.father_birth,
                mobile_num: props.father_mobile
            }
            this.handleChangeDate = this.handleChangeDate.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
      }
      handleCancel(){
          document.getElementById("cancelPanel").click();  
      }
      handleChangeDate(value){
            this.setState({father_birth: value});
      }
      handleChange(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value == '' || re.test(e.target.value)) 
        {
            this.setState({mobile_num: e.target.value})
        }
      }
      componentWillReceiveProps(props) {
            this.setState({father_birth:props.father_birth});
      }
      handleSubmit(event){
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/edit_father?id='+myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#father_form').serialize(),
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
                  <form id="father_form" onSubmit={this.handleSubmit}>
                      <div className="form-group form-float">
                          <Input
                            labelname='Full Name'
                            textname='father_full_name'
                            texttype='text'
                            required={true}
                          />
                      </div>
                      <div className="form-group form-float">
                          <Input
                            labelname='Adhar Card Number'
                            textname='father_adhar_card_number'
                            texttype='text'
                            required={true}
                          />
                      </div>
                      <div className="form-group form-float">
                        <label className="form-label">Birth Date:</label>
                        <DatePicker id="example-datepicker" dateFormat="YYYY/MM/DD" name="father_dob" value={this.state.father_birth} required onChange={this.handleChangeDate}/>
                      </div>
                      <div className="form-group form-float">
                        <label className="form-label">Education:</label>
                        <select id="father_education" className="form-control show-tick" data-live-search="true" name="father_education">
                            <option value="ssc">SSC</option>
                            <option value="hsc">HSC</option>
                            <option value="graduation">Graduation</option>
                            <option value="post_graduation">Post Graduate</option>
                            <option value="doctorate">Doctorate</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group form-float">
                        <label className="form-label">Occupation:</label>
                        <select id="father_occupation" className="form-control show-tick" data-live-search="true" name="father_occupation">
                            <option value="0">Select </option>
                            <option value="Academician/Teacher">Academician/Teacher</option>
                            <option value="Advertising">Advertising</option>
                            <option value="Advocate">Advocate</option>
                            <option value="Airways">Airways</option>
                            <option value="Amity Employee">Amity Employee</option>
                            <option value="Architect">Architect</option>
                            <option value="Army/Navy/Air Force - Defence Service">Army/Navy/Air Force - Defence Service</option>
                            <option value="Bank Employee">Bank Employee</option>
                            <option value="Businessman/ Industrialist">Businessman/ Industrialist</option>
                            <option value="Central Government Employee">Central Government Employee</option>
                            <option value="Charted Accountant/Company Secretary">Charted Accountant/Company Secretary</option>
                            <option value="Civil Services/Bureaucrat">Civil Services/Bureaucrat</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Educationist">Educationist</option>
                            <option value="Embassy Employee">Embassy Employee</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Fashion Industry">Fashion Industry</option>
                            <option value="Financial Organisation Employee">Financial Organisation Employee</option>
                            <option value="Home Maker">Home Maker</option>
                            <option value="Hotel / Hospitality Employee">Hotel / Hospitality Employee</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="International Organisation">International Organisation</option>
                            <option value="Journalist/AIR/Print Media/T.V.">Journalist/AIR/Print Media/T.V.</option>
                            <option value="Judge/ Judicial Officer">Judge/ Judicial Officer</option>
                            <option value="Merchant Navy/Pvt. Shipping Co.">Merchant Navy/Pvt. Shipping Co.</option>
                            <option value="Others">Others</option>
                            <option value="Politician">Politician</option>
                            <option value="Private Sector Employee">Private Sector Employee</option>
                            <option value="Public Sector Employee">Public Sector Employee</option>
                            <option value="Railway Employee">Railway Employee</option>
                            <option value="Scientist/Researcher">Scientist/Researcher</option>
                            <option value="Shop keeper/ Small Business">Shop keeper/ Small Business</option>
                            <option value="State Government Employee">State Government Employee</option>
                        </select>
                    </div>
                    <div className="form-group form-float">
                          <Input
                            labelname='Desigantion'
                            textname='father_desigantion'
                            texttype='text'
                            required={true}
                          />
                    </div>
                    <div className="form-group form-float">
                        <label className="form-label">Is the job Transferable:</label>
                        <select id="father_transferred" className="form-control show-tick" data-live-search="true" name="father_transferred">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div> 
                    <div className="form-group form-float">
                        <div className="form-line">
                            <textarea name="father_address" id="father_address" cols="30" rows="3" className="form-control no-resize"  required></textarea>
                            <label className="form-label">Address</label>
                        </div>
                    </div> 
                    <div className="form-group form-float">
                          <Input
                            labelname='Mobile'
                            textname='father_mobile'
                            texttype='text'
                            onChange={this.handleChange}
                            value={this.state.mobile_num}
                            required={true}
                          />
                    </div>
                    <div className="form-group form-float">
                          <Input
                            labelname='Email'
                            textname='father_email'
                            texttype='text'
                            required={true}
                          />
                    </div> 
                    <div className="form-group form-float">
                        <label className="form-label">Whether an Alumni of the school:</label>
                        <select id="father_alumni" className="form-control show-tick" data-live-search="true" name="father_alumni">
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
class ChildForm extends React.Component
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
        componentWillReceiveProps(props) {
              this.setState({child_birth: props.child_birth});
        }
        handleChange(e){
          const re = /^[0-9\b]+$/;
          if (e.target.value == '' || re.test(e.target.value)) 
          {
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
              url: base_url+'admin_con/edit_child?id='+myapplicantData,
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
                        texttype='text'
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
class ApplicantForm extends React.Component
{
      constructor(props) {
            super(props);
             this.state = {}
             this.handleCancel = this.handleCancel.bind(this);
      } 
      handleCancel()
      {
            document.getElementById("cancelPanel").click();  
      }
      handleSubmit(event){
      event.preventDefault();
      $.ajax({
          url: base_url+'admin_con/edit_applicant?id='+myapplicantData,
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
              <form id="applicant_form" onSubmit={this.handleSubmit}>
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
                        texttype='text'
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
export default class ApplicationTableListing extends React.Component
{
  
  constructor(props) 
  {
            super(props);
            this.state = {
                data: [],
                tableColumns: [
                  { title: 'Name', prop: 'applicant_name' },
                  { title: 'Email', prop: 'applicant_email' },
                  { title: 'Mobile', prop: 'applicant_mobile'},
                  { title: 'Adhar Card', prop: 'applicant_adhar_card'},
                  { title: 'Payment Status', prop: 'form_status'},
                  { title: 'Application Number', prop: 'admission_registration_number'},
                  { title: 'Actions', prop: 'actions'}
                ],
                applicantId : 0,
                showEditModal: false,
                mydisabled: false, 
            };
            this.open = this.open.bind(this);
            this.close = this.close.bind(this);
            this.handleChangeDate = this.handleChangeDate.bind(this);    
  }
  open(){
    this.setState({ showEditModal: true });
  }
  close(){
    this.setState({ showEditModal: false });
  }
  handleChangeDate(){}
  componentDidMount() 
  {
        var that = this;
         $.get({
                url: base_url+'admin_con/applicant_list',
                type: 'GET',
                dataType: 'json',
                headers: {
                        "Content-Type":"text/plain; charset=utf-8", 
                        "Accept": "*", 
                        "Accept-Language":"es-ES,es;q=0.8"
                },   
                success: function(res) 
                { 

                    for(var i = 0;i < res.length;i++)
                    {
                        res[i]['actions'] = <ActionMenu applicantId={res[i]['applicant_id']} applicantStatus={res[i]['form_status']}/> 
                    }

                    that.setState({
                            data: res
                    });
                },
                error: function() { console.log('Failed!'); }
            });
  }

	render()
  {

          var _style = {
                    display:"none"   
          };
          if(!this.state.showEditModal)
          {
              return (
                    <div className="card">
                        <div className="header">
                            <h2>APPLICANTS</h2>
                        </div>
                            <DataTable
                              className="body"
                              keys="id"
                              columns={this.state.tableColumns}
                              initialData={this.state.data}
                              initialPageLength={10}
                              initialSortBy={{ prop: 'applicant_name', order: 'descending' }}
                              pageLengthOptions={[ 5, 20, 50, 100 ]}
                           />
                           <Button bsStyle="primary" bsSize="large" onClick={this.open} id="show" style={_style}>Open Model</Button>   
                     </div>
                 );
          }else{
              return (
                     <div className="card">
                         <div className="header">
                            <h2>APPLICANT DETAILS</h2>
                            <ul className="header-dropdown m-r--5">
                                <li className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i className="material-icons">more_vert</i>
                                    </a>
                                    <ul className="dropdown-menu pull-right">
                                        <li><a href="javascript:void(0);" onClick={this.close}>Close</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                         <Panel collapsible expanded={this.state.showEditModal}>
                              <ControlledTabs/>
                              <Button bsStyle="primary" bsSize="large" id="cancelPanel" onClick={this.close} style={_style}>Cancel</Button>
                         </Panel>
                     </div> 
                );
         }        
  }
}	
