import React from 'react';

class Login extends React.Component 
{
    constructor(props) {
            super(props);
    }        

	componentWillMount(){
    	document.getElementById('admin_body').className='login-page'
    }
    
    handleSubmit(event)
    {
          event.preventDefault();
          $.ajax({
              url: base_url+'admin_con/login',
              dataType: 'json',
              type: 'POST',
              data: $('#sign_in').serialize(),
              success: function(resdata) {
                if(resdata.is_admin){
                   swal({
                      title: "Login successfully...",
                      type: "success",
                      confirmButtonClass: 'btn-success',
                      confirmButtonText: 'Okay'
                    }, function() {
                            window.location.href = '#/dashboard';
                    });
                }else{
                    swal({
                       title: 'Wrong Username/Password.Please try again...!',
                       type: "error",
                       confirmButtonClass: 'btn-success',
                       confirmButtonText: 'Okay'
                    })
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)
          });
    }
	render(){
		return (
		   <div className="login-box">	
				 <div className="logo">
            		<a href="javascript:void(0);">Admin<b>School</b></a>
            		<small>Admin BootStrap Based - Material Design</small>
        		 </div>
        		 <div className="card">
            		<div className="body">
            			<form id="sign_in" method="POST" onSubmit={this.handleSubmit}>
            				<div className="msg">Sign in to start your session</div>
            				<div className="input-group">
            					<span className="input-group-addon">
                            		<i className="material-icons">person</i>
                        		</span>
                        		<div className="form-line">
                            		<input type="text" class="form-control" name="username" placeholder="Username" required autofocus />
                        		</div>
            				</div>
            				<div className="input-group">
            					<span className="input-group-addon">
                            		<i className="material-icons">lock</i>
                        		</span>
		                        <div className="form-line">
		                            <input type="password" className="form-control" name="password" placeholder="Password" required />
		                        </div>
            				</div>
            				<div className="row">
		                         <div className="col-xs-4">
		                            <button className="btn btn-block bg-pink waves-effect" type="submit">LOGIN</button>
		                         </div>
            				</div>
            			</form>	
            		</div>
            	 </div>	
		   </div>	
		);
	}
}

export default Login;