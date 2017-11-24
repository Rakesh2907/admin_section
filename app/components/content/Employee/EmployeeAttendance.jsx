import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import SelectField from 'material-ui/SelectField';
import {black500, blue500} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Button, Modal} from 'react-bootstrap';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

var json_data;
var today;
var date_headers;
var employees;
var absence;
var current_day;
var current_date;
var selected_date;
var m,y,d;
var attendance;
var emp_id;
var date;
var employee_dates;
var att_id;

class CalenderHeader extends React.Component
{
      constructor(props) {
          super(props);
          this.state = { 
              myMonth: this.props.CurrentMonth,
              myJsonData: this.props.myJsonData,
          }
      }
      render(){
          return React.createElement("div", {className: "calheader"}, React.createElement("div", {className: "prev"},React.createElement("a",{href:"javascript:void(0)",onClick:this.props.loadMonth.bind(this,'prev',this.props.myJsonData)},'<<')), React.createElement("div", {className: "month"},this.props.CurrentMonth), React.createElement("div", {className: "next"},React.createElement("a",{href:"javascript:void(0)",onClick:this.props.loadMonth.bind(this,'next',this.props.myJsonData)},'>>')) , React.createElement("div", {className: "extender"})); 
      }
}
var leave_type = [];
class CalenderContent extends React.Component
{
      constructor(props) {
          super(props);
          this.state = { 
              myData: this.props.myJsonData, 
              modalShow: false,
              employee_name: '',
              employee_id: 0,
              leave_date: '',
              leave_id:0,
              myleave_type: 1,
              leave_typeInfo:[],
              leave_time: 'full_time',
              leave_reason: ''
          }
      }
      componentWillMount(){
            leave_type = [];
            $.ajax({
                  type: 'GET',
                  url: base_url+'employee_con/get_leave_type',
                  dataType: 'json',
                  success: function (resdata) {
                      if(resdata.length > 0)
                      { 
                          for(var i = 0;i < resdata.length;i++){
                              leave_type.push(<MenuItem value={resdata[i]['type_id']} primaryText={resdata[i]['leave_type']} />);
                          } 
                          this.setState({leave_typeInfo:leave_type}); 
                      }else{
                          
                      }
                   }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                  }.bind(this)
             });
      }
      handleChangeReason(event){
          this.setState({leave_reason:event.target.value});
      }
      new_attendance(myemp_id,sel_date)
      {
           $.ajax({
                  type: 'GET',
                  url: base_url+'employee_con/get_employee?id='+myemp_id,
                  dataType: 'json',
                  success: function (resdata) {
                      if(resdata.length > 0)
                      {
                          this.setState({modalShow: true,employee_id:myemp_id,leave_date:sel_date,employee_name:resdata[0]['first_name']+' '+resdata[0]['last_name'],myleave_type:1,leave_id:0,leave_reason:''});
                      }else{
                          
                      }
                   }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                  }.bind(this)
             });
      }
      edit_attendance(myemp_id,sel_date,myatt_id)
      {
            $.ajax({
                  type: 'GET',
                  url: base_url+'employee_con/get_leave_details?leave_id='+myatt_id,
                  dataType: 'json',
                  success: function (resdata) {
                      if(resdata.length > 0)
                      {
                          this.setState({modalShow: true,employee_id:myemp_id,leave_date:sel_date,employee_name:resdata[0]['first_name']+' '+resdata[0]['last_name'],myleave_type:resdata[0]['leave_type'],leave_id:resdata[0]['leave_id'],leave_reason:resdata[0]['leave_reason'],leave_time:resdata[0]['time']});
                      }else{
                          
                      }
                   }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                  }.bind(this)
             });
          this.setState({modalShow: true,employee_id:myemp_id,leave_date:sel_date,leave_id:myatt_id});
      }
      noDelete(){
          this.setState({ modalShow: false})
      }
      handleSubmit(event){
            event.preventDefault();
            var eleave_type = this.state.myleave_type;
            var eleave_date = this.state.leave_date;
            var emp_id = this.state.employee_id;
            
            if(this.state.leave_id > 0){
               var myURL = base_url+'employee_con/edit_leave_info'; 
               var myData = $('#leaveform1').serialize()+'&employee_id='+emp_id+'&leave_type='+eleave_type+'&leave_date='+eleave_date+'&leave_id='+this.state.leave_id;
            }else{
               var myURL = base_url+'employee_con/save_leave_info';
               var myData = $('#leaveform1').serialize()+'&employee_id='+emp_id+'&leave_type='+eleave_type+'&leave_date='+eleave_date; 
            }
            $.ajax({
                      type: 'POST',
                      url: myURL,
                      data: myData,
                      dataType: 'json',
                      success: function (resdata) {
                          this.setState({modalShow: false});
                          swal({
                              title: "Save Successfully...",
                              type: "success",
                              confirmButtonClass: 'btn-success',
                              confirmButtonText: 'Okay'
                          },function(){
                              document.getElementById("reload_list").click();
                          });
                      }.bind(this),
                        error: function(xhr, status, err) {
                          console.error(err.toString());
                      }.bind(this)
           });


      }
      handleChangeLeaveType(event,index,value){
          this.setState({myleave_type:value});
      }
      getChildContext() {
          return {
            muiTheme: getMuiTheme(darkBaseTheme)
          };
      }
      render()
      {
     
        const styles = {
            floatingLabelStyle: {
              color: black500,
            },
            underlineStyle: {
              borderColor: black500,
            },
            radioButton: {
              marginTop:16,
              marginLeft:10,
              width: 'auto',
              display: 'inline-block'
            },
            radioLabel:{
               color: black500,
               width:'auto'
            }
        }

        employees = this.props.myJsonData.employees;
        date_headers = this.props.myJsonData.date_headers;
        absence = this.props.myJsonData.absence;
        current_day = this.props.myJsonData.current_day;
        current_date = this.props.myJsonData.current_date;
        selected_date = this.props.myJsonData.selected_date;
        var myClassName;
        var mark_att;
        m = ("0" + String((new Date(this.props.myJsonData.month_year)).getMonth() + 1) ).slice(-2);
        y = (new Date(this.props.myJsonData.month_year)).getFullYear();

        var namesList = date_headers.map(function(v){
            return <td className="head-td-date"><div className="day themed_text">{v.day}</div><div className="date">{v.date}</div></td>;
        });

        var emloyeeList = employees.map((v) => {  

            var myList = date_headers.map((val) => {

                var myId = "attendance-employee-"+ v.employee.id +"-day-" + y.toString()+"-"+m.toString()+"-" + String(val.date);
               
                if (current_date == selected_date && val.date == current_day){
                    myClassName = "td-mark active";
                    if(val.day == 'Sun'){
                      myClassName = "td-mark active sunactive";  
                    }
                }else{
                    myClassName = "td-mark";
                    if(val.day == 'Sun'){
                        myClassName = "td-mark sunactive";  
                    }
                }



                attendance = absence[v.employee.id];
                emp_id = v.employee.id;
           
                date = y.toString() + "-"+m.toString() +"-"+ val.date.toString();

                if(attendance!= undefined)
                {
                    employee_dates = attendance.map(function(e){
                        return e.date
                    });

                    $.each(attendance,function(i,att){
                      if(att.date ==  date){
                          att_id = att.att_id;
                          return false;
                      }else{
                          att_id = undefined;
                      }
                   })

                    if (att_id != undefined && employee_dates.indexOf(date) > -1 )
                    {
                          mark_att = React.createElement("a",{href:"javascript:void(0)",className:"absent themed_text",onClick:this.edit_attendance.bind(this,emp_id,date,att_id)},"X");

                    }else{
                            mark_att = React.createElement("a",{href:"javascript:void(0)",className:"present",onClick:this.new_attendance.bind(this,emp_id,date)}," "); 

                    }
                }else{
                          mark_att = React.createElement("a",{href:"javascript:void(0)",className:"present",onClick:this.new_attendance.bind(this,emp_id,date)}," ");
                }

                return <td className={myClassName} id={myId}>{mark_att}</td>;
            });

          return <tr className="tr-odd"><td className="td-name">{v.employee.first_name}</td>{myList}</tr>
        });
        return(
            <div className="body">
               <table id="register-table" className="table table-bordered">
                    <tbody>
                      <tr className="tr-head">
                        <td className="head-td-name themed_text">Name</td>{namesList}
                      </tr>
                      {emloyeeList}
                    </tbody>
               </table> 
                <Modal show={this.state.modalShow} onHide={this.noDelete.bind(this)} container={this} aria-labelledby="contained-modal-title">
                  <ValidatorForm id="leaveform1" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">Leave</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="row clearfix">
                              <div className="col-sm-12">
                                <TextField
                                    floatingLabelText="Employee Name"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="employee_name"
                                    value={this.state.employee_name}
                                    id="employee_name"
                                    fullWidth={true}
                                    disabled={true}
                                 />
                              </div>
                            </div>
                            <div className="row clearfix">
                              <div className="col-sm-12">
                                <TextField
                                    floatingLabelText="Leave Date"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="leave_date"
                                    value={this.state.leave_date}
                                    id="leave_date"
                                    fullWidth={true}
                                    disabled={true}
                                 />
                              </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-sm-12">
                                    <SelectValidator 
                                      name="leave_type" 
                                      floatingLabelText="Leave Type"
                                      floatingLabelStyle={styles.floatingLabelStyle}
                                      inputStyle={styles.floatingLabelStyle}
                                      labelStyle={styles.floatingLabelStyle}
                                      underlineStyle={styles.underlineStyle}
                                      value={this.state.myleave_type}
                                      defaultValue={this.state.myleave_type}
                                      onChange={this.handleChangeLeaveType.bind(this)}
                                      validators={['required']}
                                      errorMessages={['this field is required']}
                                      id="leave_type"
                                      fullWidth={true}
                                    >
                                      {this.state.leave_typeInfo}
                                    </SelectValidator>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-sm-12">
                                    <RadioButtonGroup name="leave_time" valueSelected={this.state.leave_time} onChange={this.handleLeaveTime}>
                                         <RadioButton
                                                value="full_time"
                                                label="Full Time"
                                                style={styles.radioButton}
                                                labelStyle={styles.radioLabel}
                                         />
                                        <RadioButton
                                                value="half_time"
                                                label="Half Time"
                                                style={styles.radioButton}
                                                labelStyle={styles.radioLabel}
                                        />
                                    </RadioButtonGroup>
                                </div>
                            </div> 
                            <div className="row clearfix">
                                <div className="col-sm-12">
                                    <TextValidator
                                        name="leave_reason"
                                        floatingLabelText="Leave Reason"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        inputStyle={styles.floatingLabelStyle}
                                        underlineStyle={styles.underlineStyle}
                                        validators={['required']}
                                        onChange={this.handleChangeReason.bind(this)}
                                        errorMessages={['this field is required']}
                                        value={this.state.leave_reason}
                                        fullWidth={true}
                                        rows={2}
                                    />
                                </div>
                            </div>       
                          </Modal.Body>
                          <Modal.Footer>
                            <RaisedButton style={{marginRight: 12}} primary={true} type="submit" label="Sabmit"/>
                            <RaisedButton primary={true} label="Cancel" onClick={this.noDelete.bind(this)}/>
                          </Modal.Footer>
                  </ValidatorForm>        
               </Modal>
            </div>  
        );
    } 
}

