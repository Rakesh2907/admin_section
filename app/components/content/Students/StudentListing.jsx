import React from 'react';
import { DataTable } from 'react-data-components';
import {Button, Modal, Tabs, Tab, Panel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import ReactTags from 'react-tag-autocomplete';

export default class StudentListing extends React.Component
{
	constructor(props) {
    	super(props);
    	this.state = {
    		data: [],
    		tableColumns: [
    			{ title: 'First Name', prop: 'child_firstname' },
    			{ title: 'Last Name', prop: 'child_lastname' },
    			{ title: 'Mobile', prop: 'mobile'},
    			{ title: 'Fees Status', prop: 'fee_status'},
    			{ title: 'Registration Number', prop: 'registration_number'},
    		],
    		filterVisible:false,
            admissionFDate: '',
            admissionTDate: '',
            tags: [
                 { id: 1, name: "Nursery" },
                 { id: 2, name: "KG" },
                 { id: 3, name: "I"}
            ],
            suggestions: []
    	}
    	this.filter = this.filter.bind(this);
        this.handleChangeFDate = this.handleChangeFDate.bind(this);
        this.handleChangeTDate = this.handleChangeTDate.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    } 
    handleChangeFDate(value){
        this.setState({admissionFDate:value});
    }
    
    handleChangeTDate(value){
        this.setState({admissionTDate:value});
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
    			success: function(res) { 
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
                    from_date : this.state.admissionFDate,
                    to_date: this.state.admissionTDate,
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
	render(){
			var _style = {
                    display:"none"   
          	};
            var _inlineStyle = {
                marginRight: 10
            }

            let myfilter;
            if(this.state.filterVisible)
            {
                myfilter = (
                    <div className="body">
                     <form id="father_form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="1">
                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <h2 className="card-inside-title" style={{float:'right'}}>Admission Dates:</h2>
                                                </div>
                            </div>
                            <div className="col-sm-4">
                                                <div className="form-group">
                                                        <DatePicker id="example-datepicker" dateFormat="YYYY/MM/DD" name="admission_fdate" value={this.state.admissionFDate} required onChange={this.handleChangeFDate}/>
                                                </div>
                            </div>
                            <div className="col-sm-4">
                                                <div className="form-group">
                                                        <DatePicker id="example-datepicker" dateFormat="YYYY/MM/DD" name="admission_tdate" value={this.state.admissionTDate} required onChange={this.handleChangeTDate}/>
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
                        </div>    
                     </div>
                 );
	}			
}