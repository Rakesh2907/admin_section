import React from 'react';
import {Link, IndexLink} from 'react-router';


class Navigation extends React.Component 
{
      showSearchBar(value){
        $('.search-bar').addClass(value);
        $('.search-bar').find('input[type="text"]').focus();
      }
      
      render(){
        return (
              <nav className="navbar">
                  <div className="container-fluid">
                    <div className="navbar-header">
                              <a href="javascript:void(0);" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                              <a href="javascript:void(0);" className="bars"></a>
                              <Link to="/dashboard" className="navbar-brand">ADMIN SCHOOL</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                       <ul className="nav navbar-nav navbar-right">
                          <li><a href="javascript:void(0);" className="js-search" data-close="true" onClick={this.showSearchBar.bind(this, 'open')}><i className="material-icons">search</i></a></li>
                       </ul>
                    </div>
                  </div>
              </nav>
        );
      }
}

export default Navigation;