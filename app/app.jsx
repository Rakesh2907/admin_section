import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Main from 'Main';
import Dashboard from 'Dashboard';
import Applications from 'Applications';
import Login from 'Login';
import Students from 'Students';
import Employee from 'Employee';
import Parents from 'Parents';
import Classes from 'Classes';
import Subjects from 'Subjects';
import Fees from 'Fees';
import Attendance from 'Attendance';
import Exam from 'Exam';
import Library from 'Library';
import Accounting from 'Accounting';
import Transport from 'Transport';
import Notice from 'Notice';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
	   <Route path="dashboard" component={Dashboard}/>
	   <Route path="applications" component={Applications}/>
	   <Route path="students" component={Students}/>
	   <Route path="add_student" component={Students}/>
	   <Route path="del_student" component={Students}/>
	   <Route path="employee" component={Employee}/>
	   <Route path="add_employee" component={Employee}/>
	   <Route path="search_employee" component={Employee}/>
	   <Route path="employee_attendance" component={Employee}/>
	   <Route path="parents" component={Parents}/>
	   <Route path="class" component={Classes}/>
	   <Route path="subjects" component={Subjects}/>
	   <Route path="fees" component={Fees}/>
	   <Route path="attendance" component={Attendance}/>
	   <Route path="exam" component={Exam}/>
	   <Route path="library" component={Library}/>
	   <Route path="accounting" component={Accounting}/>
	   <Route path="transport" component={Transport}/>
	   <Route path="notice" component={Notice}/>
	   <IndexRoute component={Login}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
