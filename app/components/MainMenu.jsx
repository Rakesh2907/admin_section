import React from 'react';
import {Link, IndexLink} from 'react-router';

class MainMenu extends React.Component
{
		
		constructor(props) {
   			 super(props);

   			 this.state = {
   			 	conditionApplicant:false,
   			 	conditionStudents:false,
 				conditionTeachers:false,
 				conditionClass:false
   			 }

   			 this.handleClick = this.handleClick.bind(this);
   	    }		 

		handleClick(value){
			if(value === 'applicant')
			{
				this.setState( { conditionApplicant : !this.state.conditionApplicant } );
				this.setState( { conditionStudents : false } );
				this.setState( { conditionTeachers : false } );
				this.setState( { conditionClass : false} );
			}else if(value === 'student')
			{
				this.setState( { conditionApplicant : false } );
				this.setState( { conditionTeachers : false } );
				this.setState( { conditionClass : false} );
				this.setState( { conditionStudents : !this.state.conditionStudents } );
			}else if(value === 'teacher')
			{
				this.setState( { conditionApplicant : false } );
				this.setState( { conditionTeachers : !this.state.conditionTeachers } );
				this.setState( { conditionStudents : false } );
				this.setState( { conditionClass : false} );
			}else if(value === 'classes'){
				this.setState( { conditionApplicant : false } );
				this.setState( { conditionTeachers : false } );
				this.setState( { conditionStudents : false } );
				this.setState( { conditionClass : !this.state.conditionClass} );
			}	
			
		}
		
		render(){
		 var myStyle = {
				paddingLeft:'50px'
		   }
        	return (
        		<div className="menu">
        			<ul className="list">
                    	<li className="header">MAIN NAVIGATION</li>
	                    <li className="active">
	                        <Link to="/dashboard">
	                            <i className="material-icons">home</i>
	                            <span>Home</span>
	                        </Link>
	                    </li>
	                    <li>
	                        <Link to="/applications">
	                            <i className="material-icons">layers</i>
	                            <span>Admissions</span>
	                        </Link>
	                    </li>
	                    <li>
	                        <Link to="/students" className={this.state.conditionStudents ? "menu-toggle toggled" :"menu-toggle"} onClick={this.handleClick.bind(this, 'student')}>
	                            <i className="material-icons">group</i>
	                            <span>Students</span>
	                        </Link>
	                        <ul className={this.state.conditionStudents ? "ml-menu myblock" :"ml-menu mynone"}>
	                        	<Link to="/add_students" style={myStyle}>
	                            	<span>Add Students</span>
	                        	</Link>
	                        </ul>
	                    </li>
	                    <li>
	                        <Link to="/teachers" className={this.state.conditionTeachers ? "menu-toggle toggled" :"menu-toggle"} onClick={this.handleClick.bind(this, 'teacher')}>
	                            <i className="material-icons">people_outline</i>
	                            <span>Teachers</span>
	                        </Link>
	                        <ul className={this.state.conditionTeachers ? "ml-menu myblock" :"ml-menu mynone"}>
	                        	<Link to="/add_teacher" style={myStyle}>
	                            	<span>Add Teacher</span>
	                        	</Link>
	                        </ul>
	                    </li>
	                    <li>
	                        <Link to="/parents">
	                            <i className="material-icons">person</i>
	                            <span>Parents</span>
	                        </Link>
	                    </li>
	                    <li>
	                        <Link to="/class" className={this.state.conditionClass ? "menu-toggle toggled" :"menu-toggle"} onClick={this.handleClick.bind(this, 'classes')}>
	                            <i className="material-icons">class</i>
	                            <span>Class</span>
	                        </Link>
	                        <ul className={this.state.conditionClass ? "ml-menu myblock" :"ml-menu mynone"}>
	                        	<Link to="/manage_class" style={myStyle}>
	                            	<span>Class Manager</span>
	                        	</Link>
	                        	<Link to="/manage_section" style={myStyle}>
	                            	<span>Section Manager</span>
	                        	</Link>
	                        </ul>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">subject</i>
	                            <span>Subject</span>
	                    	</Link>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">class</i>
	                            <span>Class Routine</span>
	                    	</Link>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">format_list_bulleted</i>
	                            <span>Attendance</span>
	                    	</Link>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">assignment</i>
	                            <span>Exam</span>
	                    	</Link>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">account_balance</i>
	                            <span>Library</span>
	                    	</Link>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">account_balance_wallet</i>
	                            <span>Accounting</span>
	                    	</Link>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">directions_bus</i>
	                            <span>Transport</span>
	                    	</Link>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">chrome_reader_mode</i>
	                            <span>Notice Board</span>
	                    	</Link>
	                    </li>
	                    <li>
	                    	<Link>
	                    		<i className="material-icons">help_outline</i>
	                            <span>Help</span>
	                    	</Link>
	                    </li>
	                 </ul>   
        		</div>
        	);
        }
}

export default MainMenu;