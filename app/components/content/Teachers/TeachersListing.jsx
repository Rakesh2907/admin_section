import React from 'react';
import ReactDOM from 'react-dom';
import { DataTable } from 'react-data-components';
import Input from '../fields/Input';
import Radio from '../fields/Radio';
import {Button, Modal, Panel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

var myteacherData = 0;

var ActionMenu = React.createClass({

	getInitialState: function()
    {
            return {
                isOpen: false,
                teacherId: this.props.teacherId
            };
    },
    handleActionClick: function(e){
    		e.stopPropagation();
            console.log("button click", this.state.isOpen);
            this.setState({isOpen: !this.state.isOpen});
    },
	render: function()
        {
            return (
                <div>
                    <a onClick={this.handleActionClick} href="javascript:void(0)">Actions</a>
                 	<ActionSubMenu isOpen={this.state.isOpen} teacherId={this.props.teacherId}/>
                </div>
            );
        }

});

var ActionSubMenu = React.createClass({
		
		getInitialState: function()
    	{
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
        yesDelete:function(teacherId)
        {
        	var mydata = {
        			'delete': 'teacher',
                	'id': teacherId
        	}

        	$.ajax({
  				url: 'http://localhost/school_product/admin_con/delete',
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
        handleEdit:function(teacherId)
        {
        	 myteacherData = teacherId;
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
                            <li><a className=" waves-effect waves-block" href="javascript:void(0)" onClick={this.handleEdit.bind(this,this.props.teacherId)}>Edit</a></li>
                            <li><a className=" waves-effect waves-block" href="javascript:void(0)" data-toggle="modal" onClick={this.handleDelete}>Delete</a></li>
                        </ul>
                        <Modal show={this.state.modalShow} onHide={this.noDelete} container={this} aria-labelledby="contained-modal-title">
					          <Modal.Header closeButton>
					            <Modal.Title id="contained-modal-title">Delete</Modal.Title>
					          </Modal.Header>
					          <Modal.Body>
					            Are you sure delete teacher details?
					          </Modal.Body>
					          <Modal.Footer>
					          	<Button bsStyle="primary" onClick={this.yesDelete.bind(this,this.props.teacherId)}>Yes</Button>
					            <Button bsStyle="primary" onClick={this.noDelete}>No</Button>
					          </Modal.Footer>
        				</Modal>	
                    </div>
                );
            }
            return null;
        }
    });


export default class TeachersListing extends React.Component
{
	constructor(props) 
    {
    	super(props);
    	var value = new Date().toISOString();
    	this.state = {
                data: [],
                tableColumns: [
                  { title: 'Name', prop: 'name' },
                  { title: 'Email', prop: 'email' },
                  { title: 'Mobile', prop: 'phone'},
                  { title: 'Sex', prop: 'sex'},
                  { title: 'Actions', prop: 'actions'}
                ],
                teacherId:0,
                showEditModal: false,
                value: value
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentDidMount() 
    {
    	var that = this;
    	$.get({
    		 	url: 'http://localhost/school_product/admin_con/teacher_details',
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
                			res[i]['actions'] = <ActionMenu teacherId={res[i]['teacher_id']} /> 
                	} 

                    that.setState({
                            data: res
                    });
                },
                error: function() { console.log('Failed!'); }		
    	});
    }
    open(){
    	 console.log("Teacher Id: "+myteacherData);
    	 $.ajax({
    	 	 url: 'http://localhost/school_product/admin_con/get_teacher?id='+myteacherData,
    	 	 dataType: 'json',
      		 method: 'GET',
      		 headers: {
                        "Content-Type":"text/plain; charset=utf-8", 
                        "Accept": "*", 
                        "Accept-Language":"es-ES,es;q=0.8"
             },
             success: function(resdata) {

             	$("input[name='teacher_name']").val(resdata[0]['name']);
             	$("input[name='teacher_email']").val(resdata[0]['email']);
             	$("#teacher_address").val(resdata[0]['address']);
             	$("input[name='teacher_religion']").val(resdata[0]['religion']);
             	$("input[name='teacher_qualification']").val(resdata[0]['qualification']);
             	$("input[name='teacher_blood_group']").val(resdata[0]['blood_group']);
             	$("input[name='teacher_mobile']").val(resdata[0]['phone']);

             	if(resdata[0]['sex'] === 'male'){
             		$("#male").attr('checked', true);
             	}else{
             		$("#female").attr('checked', true);
             	}

             	this.setState({date:resdata[0]['birthday']});

      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error(err.toString());
      		}.bind(this)
    	 });
    	 this.setState({ showEditModal: true });
    }
    close()
    {
    	this.setState({ showEditModal: false });	
    }
    handleChangeDate(value)
    {
  		 this.setState({
      		date: value
    	 });
    }
    handleSubmit(event)
    {
  		event.preventDefault();
  		$.ajax({
  			url: 'http://localhost/school_product/admin_con/edit_teacher?id='+myteacherData,
      		dataType: 'json',
      		type: 'POST',
      		data: $('#teacher_form').serialize(),
      		success: function(resdata) {
        		if(resdata.success){
        			window.location.reload()
        		}
      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error(err.toString());
      		}.bind(this)	
  		});
 	}
	render(){

			var _style = {
               			display:"none"	 
            };
			return (
				<div className="card">
		             <div className="header">
		                <h2>TEACHERS</h2>
		             </div>
		             <DataTable
		                className="body"
		                keys={this.state.data.teacher_id}
		                columns={this.state.tableColumns}
		                initialData={this.state.data}
		                initialPageLength={5}
		                initialSortBy={{ prop: 'name', order: 'descending' }}
		                pageLengthOptions={[ 5, 20, 50, 100 ]}
		             />
		             <Button bsStyle="primary" bsSize="large" onClick={this.open} id="show" style={_style}>Open Model</Button>
        			<Modal show={this.state.showEditModal} onHide={this.close} container={this} aria-labelledby="contained-modal-title">
        				<form id="teacher_form" onSubmit={this.handleSubmit}>
					          <Modal.Header closeButton>
					            <Modal.Title id="contained-modal-title">Edit Teacher</Modal.Title>
					          </Modal.Header>
					          <Modal.Body>	           
					           		<div className="form-group form-float">
                                        <Input
                                            labelname='Teacher Name'
                                        	textname='teacher_name'
                                        	texttype='text'
          									required={true}
          								 />
                                	</div>
                                	<div className="form-group form-float">
                                        <DatePicker id="example-datepicker" dateFormat="YYYY/MM/DD" name="teacher_dob" value={this.state.date} required onChange={this.handleChangeDate}/>
                                	</div>
                                	<div className="form-group form-float">
                                        <Input
                                           labelname='Email'
                                           textname='teacher_email'
                                           texttype='email'
          								   required={true}
          								 />
                                    </div>
                                    <div className="form-group form-float">
                                      	<Input
                                           labelname='Mobile'
                                           textname='teacher_mobile'
                                           texttype='text'
          								   required={true}
          								 />
                                	</div>
                                	<div className="form-group">
                                		<Radio
                                		   radioname='teacher_gender'
                                		   radioid='male' 
                                		   radiolabel='Male'
                                		   radiovalue='male'
                                		/>
                                		<Radio
                                		   radioname='teacher_gender'
                                		   radioid='female'
                                		   radiolabel='Female' 
                                		   radiovalue='female'
                                		/>
                                   </div>
                                   <div className="form-group form-float">
	                                    <div className="form-line">
	                                        <textarea name="teacher_address" id="teacher_address" cols="30" rows="5" className="form-control no-resize"  required></textarea>
	                                        <label className="form-label">Address</label>
	                                    </div>
                                   </div>
                                   <div className="form-group form-float">
                                		<Input
                                           labelname='Religion'
                                           textname='teacher_religion'
                                           texttype='text'
          								   required={true}
          								 />
                                   </div>
                                   <div className="form-group form-float">
                                		<Input
                                           labelname='Qualification'
                                           textname='teacher_qualification'
                                           texttype='text'
          								   required={true}
          								/>
                                   </div>
                                   <div className="form-group form-float">
                                	   <Input
                                           labelname='Blood Group'
                                           textname='teacher_blood_group'
                                           texttype='text'
          								   required={true}
          							    />
                                   </div>
					          </Modal.Body>
					          <Modal.Footer>
					            <Button bsStyle="btn btn-primary waves-effect" type="submit">SUBMIT</Button>
					            <Button bsStyle="primary" onClick={this.close}>Close</Button>
					          </Modal.Footer>
						</form>
        			</Modal>
            	</div>
        	);
	}			
}