import React from 'react';
import ApplicationTableListing from './content/Applications/ApplicationTableListing';

class ApplicationsContent extends React.Component
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
                			<h2>Applicant Manager</h2>
            			</div>
            			<ApplicationTableListing />
					</div>
			);
	}
}

export default ApplicationsContent;