import React from 'react';
import {Button, Modal, Panel} from 'react-bootstrap';
import ApplicantForm from 'ApplicantForm';
import ChildForm from 'ChildForm';
import FatherForm from 'FatherForm';
import MotherForm from 'MotherForm';
import GuardianForm from 'GuardianForm';
import Interview from 'Interview';
import ApplicantDocument from 'ApplicantDocument';
import AdmissionFees from 'AdmissionFees';
import ApplicationFormStatus from 'ApplicationFormStatus';

import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';

var occuItems = [];
var statesItems = [];
var classItems = [];
var classId = 0;
var admissionYear = '';
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
            myapplicantData:props.myapplicantData,
            value: "1",
            applicantInfo:[],
            childInfo:[],
            fatherInfo:[],
            matherInfo:[],
            occuInfo:[],
            statesInfo:[],
            statusInfo:[],
            classInfo:[]
          }
          this.handleSelect = this.handleSelect.bind(this);
      }
      componentWillReceiveProps(props){
          this.setState({myapplicantData:props.myapplicantData});
      }
      componentDidMount()
      {
          this.getApplicant(this.state.myapplicantData); 
          this.getStatus(this.state.myapplicantData);
      }
      handleSelect(key) 
      { 
          this.setState({value: key});
          switch(key)
          {
            case "1":
              this.getApplicant(this.state.myapplicantData);
            break;

            case "2":
              this.getStates();
              this.getChild(this.state.myapplicantData);
            break;

            case "3":
              this.getOccupations();
              this.getFather(this.state.myapplicantData);
            break;

            case "4":
              this.getOccupations();
              this.getMother(this.state.myapplicantData);
            break;

            case "6":
              this.getClasses();
              this.getStatus(this.state.myapplicantData);
            break;

            case "7":
              this.getInterviewShedule(this.state.myapplicantData,this.state.child_id)
            break;

            case "9":
              this.getFees(this.state.myapplicantData,this.state.child_id)
            break;
          }
          this.setState({key});
      }
      getClasses(){
        classItems = [];
        $.ajax({
                    type: 'POST',
                    url: base_url+'students_con/get_class',
                    dataType:'json',
                     success: function (resdata) {
                      if(resdata.length > 0)
                      {
                          for(var i = 0;i < resdata.length;i++)
                          {
                              classItems.push(<MenuItem value={resdata[i]['id']} primaryText={resdata[i]['name']} />)
                          }
                          this.setState({classInfo:classItems});
                      }
                     }.bind(this),
                        error: function(xhr, status, err) {
                          console.error(err.toString());
                    }.bind(this)
          });
      }
      getStates(){
          statesItems = [];
           $.ajax({
                type: 'POST',
                url: base_url+'admission_con/get_states',
                dataType:'json',
                 success: function (resdata) {
                  if(resdata.length > 0)
                  {
                      for(var i = 0;i < resdata.length;i++)
                      {
                          statesItems.push(<MenuItem value={resdata[i]['states']} primaryText={resdata[i]['states']} />)
                      }
                      this.setState({statesInfo:statesItems});
                  }
                 }.bind(this),
                    error: function(xhr, status, err) {
                      console.error(err.toString());
                }.bind(this)
           });
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
                            occuItems.push(<MenuItem value={resdata[i]['occupations']} primaryText={resdata[i]['occupations']} />)
                        }
                        this.setState({occuInfo:occuItems});
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
                  child_id: child_id,
                  class_id: classId,
                  admission_year: admissionYear
              },
              success: function(resdata) {
                if(resdata.length > 0)
                {
                    $("input[name='tution_fee']").val(resdata[0]['tution_fees']);
                    $("input[name='admission_fee']").val(resdata[0]['admission_fees']);
                    $("input[name='annual_funds']").val(resdata[0]['annual_funds']);
                    $("input[name='practical_charges']").val(resdata[0]['practical_charges']);
                    $("input[name='test_session']").val(resdata[0]['exam_fees']);
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
                       this.setState({
                            form_steps: resdata[0]['steps'],
                            convert_to_students: resdata[0]['convert_to_student'],
                            child_id: resdata[0]['child_id']
                       });
                       classId = resdata[0]['class_id'];
                       admissionYear = resdata[0]['admission_years']; 
                       this.setState({statusInfo:resdata[0]});
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
                        this.setState({matherInfo:resdata[0]});
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
                        this.setState({fatherInfo:resdata[0]});
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
                        if(resdata.length > 0){
                            this.setState({childInfo:resdata[0]});
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
                            this.setState({applicantInfo:resdata[0]});
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
          const styles = {
            headline: {
              fontSize: 24,
              paddingTop: 16,
              marginBottom: 12,
              fontWeight: 400,
            },
          };

          return(
            <Tabs value={this.state.value} onChange={this.handleSelect}>
              <Tab label="Applicant" value="1">
                <div>
                  <ApplicantForm myapplicantData={this.state.myapplicantData} applicantDetails={this.state.applicantInfo}/>
                </div>
              </Tab>
              <Tab label="Candidate" value="2">
                <div>
                   <ChildForm myapplicantData={this.state.myapplicantData} childInfo={this.state.childInfo} statesInfo={this.state.statesInfo}/>
                </div>
              </Tab>
              <Tab label="Father" value="3">
                <div>
                   <FatherForm occuItems={occuItems} myapplicantData={this.state.myapplicantData} fatherInfo={this.state.fatherInfo} occuFatherInfo={this.state.occuInfo} statesInfo={this.state.statesInfo}/>
                </div>
              </Tab>
              <Tab label="Mother" value="4">
                <div>
                   <MotherForm occuItems={occuItems} myapplicantData={this.state.myapplicantData} matherInfo={this.state.matherInfo} occuInfo={this.state.occuInfo} statesInfo={this.state.statesInfo}/>
                </div>
              </Tab>
              <Tab label="Interview Shedule/Result" value="7">
                <div>
                   <Interview myapplicantData={this.state.myapplicantData} interviewDate={this.state.interview_date} timeCondition={this.state.time_condition} childId={this.state.child_id}/>
                </div>
              </Tab>
              <Tab label="Documents" value="8">
                <div>
                   <ApplicantDocument myapplicantData={this.state.myapplicantData}/>
                </div>
              </Tab>
              <Tab label="Status" value="6">
                <div>
                   <ApplicationFormStatus myapplicantData={this.state.myapplicantData} statusInfo={this.state.statusInfo} classInfo={this.state.classInfo}/>
                </div>
              </Tab>
      </Tabs>
          );
      }    
}