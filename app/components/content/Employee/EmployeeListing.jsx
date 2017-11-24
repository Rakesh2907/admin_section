import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { DataTable } from 'react-data-components';
import {Button, Modal, Panel} from 'react-bootstrap';
import EmployeeTabs from 'EmployeeTabs';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {black500, blue500} from 'material-ui/styles/colors';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import MenuItem from 'material-ui/MenuItem';

var myemployeeId = 0;

class ActionMenu extends React.Component
{
    constructor(props) {
      super(props);
        this.state = {
            isOpen: false,
            employeeId: this.props.employeeId
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
                <ActionSubMenu isOpen={this.state.isOpen} employeeId={this.props.employeeId}/>
           </div>
        )
    }
       
}

class ActionSubMenu extends React.Component{
      
      constructor(props) {
        super(props);
        this.state = {
          modalShow: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.noDelete = this.noDelete.bind(this);
        this.yesDelete = this.yesDelete.bind(this);
      }
      handleDelete(){
          this.setState({ modalShow: true})
      }
      noDelete(){
          this.setState({ modalShow: false})
      }
      yesDelete(employeeId)
      {

            var mydata = {
                'delete': 'employee',
                    'id': employeeId
            }

            $.ajax({
              url: base_url+'employee_con/delete',
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
      handleEdit(employeeId)
      {
           myemployeeId = employeeId;
           document.getElementById("show").click();
      }
      render(){
        if (this.props.isOpen)
        {
            var _style = {
                    display:"block"  
            };
          return( 
              <div className="dropdown">
                        <ul className="dropdown-menu pull-right" style={_style}>
                            <li><a className=" waves-effect waves-block" href="javascript:void(0)" onClick={this.handleEdit.bind(this,this.props.employeeId)}>Edit</a></li>
                            <li><a className=" waves-effect waves-block" href="javascript:void(0)" data-toggle="modal" onClick={this.handleDelete}>Delete</a></li>
                        </ul>
                        <Modal show={this.state.modalShow} onHide={this.noDelete} container={this} aria-labelledby="contained-modal-title">
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">Delete</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure delete details?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.yesDelete.bind(this,this.props.employeeId)}>Yes</Button>
                            <Button bsStyle="primary" onClick={this.noDelete}>No</Button>
                          </Modal.Footer>
                       </Modal>  
              </div>
          );
        } 
        return null;  
      }  
}

class ProfileImage extends React.Component
{
      constructor(props) 
      {
          super(props);
      }  
      
      render(){
          return(
             <div>
                <img src={this.props.myImage} width="30" height="30"/>
             </div> 
          );
      }  
}

export default class EmployeeListing extends React.Component
{
	constructor(props) 
    {
    	super(props);
    	var value = new Date().toISOString();
      const todayDate = new Date();
    	this.state = {
                data: [],
                tableColumns: [
                  { title: 'Name', prop: 'first_name' },
                  { title: 'Email', prop: 'email' },
                  { title: 'Mobile', prop: 'phone'},
                  { title: 'Sex', prop: 'gender'},
                  { title: 'Avatar', prop: 'myimage'},
                  { title: 'Actions', prop: 'actions'}
                ],
                employeeId:0,
                showEditModal: false,
                value: value,
                employeeInfo: [],
                filterVisible:false,
                joining_fdate: todayDate,
                joining_Tdate: todayDate,
                formatedFDate: this.formatDate(todayDate),
                formatedTDate: this.formatDate(todayDate),
                ebirth_date:todayDate,
                ebirthdateFormated:this.formatDate(todayDate),
                gender:'all',
                department_id: 0,
                category_id:0
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleGender = this.handleGender.bind(this);
    }
    componentDidMount(){
    	  this.setState({filterVisible:true});
        var that = this;
        var myData = {
                    joining_from_date : this.state.formatedFDate,
                    joining_to_date: this.state.formatedTDate,
                    bith_date: this.state.ebirthdateFormated 
        }
        this.employeeList(that,myData);
    }
    getChildContext() {
        return {
          muiTheme: getMuiTheme(darkBaseTheme)
        };
    }
    open(){
    	 $.ajax({
    	 	 url: base_url+'employee_con/get_employee?id='+myemployeeId,
    	 	 dataType: 'json',
      		 method: 'GET',
      		 headers: {
                        "Content-Type":"text/plain; charset=utf-8", 
                        "Accept": "*", 
                        "Accept-Language":"es-ES,es;q=0.8"
             },
             success: function(resdata){
                if(resdata.length > 0)
                {
                    this.setState({employeeInfo:resdata[0]});
                }
      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error(err.toString());
      		}.bind(this)
    	 });
    	 this.setState({ showEditModal: true });
    }
    close(){
    	this.setState({ showEditModal: false });	
    }
     resetFilter(event){
      event.preventDefault();
        this.setState({
            joining_fdate:'',
            joining_Tdate:'',
            ebirth_date:'',
            formatedFDate:'',
            formatedTDate:'',
            ebirthdateFormated: '',
            gender:'all',
            department_id:0,
            category_id:0
        });
        var myData = {
            joining_from_date:'',
            joining_to_date:'',
            birth_date:'',
            gender:'all',
            department_id:0,
            category_id:0
        }
        this.employeeList(this,myData);
    }
    handleSubmit(event){
  		event.preventDefault();
      var that = this;
      var myData = {
          joining_from_date: this.state.formatedFDate,
          joining_to_date: this.state.formatedTDate,
          birth_date: this.state.ebirthdateFormated,
          gender: this.state.gender,
          department_id: this.state.department_id,
          category_id: this.state.category_id
      }
      this.employeeList(this,myData);
 	  }
    filter(){
        this.setState({filterVisible: !this.state.filterVisible});
    }
    handleChangeJoiningFDate(event,date){
          this.setState({joining_fdate:date,formatedFDate:this.formatDate(date)});
    }  
    handleChangeJoiningTDate(event,date){
          this.setState({joining_Tdate:date,formatedTDate:this.formatDate(date)});
    }
    handleChangeBirthDate(event,date){
          this.setState({ebirth_date:date,ebirthdateFormated:this.formatDate(date)}); 
    }
    handleGender(event,value){
       this.setState({gender:value});
    }
    formatDate(date){
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    handleChangeDepartment(event,index,value){
        this.setState({department_id:value});
    }
    handleChangeCategory(event,index,value){
        this.setState({category_id:value});
    }        
    employeeList(that,myData){
        $.get({
            url: base_url+'employee_con/employee_list',
                  type: 'POST',
                  dataType: 'json',
                  data:myData,   
                  success: function(res) {
                    for(var i = 0;i < res.length;i++)
                    {
                        res[i]['myimage'] = <ProfileImage myImage={res[i]['myimage']} /> 
                        res[i]['actions'] = <ActionMenu employeeId={res[i]['employee_id']} /> 
                    } 
                    that.setState({data: res});
          },error: function() { console.log('Failed!'); }   
        });
    }
	  render(){
			var _style = {
          display:"none"	 
      };
      const styles = {
            floatingLabelStyle: {
                color: black500,
            },
            underlineStyle: {
                borderColor: black500,
            },
            radioButton: {
                marginBottom: 0,
                display:"inline-block",
                width:"25%",
                paddingTop: 15
            }
     }       
     let myfilter;
     if(this.state.filterVisible){
          myfilter = (
             <div className="body">
             <ValidatorForm id="filter_form" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
                  <div className="row clearfix">
                            <div className="col-sm-6">
                                <DatePicker 
                                    floatingLabelText="Joining (From Date)"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    onChange={this.handleChangeJoiningFDate.bind(this)}
                                    fullWidth={true} 
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    name="joining_fdate" 
                                    id="joining_fdate" 
                                    value={this.state.joining_fdate}
                                    autoOk={true}
                                    container="inline"
                                 /> 
                            </div>
                            <div className="col-sm-6">
                                <DatePicker 
                                    floatingLabelText="Joining (To Date)"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    onChange={this.handleChangeJoiningTDate.bind(this)}
                                    fullWidth={true} 
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    name="joining_Tdate" 
                                    id="joining_Tdate" 
                                    value={this.state.joining_Tdate}
                                    autoOk={true}
                                    container="inline"
                                />                   
                           </div>
                       </div>
                       <div className="row clearfix">
                            <div className="col-sm-6">
                                <DatePicker 
                                    floatingLabelText="Birth Date"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    onChange={this.handleChangeBirthDate.bind(this)}
                                    openToYearSelection={true} 
                                    fullWidth={true} 
                                    name="ebirth_date" 
                                    id="ebirth_date" 
                                    value={this.state.ebirth_date}
                                    autoOk={true}
                                    container="inline"
                                />
                            </div>
                            <div className="col-sm-6">
                                <RadioButtonGroup name="gender" labelPosition="right" valueSelected={this.state.gender} style={styles.block} onChange={this.handleGender.bind(this)}>
                                      <RadioButton
                                        value="all"
                                        label="ALL"
                                        style={styles.radioButton}
                                        labelStyle={styles.floatingLabelStyle}
                                        inputStyle={styles.floatingLabelStyle}
                                        iconStyle={styles.floatingLabelStyle}
                                      />
                                      <RadioButton
                                        value="male"
                                        label="MALE"
                                        style={styles.radioButton}
                                        labelStyle={styles.floatingLabelStyle}
                                        inputStyle={styles.floatingLabelStyle}
                                        iconStyle={styles.floatingLabelStyle}
                                      />
                                      <RadioButton
                                        value="female"
                                        label="FEMALE"
                                        style={styles.radioButton}
                                        labelStyle={styles.floatingLabelStyle}
                                        inputStyle={styles.floatingLabelStyle}
                                        iconStyle={styles.floatingLabelStyle}
                                      />
                                </RadioButtonGroup>
                            </div>
                       </div> 
                       <div className="row clearfix">
                          <div className="col-sm-6">
                                <SelectValidator 
                                  name="department_id" 
                                  floatingLabelText="Department"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={this.state.department_id}
                                  defaultValue={this.state.department_id}
                                  onChange={this.handleChangeDepartment.bind(this)}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                  id="department_id"
                                  fullWidth={true}
                                >
                                  <MenuItem value={0} primaryText="Select"/> 
                                    {this.props.departmentInfo}
                                </SelectValidator>
                          </div>
                           <div className="col-sm-6">
                                <SelectValidator 
                                  name="category_id" 
                                  floatingLabelText="Category"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={this.state.category_id}
                                  defaultValue={this.state.category_id}
                                  onChange={this.handleChangeCategory.bind(this)}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                  id="category_id"
                                  fullWidth={true}
                                >
                                  <MenuItem value={0} primaryText="Select"/> 
                                    {this.props.categoryInfo}
                                </SelectValidator>
                           </div>
                       </div>
                       <div className="row clearfix">
                           
                       </div>         
                       <div className="row clearfix">
                            <div className="col-sm-6">
                                <RaisedButton label="Result" primary={true} style={{marginRight: 10}} type="submit"/>
                                <RaisedButton label="Reset" primary={true} type="reset" onClick={this.resetFilter.bind(this)}/>
                            </div>
                       </div>               
              </ValidatorForm>
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
    		                <h2>EMPLOYEE</h2>
                        <ul className="header-dropdown m-r--5">
                                    <li className="dropdown">
                                        <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            <i className="material-icons">more_vert</i>
                                        </a>
                                        <ul className="dropdown-menu pull-right">
                                            <li><a href="#/add_employee">Add New</a></li>
                                            <li><a href="javascript:void(0);" onClick={this.filter.bind(this)}>{this.state.filterVisible? 'Hide Filter': 'Show Filter'}</a></li>
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
      		                keys={this.state.data.employee_id}
      		                columns={this.state.tableColumns}
      		                initialData={this.state.data}
      		                initialPageLength={10}
      		                initialSortBy={{ prop: 'name', order: 'descending' }}
      		                pageLengthOptions={[ 10, 20, 50, 100 ]}
      		             />
      		             <Button bsStyle="primary" bsSize="large" onClick={this.open} id="show" style={_style}>Open Model</Button>
                    </div>   
              </div>
            );
	  }else{
        return (
            <div>
                <EmployeeTabs myemployeeId={myemployeeId} close={this.close} employeeInfo={this.state.employeeInfo} categoryInfo={this.props.categoryInfo} departmentInfo={this.props.departmentInfo}/>
                <Button bsStyle="primary" bsSize="large" id="cancelPanel" onClick={this.close} style={_style}>Cancel</Button>
            </div>
        );
    }	
  }   	
}

EmployeeListing.childContextTypes = {
  muiTheme: React.PropTypes.object
};