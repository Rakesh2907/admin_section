import React from 'react';
import getRouteHandlerBaseUrl  from './helper/js/get-route-handler-base-url';

export default class Transport extends React.Component 
{
	constructor(props) {
   			 super(props);
   			 this.state = {
   			 	isAdmin : 0
   			 }
   	}		 
	componentDidMount(){
    	document.getElementById('admin_body').className='theme-red';
    	this._baseUrl = getRouteHandlerBaseUrl(this.props);
    }
    componentWillMount(){
        $.ajax({
              url: base_url+'admin_con/check_login',
              dataType: 'json',
              success: function(resdata) {
                resdata.is_admin = 1;
                if(resdata.is_admin){
                	this.setState({isAdmin:1});
                    window.location.href = '#/transport';
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
				  <section className="content">
				    	<div className="container-fluid">
							<div className="block-header">
	                			<h2>Transport Manager</h2>
	            			</div>
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