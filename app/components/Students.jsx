import React from 'react';
import Navigation from 'Navigation';
import LeftSideBar from 'LeftSideBar';
import SearchBar from 'SearchBar';
import getRouteHandlerBaseUrl  from './helper/js/get-route-handler-base-url';
import AddStudentForm from './content/Students/AddStudentForm';

class Students extends React.Component 
{
	constructor(props) {
   			 super(props);
   			 this.state = {
   			 	isAdmin : 0
   			 }
   	}		 
	componentDidMount()
	{
    	document.getElementById('admin_body').className='theme-red';
    	this._baseUrl = getRouteHandlerBaseUrl(this.props);
    }
    componentWillMount()
    {
        $.ajax({
              url: base_url+'admin_con/check_login',
              dataType: 'json',
              success: function(resdata) {
                if(resdata.is_admin){
                	this.setState({isAdmin:1});
                    window.location.href = '#/students';
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
	render(){
	 if(this.state.isAdmin)
	 {	
		return (
		   <div>
		      <SearchBar />
			  <Navigation />
			  <section>
			  	<LeftSideBar/>	
			  </section>
			  <section className="content">
			    	<div className="container-fluid">
						<div className="block-header">
                			<h2>Student Manager</h2>
            			</div>
            			<AddStudentForm />
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

export default Students;