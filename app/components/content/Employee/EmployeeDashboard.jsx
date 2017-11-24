import React from 'react';

export default class EmployeeDashboard extends React.Component 
{
	constructor(props) {
   			 super(props);
   			 this.state={
   			 	empMgm: false,
   			 	leaveMgm: false
   			 }
    }
    showEmployeeManagement(){
    		this.setState({
    			empMgm:true,
    			leaveMgm: false
    		});
    }
    showLeaveManagement(){
    		this.setState({
    			empMgm:false,
    			leaveMgm: true
    		});
    }
    render(){
    	if(this.state.empMgm){
    	  	return (
    		 <div className="row clearfix">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                       <a href="#add_employee">	
	                        <div className="icon">
	                            <i className="material-icons">person_add</i>
	                        </div>
                       </a>  
                        <div className="content">
                            <div className="text">EMPLOYEE ADMISSION</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-cyan hover-expand-effect">
                       <a href="#employee_assign">	
	                        <div className="icon">
	                            <i className="material-icons">assignment_ind</i>
	                        </div>
                       </a>  
                        <div className="content">
                            <div className="text">ASSIGN SUBJECTS</div>
                        </div>
                    </div>
                </div>
              </div>  
    		);
    	}else if(this.state.leaveMgm){
    		return (
    		 <div className="row clearfix">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                       <a href="#employee_attendance">	
	                        <div className="icon">
	                            <i className="material-icons">chrome_reader_mode</i>
	                        </div>
                       </a>  
                        <div className="content">
                            <div className="text">ATTENDANCE REGISTER</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-cyan hover-expand-effect">
                       <a href="#attendance_report">	
	                        <div className="icon">
	                            <i className="material-icons">dehaze</i>
	                        </div>
                       </a>  
                        <div className="content">
                            <div className="text">ATTENDANCE REPORT</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-light-green hover-expand-effect">
                       <a href="#leave_reset">	
	                        <div className="icon">
	                            <i className="material-icons">restore</i>
	                        </div>
                       </a>  
                        <div className="content">
                            <div className="text">LEAVE RESET</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-orange hover-expand-effect">
                       <a href="#leave_application">	
	                        <div className="icon">
	                            <i className="material-icons">subdirectory_arrow_right</i>
	                        </div>
                       </a>  
                        <div className="content">
                            <div className="text">LEAVE APPLICATION</div>
                        </div>
                    </div>
                </div>
              </div>  
    		);
    	}else{
    			return (
        	  <div className="row clearfix">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                       <a href="#employee" onClick={this.showEmployeeManagement.bind(this)}>	
	                        <div className="icon">
	                            <i className="material-icons">people_outline</i>
	                        </div>
                       </a>  
                        <div className="content">
                            <div className="text">EMPLOYEE MANAGEMENT</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-cyan hover-expand-effect">
                       <a href="#employee" onClick={this.showLeaveManagement.bind(this)}>	
	                        <div className="icon">
	                            <i className="material-icons">assignment_late</i>
	                        </div>
                        </a>
                        <div className="content">
                            <div className="text">LEAVE MANAGEMENT</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-light-green hover-expand-effect">
                      <a href="#search_employee">
                        <div className="icon">
                            <i className="material-icons">search</i>
                        </div>
                      </a>    
                        <div className="content">
                            <div className="text">SEARCH</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-orange hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">attach_money</i>
                        </div>
                        <div className="content">
                            <div className="text">PAYROLL AND PAYSLIP</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    	}
    }
}    			 