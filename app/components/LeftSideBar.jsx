import React from 'react';
import ProfileNavigation from './admin_profile/ProfileNavigation';
import MainMenu from 'MainMenu';
import CopyRight from 'CopyRight';

class LeftSideBar extends React.Component 
{
      render(){
        return (
              <aside id="leftsidebar" className="sidebar">
                  <ProfileNavigation />
                  <MainMenu />
                  <CopyRight />
              </aside>
        );
      }
}

export default LeftSideBar;