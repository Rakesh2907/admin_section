import React from 'react';
import DashboardCalender from 'DashboardCalender';

class DashboardSecondRow extends React.Component
{
		 render(){
        	return (
        	<div className="row clearfix">       
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <div className="card">
                        <div className="body bg-teal">
                            <div className="font-bold m-b--35">ANSWERED TICKETS</div>
                            <ul className="dashboard-stat-list">
                                <li>
                                    TODAY
                                    <span className="pull-right"><b>12</b> <small>TICKETS</small></span>
                                </li>
                                <li>
                                    YESTERDAY
                                    <span className="pull-right"><b>15</b> <small>TICKETS</small></span>
                                </li>
                                <li>
                                    LAST WEEK
                                    <span className="pull-right"><b>90</b> <small>TICKETS</small></span>
                                </li>
                                <li>
                                    LAST MONTH
                                    <span className="pull-right"><b>342</b> <small>TICKETS</small></span>
                                </li>
                                <li>
                                    LAST YEAR
                                    <span className="pull-right"><b>4 225</b> <small>TICKETS</small></span>
                                </li>
                                <li>
                                    ALL
                                    <span className="pull-right"><b>8 752</b> <small>TICKETS</small></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-8">
                    <DashboardCalender />
                </div>     
            </div>
        	);
         }
}

export default DashboardSecondRow;