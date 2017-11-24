import React from 'react';
import Navigation from 'Navigation';
import LeftSideBar from 'LeftSideBar';
import SearchBar from 'SearchBar';

class Main extends React.Component 
{
	  constructor(props) {
   			 super(props);
   	}
    
    render(){
      let leftpanal;

      if(this.props.location.pathname=='/'){
          leftpanal = (<div></div>);
      }else{
          leftpanal = (
             <div>
              <SearchBar />
                <Navigation />
                <section>
                  <LeftSideBar currentPath={this.props.location.pathname}/> 
                </section>
             </div>    
          );
      }
        return (
              <div>
                {leftpanal}
                {this.props.children}
              </div>
        );
      }   
}

export default Main;