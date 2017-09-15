import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import DatePicker from 'material-ui/DatePicker';
import {black500, blue500} from 'material-ui/styles/colors';
import { DataTable } from 'react-data-components';
import {Button, Modal, Tabs, Tab, Panel} from 'react-bootstrap';
import ReactTags from 'react-tag-autocomplete';
import AddStudentForm from 'AddStudentForm';

var studentID = 0;
var childID = 0;
var classID = 0;
var myStudents;

class ActionSubMenu extends React.Component
{
     constructor(props) {
          super(props);
          this.state = {
              modalShow: false,
              myStudent:props.myStudent
          }
      }
      handleDelete(){
          this.setState({ modalShow: true})
      }
      noDelete(){
          this.setState({ modalShow: false})
      }
      yesDelete(studentId,childId){
            var mydata = {
                'student_id': studentId,
                'child_id': childId
            }

            $.ajax({
              url: base_url+'students_con/delete',
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
      handleEdit(studentId,childId,classId,myStudent)
      {
            myStudents = myStudent;
            studentID = studentId;
            childID = childId;
            classID = classId;
            document.getElementById("show").click();
      }
      handleCopy(childId){
      }
      render(){
          if (this.props.isOpen)
          {
                var _style = {
                    display:"block"  
                };
              
                return (
                     <div className="dropdown">
                        <ul className="dropdown-menu pull-right" style={_style}>
                            <li><a className=" waves-effect waves-block" href="javascript:void(0)" onClick={this.handleEdit.bind(this,this.props.studentId,this.props.childId,this.props.classId,this.props.myStudent)}>EDIT</a></li>
                            <li><a className=" waves-effect waves-block" href="javascript:void(0)" onClick={this.handleDelete.bind(this)}>DELETE</a></li>
                            <li><a className=" waves-effect waves-block" href="javascript:void(0)" onClick={this.handleCopy.bind(this,this.props.childId)}>COPY</a></li>
                        </ul>
                        <Modal show={this.state.modalShow} onHide={this.noDelete} container={this} aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title">DELETE</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          ARE YOU SURE DELETE STUDENT DETAILS?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.yesDelete.bind(this,this.props.studentId,this.props.childId)}>YES</Button>
                            <Button bsStyle="primary" onClick={this.noDelete.bind(this)}>NO</Button>
                        </Modal.Footer>
                      </Modal>  
                    </div>
                );
          }
          return null;
      }

}

class ActionMenu extends React.Component
{
    constructor(props) {
          super(props);
          this.state = {
             isOpen: false,
             studentId: props.studentId,
             childId: props.childId,
             classId: props.classId,
             myStudent: props.myStudent
          }
          this.handleActionClick = this.handleActionClick.bind(this);
    }
    handleActionClick(e){
        e.stopPropagation();
        this.setState({isOpen: !this.state.isOpen});
    }
    render(){
          return(
            <div>
                <a onClick={this.handleActionClick} href="javascript:void(0)"><i className="material-icons">open_in_new</i></a>
                <ActionSubMenu isOpen={this.state.isOpen} studentId={this.props.studentId} childId={this.props.childId} classId={this.props.classId} myStudent={this.props.myStudent}/>
            </div>
          );
    }          
}

export default class StudentListing extends React.Component
{
	constructor(props) {
    	super(props);
        const todayDate = new Date();
    	this.state = {
    		data: [],
    		tableColumns: [
    			{ title: 'First Name', prop: 'child_firstname' },
    			{ title: 'Last Name', prop: 'child_lastname' },
    			{ title: 'Mobile', prop: 'mobile'},
    			{ title: 'Fees Status', prop: 'fee_status'},
    			{ title: 'Registration Number', prop: 'registration_number'},
                { title: 'Actions', prop: 'actions'}
    		],
    		filterVisible:false,
            admissionFDate: todayDate,
            admissionTDate: todayDate,
            formatedFDate:todayDate,
            formatedTDate:todayDate,
            tags: [
                 { id: 1, name: "Nursery" },
                 { id: 2, name: "KG" },
                 { id: 3, name: "I"}
            ],
            suggestions: [],
            showEditModal: false
    	}
    	this.filter = this.filter.bind(this);
        this.handleChangeFDate = this.handleChangeFDate.bind(this);
        this.handleChangeTDate = this.handleChangeTDate.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    } 
    open(){
        this.setState({ showEditModal: true });
    }
    close(){
        this.setState({ showEditModal: false });
    }
    getChildContext() {
        return {
          muiTheme: getMuiTheme(darkBaseTheme)
        };
    }
    handleChangeFDate(event,date){
        this.setState({admissionFDate:date,formatedFDate:this.formatDate(date)});
    }
    handleChangeTDate(event,date){
        this.setState({admissionTDate:date,formatedTDate:this.formatDate(date)});
    }
    handleDelete (i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }
    handleAddition (tag) {
            const tags = [].concat(this.state.tags, tag)
            this.setState({ tags })
    }
    componentDidMount()
    {
    		var that = this;
    		$.get({
    			url: base_url+'students_con/student_list',
    			type: 'GET',
    			dataType: 'json',
    			success: function(res){

                    for(var i = 0;i < res.length;i++)
                    {
                        res[i]['actions'] = <ActionMenu studentId={res[i]['student_id']} childId={res[i]['child_id']} classId={res[i]['class_id']} myStudent={res[i]}/> 
                    }
                    that.setState({
                            data: res
                    });
                },
                error: function() { console.log('Failed!'); }
    		});
    }
    filter(){
    	this.setState({filterVisible: !this.state.filterVisible});
        if(!this.state.filterVisible){
            var that = this;
            $.get({
                url: base_url+'students_con/get_class',
                type: 'GET',
                dataType: 'json',
                success: function(resdata) { 
                   that.setState({
                        suggestions: resdata
                   })
                },
                error: function() { console.log('Failed!'); }
            });
        }
    }
    resetFilter(event)
    {
        event.preventDefault();
        var that = this;
        that.setState({
            admissionFDate:'',
            admissionTDate: '',
            tags:[]
        });
        $.get({
                url: base_url+'students_con/student_list',
                type: 'POST',
                dataType: 'json',
                data:{
                    from_date : '',
                    to_date: '',
                    selected_class: ''
                },
                success: function(res) { 
                    that.setState({
                            data: res
                    });
                },
                error: function() { console.log('Failed!'); }
            });
    }
    handleSubmit(event){
        event.preventDefault();
        let selectedTags = [];
        for(var t = 0; t < this.state.tags.length; t++){
            selectedTags.push(this.state.tags[t]['id']);
        }
        let selectedNew = Array.from(new Set(selectedTags));
        selectedNew = selectedNew.join();
        var that = this;
        $.get({
                url: base_url+'students_con/student_list',
                type: 'POST',
                dataType: 'json',
                data:{
                    from_date : this.state.formatedFDate,
                    to_date: this.state.formatedTDate,
                    selected_class: selectedNew
                },
                success: function(res) { 
                    that.setState({
                            data: res
                    });
                },
                error: function() { console.log('Failed!'); }
            });
    }	
    formatDate(date){
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
	render(){
			var _style = {
                    display:"none"   
          	};
            var _inlineStyle = {
                marginRight: 10
            }

            const styles = {
            floatingLabelStyle: {
                color: black500,
            },
            underlineStyle: {
                borderColor: black500,
            }
        }

            let myfilter;
            if(this.state.filterVisible)
            {
                myfilter = (
                    <div className="body">
                     <form id="filter_form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="1">
                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <h2 className="card-inside-title" style={{float:'right'}}>Admission Dates:</h2>
                                                </div>
                            </div>
                            <div className="col-sm-4">
                                                <div className="form-group">
                                                         <DatePicker 
                                                                floatingLabelText="From Date"
                                                                floatingLabelStyle={styles.floatingLabelStyle}
                                                                inputStyle={styles.floatingLabelStyle}
                                                                underlineStyle={styles.underlineStyle}
                                                                onChange={this.handleChangeFDate}
                                                                fullWidth={false} 
                                                                validators={['required']}
                                                                errorMessages={['this field is required']}
                                                                name="admission_fdate" 
                                                                id="admission_fdate" 
                                                                value={this.state.admissionFDate}
                                                                defaultDate={this.state.admissionFDate}
                                                                autoOk={true}
                                                                container="inline"
                                                         />   
                                                </div>
                            </div>
                            <div className="col-sm-4">
                                                <div className="form-group">
                                                        <DatePicker 
                                                                floatingLabelText="To Date"
                                                                floatingLabelStyle={styles.floatingLabelStyle}
                                                                inputStyle={styles.floatingLabelStyle}
                                                                underlineStyle={styles.underlineStyle}
                                                                onChange={this.handleChangeTDate}
                                                                fullWidth={false} 
                                                                validators={['required']}
                                                                errorMessages={['this field is required']}
                                                                name="admission_fdate" 
                                                                id="admission_fdate" 
                                                                value={this.state.admissionTDate}
                                                                defaultDate={this.state.admissionTDate}
                                                                autoOk={true}
                                                                container="inline"
                                                         />  
                                                </div>
                            </div>
                        </div>
                        <div className="2">
                            <div className="col-sm-4">
                                <div className="form-group">
                                                    <h2 className="card-inside-title" style={{float:'right'}}>Select Class:</h2>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                        <ReactTags tags={this.state.tags} suggestions={this.state.suggestions} handleDelete={this.handleDelete.bind(this)} handleAddition={this.handleAddition.bind(this)} placeholder="Select One or More Classes" minQueryLength={1}/>             
                                </div>
                            </div>
                            <div className="col-sm-4"></div>
                        </div> 
                        <div className="row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-4">
                                <button className="btn btn-primary waves-effect" type="submit" style={_inlineStyle}>Result</button>   
                                <button className="btn btn-primary waves-effect" type="reset" onClick={this.resetFilter}>Reset</button>
                            </div>
                            <div className="col-sm-4"></div>
                         </div> 
                     </form>    
                   </div>
                );
            }else{
                myfilter = null; 
            }
            if(!this.state.showEditModal)
            {
    			return (
                        <div className="card">
                            <div className="header">
                                <h2>STUDENTS</h2>
                                <ul className="header-dropdown m-r--5">
                                    <li className="dropdown">
                                        <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            <i className="material-icons">more_vert</i>
                                        </a>
                                        <ul className="dropdown-menu pull-right">
                                            <li><a href="#/add_student">Add New</a></li>
                                            <li><a href="javascript:void(0);" onClick={this.filter}>{this.state.filterVisible? 'Hide Filter': 'Show Filter'}</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div>
                            	{myfilter}
                            </div>
                            <div>
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
                         </div>
                     );
            }else{
                return (
                     <div>
                        <AddStudentForm Students={myStudents}/>
                        <Button bsStyle="primary" bsSize="large" id="cancelPanel" onClick={this.close} style={_style}>Cancel</Button> 
                     </div> 
                );
            }       
	}			
}

StudentListing.childContextTypes = {
  muiTheme: React.PropTypes.object
};