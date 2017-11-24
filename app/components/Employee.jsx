import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getRouteHandlerBaseUrl  from './helper/js/get-route-handler-base-url';
import EmployeeTabs from './content/Employee/EmployeeTabs';
import EmployeeListing from './content/Employee/EmployeeListing';
import EmployeeDashboard from './content/Employee/EmployeeDashboard';
import EmployeeAttendance from './content/Employee/EmployeeAttendance';
import MenuItem from 'material-ui/MenuItem';


var categories = [];
var departments = [];
export default class Employee extends React.Component 
{
	constructor(props) {
   			 super(props);
   			 this.state = {
   			 	isAdmin : 0,
          categoryInfo: [],
          departmentInfo: [],
   			 }
   			 this.loadEmployeeComponent = this.loadEmployeeComponent.bind(this);
   	}		 
	 componentDidMount(){
    	document.getElementById('admin_body').className='theme-red';
    	this._baseUrl = getRouteHandlerBaseUrl(this.props);
      this.getCategories();
      this.getDepartments();
   }
   getCategories(){
        categories = [];
        $.ajax({
                  type: 'POST',
                  url: base_url+'employee_con/get_categories',
                  dataType:'json',
                  success: function (resdata) {
                    if(resdata.length > 0)
                    {
                        for(var i = 0;i < resdata.length;i++)
                        {
                            categories.push(<MenuItem value={resdata[i]['category_id']} primaryText={resdata[i]['category_name']} />)
                        }
                        this.setState({categoryInfo:categories});
                    }
                   }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                  }.bind(this)
        });
     }

    getDepartments(){
        departments = [];
         $.ajax({
                  type: 'POST',
                  url: base_url+'employee_con/get_departments',
                  dataType:'json',
                  success: function (resdata) {
                    if(resdata.length > 0)
                    {
                        for(var i = 0;i < resdata.length;i++)
                        {
                            departments.push(<MenuItem value={resdata[i]['department_id']} primaryText={resdata[i]['department_name']} />)
                        }
                        this.setState({departmentInfo:departments});
                    }
                   }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                  }.bind(this)
             });
     }
   componentWillMount(){
        $.ajax({
              url: base_url+'admin_con/check_login',
              dataType: 'json',
              success: function(resdata) {
                resdata.is_admin = 1;
                if(resdata.is_admin){
                	this.setState({isAdmin:1});
                    window.location.href = '#/employee';
                }else{
                	this.setState({isAdmin:0});
                    window.location.href = '#/';
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)
          });
    }
    loadEmployeeComponent()
    {
    	if(this.props.location.pathname == '/employee')
    	{
          return <EmployeeDashboard />
    	}else if(this.props.location.pathname == '/search_employee'){
          return <EmployeeListing  categoryInfo={this.state.categoryInfo} departmentInfo={this.state.departmentInfo} />
      }else if(this.props.location.pathname == '/add_employee'){
    		  return <EmployeeTabs categoryInfo={this.state.categoryInfo} departmentInfo={this.state.departmentInfo} />
    	}else if(this.props.location.pathname == '/employee_attendance'){
          return <EmployeeAttendance departmentInfo={this.state.departmentInfo}/>
      }	
    }
    getChildContext() {
        return {
          muiTheme: getMuiTheme(darkBaseTheme)
        };
    }
	render(){
	  if(this.state.isAdmin)
	  {
			return (
			   <div>
				  <section className="content">
				    	<div className="container-fluid">
							       <div className="block-header">
	                			<h2>Human Resource Management</h2>
	            			</div>
	            			{this.loadEmployeeComponent()}
						  </div>
				  </section>
			   </div>	
			);
	   }else{
	   		return (
			   <div></div>
			); 
	   }		
	}
}


Employee.childContextTypes = {
  muiTheme: React.PropTypes.object
};