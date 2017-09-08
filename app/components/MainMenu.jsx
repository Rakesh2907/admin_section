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
 				conditionClass:false,
 				conditionDashboard:false
   			 }

   			 this.handleClick = this.handleClick.bind(this);
   	    }		 
   	    componentWillReceiveProps(props){

   	    }
		handleClick(value)
		{	
			if(value === 'applicant')
			{
				this.setState({
						 conditionApplicant : !this.state.conditionApplicant,
						 conditionStudents : false,
						 conditionTeachers : false,
						 conditionClass : false,
						 conditionDashboard : false
				});
			}else if(value === 'student')
			{
				this.setState({
						conditionApplicant : false,
						conditionTeachers : false,
						conditionClass : false,
						conditionStudents : !this.state.conditionStudents,
						conditionDashboard : false
				});
			}else if(value === 'teacher')
			{
				this.setState({
						conditionApplicant : false,
						conditionTeachers : !this.state.conditionTeachers,
						conditionStudents : false,
						conditionClass : false,
						conditionDashboard : false
				});
			}else if(value === 'classes'){
				this.setState({
					conditionApplicant : false,
					conditionTeachers : false,
					conditionStudents : false,
					conditionClass : !this.state.conditionClass,
					conditionDashboard : false
				});
			}else if(value === 'dashboard'){
				 this.setState({
					conditionApplicant : false,
					conditionTeachers : false,
					conditionStudents : false,
					conditionClass : false,
					conditionDashboard : !this.state.conditionDashboard
				 });
			}	
			
		}
		
		render(){
		 var myStyle = {
				paddingLeft:'50px'
		   }
		   //alert(this.props.currentPath);
        	return (
        		<div className="menu">
        			<ul className="list">
                    	<li className="header">MAIN NAVIGATION</li>
	                    <li className={this.props.currentPath == '/dashboard' ? "active" :""}>
	                        <Link to="/dashboard" onClick={this.handleClick.bind(this, 'dashboard')}>
	                            <i className="material-icons">home</i>
	                            <span>DASHBOARD</span>
	                        </Link>
	                    </li>
	                    <li className={this.props.currentPath == '/applications' ? "active" :""}>
	                        <Link to="/applications" onClick={this.handleClick.bind(this, 'applicant')}>
	                            <i className="material-icons">layers</i>
	                            <span>ADMISSIONS</span>
	                        </Link>
	                    </li>
	                    <li className={this.props.currentPath == '/students' || this.props.currentPath == '/add_student' || this.props.currentPath == '/del_student'? "active" :""}>
	                        <Link to="/students" className={this.state.conditionStudents ? "menu-toggle toggled" :"menu-toggle"} onClick={this.handleClick.bind(this, 'student')}>
	                            <i className="material-icons">group</i>
	                            <span>STUDENTS</span>
	                        </Link>
	                        <ul className={this.state.conditionStudents ? "ml-menu myblock" :"ml-menu mynone"}>
	                        	<Link to="/add_student" style={myStyle}>
	                            	<span>Add New</span>
	                        	</Link>
	                        	<Link to="/del_student" style={myStyle}>
	                            	<span>Deleted Students</span>
	                        	</Link>
	                        </ul>
	                    </li>
	                    <li className={this.props.currentPath == '/teachers' || this.props.currentPath == '/add_teacher'? "active" :""}>
	                        <Link to="/teachers" className={this.state.conditionTeachers ? "menu-toggle toggled" :"menu-toggle"} onClick={this.handleClick.bind(this, 'teacher')}>
	                            <i className="material-icons">people_outline</i>
	                            <span>TEACHERS</span>
	                        </Link>
	                        <ul className={this.state.conditionTeachers ? "ml-menu myblock" :"ml-menu mynone"}>
	                        	<Link to="/add_teacher" style={myStyle}>
	                            	<span>Add Teacher</span>
	                        	</Link>
	                        </ul>
	                    </li>
	                    <li className={this.props.currentPath == '/parents' ? "active" :""}>
	                        <Link to="/parents">
	                            <i className="material-icons">person</i>
	                            <span>PARENTS</span>
	                        </Link>
	                    </li>
	                    <li className={this.props.currentPath == '/class' ? "active" :""}>
	                        <Link to="/class" className={this.state.conditionClass ? "menu-toggle toggled" :"menu-toggle"} onClick={this.handleClick.bind(this, 'classes')}>
	                            <i className="material-icons">class</i>
	                            <span>CLASS</span>
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
	                    <li className={this.props.currentPath == '/subjects' ? "active" :""}>
	                    	<Link to="/subjects">
	                    		<i className="material-icons">subject</i>
	                            <span>SUBJECTS</span>
	                    	</Link>
	                    </li>
	                    <li className={this.props.currentPath == '/fees' ? "active" :""}>
	                    	<Link to="/fees">
	                    		<i className="material-icons">payment</i>
	                            <span>FEES</span>
	                    	</Link>
	                    </li>
	                    <li className={this.props.currentPath == '/attendance' ? "active" :""}>
	                    	<Link to="/attendance">
	                    		<i className="material-icons">format_list_bulleted</i>
	                            <span>ATTENDANCE</span>
	                    	</Link>
	                    </li>
	                    <li className={this.props.currentPath == '/exam' ? "active" :""}>
	                    	<Link to="/exam">
	                    		<i className="material-icons">assignment</i>
	                            <span>EXAM</span>
	                    	</Link>
	                    </li>
	                    <li className={this.props.currentPath == '/library' ? "active" :""}>
	                    	<Link to="/library">
	                    		<i className="material-icons">account_balance</i>
	                            <span>LIBRARY</span>
	                    	</Link>
	                    </li>
	                    <li className={this.props.currentPath == '/accounting' ? "active" :""}>
	                    	<Link to="/accounting">
	                    		<i className="material-icons">account_balance_wallet</i>
	                            <span>ACCOUNTING</span>
	                    	</Link>
	                    </li>
	                    <li className={this.props.currentPath == '/transport' ? "active" :""}>
	                    	<Link to="/transport">
	                    		<i className="material-icons">directions_bus</i>
	                            <span>TRANSPORT</span>
	                    	</Link>
	                    </li>
	                    <li className={this.props.currentPath == '/notice' ? "active" :""}>
	                    	<Link to="/notice">
	                    		<i className="material-icons">chrome_reader_mode</i>
	                            <span>NOTICE BOARD</span>
	                    	</Link>
	                    </li>
	                    <li className={this.props.currentPath == '/help' ? "active" :""}>
	                    	<Link to="/help">
	                    		<i className="material-icons">help_outline</i>
	                            <span>HELP</span>
	                    	</Link>
	                    </li>
	                 </ul>   
        		</div>
        	);
        }
}

export default MainMenu;