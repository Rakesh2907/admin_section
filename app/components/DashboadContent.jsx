import React from 'react';
import DashboardFirstRow from './content/Dashboard/DashboardFirstRow';
import DashboardSecondRow from './content/Dashboard/DashboardSecondRow';

class DashboadContent extends React.Component
{

	 constructor(props) {
   			 super(props);
    		 this.state = { /* initial state */ };
     }

    componentDidMount() {
      
    }

	 render(){
			return (
					<div className="container-fluid">
						<div className="block-header">
                			<h2>DASHBOARD</h2>
            			</div>
            			<DashboardFirstRow />
            			<DashboardSecondRow />
					</div>
			);
	}
}

export default DashboadContent;