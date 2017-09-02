import React from 'react';
import {Button, Modal, Tabs, Tab, Panel} from 'react-bootstrap';
import ApplicantForm from 'ApplicantForm';
import ChildForm from 'ChildForm';
import FatherForm from 'FatherForm';
import MotherForm from 'MotherForm';
import GuardianForm from 'GuardianForm';
import Interview from 'Interview';
import ApplicantDocument from 'ApplicantDocument';
import AdmissionFees from 'AdmissionFees';
import ApplicationFormStatus from 'ApplicationFormStatus';
var occuItems = [];
export default class ControlledTabs extends React.Component
{
      constructor(props) {
          super(props);
          this.state = {
            key: 1,
            child_birth: 0,
            father_birth: 0,
            mother_birth:0,
            guardian_birth:0,
            disabled: props.statusApplicant,
            interview_date: null,
            time_condition: 0,
            form_steps: 1,
            child_id: 0,
            convert_to_students: 0,
            myapplicantData:props.myapplicantData
          }
          this.handleSelect = this.handleSelect.bind(this);
      }
      componentWillReceiveProps(props){
          //alert(props.myapplicantData);
          this.setState({myapplicantData:props.myapplicantData});
      }
      componentDidMount()
      {
          this.getApplicant(this.state.myapplicantData); 
          this.getStatus(this.state.myapplicantData);
      }
      handleSelect(key) 
      {
          switch(key)
          {
            case 1:
              this.getApplicant(this.state.myapplicantData);
            break;

            case 2:
              this.getChild(this.state.myapplicantData);
            break;

            case 3:
              this.getOccupations();
              this.getFather(this.state.myapplicantData);
            break;

            case 4:
              this.getOccupations();
              this.getMother(this.state.myapplicantData);
            break;

            case 5:
              this.getOccupations();
              this.getGuardian(this.state.myapplicantData);
            break;

            case 6:
              this.getStatus(this.state.myapplicantData);
            break;
            case 7:
              this.getInterviewShedule(this.state.myapplicantData,this.state.child_id)
            break;
            case 9:
              this.getFees(this.state.myapplicantData,this.state.child_id)
            break;
          }
          this.setState({key});
      }
      getOccupations(){
          occuItems = [];
          $.ajax({
                  type: 'POST',
                  url: base_url+'admin_con/get_occupations',
                  dataType:'json',
                  success: function (resdata) {
                    if(resdata.length > 0)
                    {
                        for(var i = 0;i < resdata.length;i++)
                        {
                            occuItems.push(<option value={resdata[i]['occupations']}>{resdata[i]['occupations']}</option>)
                        }
                    }
                   }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                  }.bind(this)
             });
      }
      getFees(applicant_id,child_id){
          $.ajax({
              url: base_url+'admin_con/get_fees',
              dataType: 'json',
              type: 'POST',
              data:{
                  applicant_id: applicant_id,
                  child_id: child_id
              },
              success: function(resdata) {
                if(resdata.length > 0)
                {
                    $("input[name='tution_fee']").val(resdata[0]['tution_fee']);
                    $("input[name='admission_fee']").val(resdata[0]['admission_fee']);
                    $("input[name='annual_funds']").val(resdata[0]['annual_funds']);
                    $("input[name='practical_charges']").val(resdata[0]['practical_charges']);
                    $("input[name='test_session']").val(resdata[0]['test_session']);
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)
          });
      }
      getInterviewShedule(applicant_id,child_id){
          $.ajax({
            url: base_url+'admin_con/get_interview_shedule',
            dataType: 'json',
            type: 'POST',
            data:{
                applicant_id: applicant_id,
                child_id: child_id
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
      render()
      {
          return(
            <div>
               <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                  <Tab eventKey={1} title="Applicant"><ApplicantForm myapplicantData={this.state.myapplicantData}/></Tab>
                  <Tab eventKey={2} title="Child"><ChildForm myapplicantData={this.state.myapplicantData} child_birth={this.state.child_birth} child_mobile={this.state.mobile_number}/></Tab>
                  <Tab eventKey={3} title="Father"><FatherForm occuItems={occuItems} myapplicantData={this.state.myapplicantData} father_birth={this.state.father_birth} father_mobile={this.state.mobile_number}/></Tab>
                  <Tab eventKey={4} title="Mother"><MotherForm occuItems={occuItems} myapplicantData={this.state.myapplicantData} mother_birth={this.state.mother_birth} mother_mobile={this.state.mobile_number}/></Tab>
                  <Tab eventKey={5} title="Guardian"><GuardianForm occuItems={occuItems} myapplicantData={this.state.myapplicantData} guardian_birth={this.state.guardian_birth} guardian_mobile={this.state.mobile_number}/></Tab>
                  <Tab eventKey={7} title="Interview Shedule/Result" disabled={this.state.disabled}><Interview myapplicantData={this.state.myapplicantData} interviewDate={this.state.interview_date} timeCondition={this.state.time_condition} childId={this.state.child_id}/></Tab>
                  <Tab eventKey={8} title="Document" disabled={this.state.disabled}><ApplicantDocument myapplicantData={this.state.myapplicantData}/></Tab>
                  <Tab eventKey={9} title="Fees" disabled={this.state.disabled}><AdmissionFees myapplicantData={this.state.myapplicantData} childId={this.state.child_id}/></Tab>
                  <Tab eventKey={6} title="Status"><ApplicationFormStatus myapplicantData={this.state.myapplicantData} form_steps={this.state.form_steps} childId={this.state.child_id} convertToStudent={this.state.convert_to_students}/></Tab>
               </Tabs> 
            </div>
          );
      }    
}