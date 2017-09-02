import React from 'react';
import Navigation from 'Navigation';
import LeftSideBar from 'LeftSideBar';
import SearchBar from 'SearchBar';
import getRouteHandlerBaseUrl  from './helper/js/get-route-handler-base-url';
import AddTeachersForm from './content/Teachers/AddTeachersForm';
import TeachersListing from './content/Teachers/TeachersListing';

class Teachers extends React.Component 
{
	constructor(props) {
   			 super(props);
   			 this.state = {
   			 	isAdmin : 0
   			 }
   			 this.loadTeachersComponent = this.loadTeachersComponent.bind(this);
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
                resdata.is_admin = 1;
                if(resdata.is_admin){
                	this.setState({isAdmin:1});
                    window.location.href = '#/teachers';
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
    loadTeachersComponent()
    {
    	if(this.props.location.pathname == '/teachers')
    	{
    		return <TeachersListing />
    	}else if(this.props.location.pathname == '/add_teacher'){
    		return <AddTeachersForm />
    	}	
    }

	render(){
	  if(this.state.isAdmin)
	   {
			return (
			   <div>
			      <SearchBar />
				  <Navigation />
				  <section>
				  	<LeftSideBar currentPath={this.props.location.pathname}/>	
				  </section>
				  <section className="content">
				    	<div className="container-fluid">
							<div className="block-header">
	                			<h2>Teachers Manager</h2>
	            			</div>
	            			{this.loadTeachersComponent()}
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

export default Teachers;