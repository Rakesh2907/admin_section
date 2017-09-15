import React from 'react';
import { DataTable } from 'react-data-components';
import Input from '../fields/Input';
import {Button, Modal, Tabs, Tab, Panel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import Radio from '../fields/Radio';
import ControlledTabs from 'ControlledTabs';

var myapplicantData = 0;
var statusApplicant = false;

class ActionMenu extends React.Component
{
      constructor(props) {
          super(props);
          this.state = {
                isOpen: false,
                applicantId: this.props.applicantId,
                applicantStatus: this.props.applicantStatus       
          }
          this.handleActionClick = this.handleActionClick.bind(this);
      }
      handleActionClick(e){
            e.stopPropagation();
            console.log("buttonApplicant click", this.state.isOpen);
            this.setState({isOpen: !this.state.isOpen});
      }
      render()
      {
          return(
                <div>
                  <a onClick={this.handleActionClick} href="javascript:void(0)"><i className="material-icons">open_in_new</i></a>
                  <ActionSubMenu isOpen={this.state.isOpen} applicantId={this.props.applicantId} applicantStatus={this.props.applicantStatus}/>
                </div>
          );
      }    
}

class ActionSubMenu extends React.Component
{
      constructor(props) {
          super(props);
          this.state = {
              modalShow: false,
          }
      } 
      handleDelete(){
          this.setState({ modalShow: true})
      }
      noDelete(){
          this.setState({ modalShow: false})
      }
      yesDelete(applicantId){
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
        }
        handleEdit(applicantId,applicantStatus){

           myapplicantData = applicantId;
           if(applicantStatus === 'incomplete'){
              statusApplicant = true;
           }else{
              statusApplicant = false;
           }
           document.getElementById("show").click();
        }
       render()
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
                              pageLengthOptions={[ 10, 20, 50, 100 ]}
                           />
                           <Button bsStyle="primary" bsSize="large" onClick={this.open} id="show" style={_style}>Open Model</Button>   
                     </div>
                 );
          }else{
              return (
                     <div className="card">
                         <div className="header">
                            <h2>APPLICANT DETAILS</h2>
                            <a onClick={this.close} href="javascript:void(0)" style={{float:'right',position: 'relative',bottom:'22px'}}><i className="material-icons">close</i></a>
                        </div>
                         <Panel collapsible expanded={this.state.showEditModal}>
                              <ControlledTabs statusApplicant={statusApplicant} myapplicantData={myapplicantData}/>
                              <Button bsStyle="primary" bsSize="large" id="cancelPanel" onClick={this.close} style={_style}>Cancel</Button>
                         </Panel>
                     </div> 
                );
         }        
  }
}	
