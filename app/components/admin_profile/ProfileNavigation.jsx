import React from 'react';

class ProfileNavigation extends React.Component
{
    
    constructor(props) {
            super(props);
            this.logout = this.logout.bind(this);
    }
    logout()
    {
          $.ajax({
                url: base_url+'admin_con/logout',
                dataType: 'json',
                type: 'POST',
                data: {},
                success: function(resdata) {

                  if(!resdata.is_admin)
                  {
                      window.location.href='#/'
                  }else{
                      window.location.href= '#/dashboard'
                  }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)  
          });
    }
	  render(){
        return (
              <div className="user-info">
               	<div className="image">
                    <img src="images/user.png" width="48" height="48" alt="User" />
                 </div>
                 <div className="info-container">
                    <div className="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Admin</div>
                    <div className="email">admin@example.com</div>
                    <div className="btn-group user-helper-dropdown">
                        <i className="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                        <ul className="dropdown-menu pull-right">
                            <li><a href="javascript:void(0);"><i className="material-icons">person</i>Profile</a></li>
                            <li role="seperator" className="divider"></li>
                            <li><a href="javascript:void(0);" onClick={this.logout}><i className="material-icons">input</i>Sign Out</a></li>
                        </ul>
                    </div>
                </div>
              </div>
        );
      }
}

export default ProfileNavigation;