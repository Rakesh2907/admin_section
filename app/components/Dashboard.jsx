import React from 'react';
import Navigation from 'Navigation';
import LeftSideBar from 'LeftSideBar';
import SearchBar from 'SearchBar';
import DashboadContent from 'DashboadContent';
import getRouteHandlerBaseUrl  from './helper/js/get-route-handler-base-url';

class Dashboard extends React.Component 
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
              type: 'POST',
              success: function(resdata) {
                resdata.is_admin = 1;
                if(resdata.is_admin){
                	this.setState({isAdmin:1});
                    window.location.href = '#/dashboard';
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
				  	 <DashboadContent/>
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

export default Dashboard;