export default class EmployeeAttendance extends React.Component
{
		constructor(props) {
          super(props);
          this.state = { 
              department_id: 0,
          }
        }
        getAttendanceReport(value,mydate)
        {
            var params = 'dep_id='+value;
            if (mydate!=undefined){
               var params = params + '&next='+date;
            }
            ReactDOM.render(<div className="body">Loading...</div>, document.getElementById('register')); 
            $.ajax({
                  type: 'POST',
                  url: base_url+'employee_con/get_attendance_report?'+params,
                  dataType: 'json',
                  success: function (resdata) {
                      if(resdata.status == 'success')
                      {
                        if(resdata.absence != null){
                            this.registerBuilder(resdata);
                        }else{
                            ReactDOM.render(<div className="body">No record found</div>, document.getElementById('register')); 
                        }
                      }else{
                          ReactDOM.render(<div className="body">No record found</div>, document.getElementById('register')); 
                      }
                   }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                  }.bind(this)
             });
        }
        handleChangeDepartment(event,index,value)
        {
            this.setState({department_id:value});
            this.getAttendanceReport(value);
        }
        componentWillMount(){
        
        }
        componentWillReceiveProps(props){
         
        }
        loadMonth(month,json_data)
        {
            if(month == 'prev'){
                m = (new Date(json_data.month_year )).getMonth() ;
            }else if(month == 'next'){
                m = parseInt((new Date(json_data.month_year )).getMonth()) + 2;
            }
            //console.log('Month: '+m);

            if(m == 0){
                m = 12;
                y = (new Date(json_data.month_year)).getFullYear() - 1;
            }
            if(m == 13){
                m = 1;
                y = (new Date(json_data.month_year)).getFullYear() + 1;
            }
            d = (new Date(json_data.month_year)).getDate();
            date = y.toString() + "-"+m.toString() +"-"+ d.toString();
            this.getAttendanceReport(this.state.department_id,date);
        }
        handleSubmit(event){
            event.preventDefault();
        }
        registerBuilder(mydata1){
            json_data = mydata1;
            today = mydata1.today;

            ReactDOM.render(<div><CalenderHeader CurrentMonth={today} myJsonData={json_data} loadMonth={this.loadMonth.bind(this)}/><CalenderContent myJsonData={json_data}/></div>, document.getElementById('register')); 
        }
        render(){
          const styles = {
            floatingLabelStyle: {
              color: black500,
            },
            underlineStyle: {
              borderColor: black500,
            }
          }
          const {department_id} = this.state;

        	return(
        		  <div className="card">
                  <div className="header">
                      <h2>EMPLOYEE ATTENDENCE</h2>
                  </div>
                  <div className="body">
                     <div className="row clearfix">
                          <div className="col-sm-6">
                                <SelectField 
                                  name="department_id" 
                                  floatingLabelText="Department"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={department_id}
                                  defaultValue={department_id}
                                  onChange={this.handleChangeDepartment.bind(this)}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                  id="department_id"
                                  fullWidth={true}
                                >
                                <MenuItem value={0} primaryText="Select" />
                                {this.props.departmentInfo}
                              </SelectField>
                          </div>            
                     </div>
                  </div>
                 <div id="register">
                 </div>
                 <RaisedButton
                                  label="Reload"
                                  primary={true}
                                  onClick={this.getAttendanceReport.bind(this,this.state.department_id)}
                                  style={{display:"none"}}
                                  id="reload_list"
                 />
             </div>  
        	);
      }
}

CalenderContent.childContextTypes = {
  muiTheme: React.PropTypes.object
};