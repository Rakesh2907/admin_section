import React from 'react';
import CountTo from 'react-count-to';


export default class DashboardFirstRow extends React.Component
{
        constructor(props) 
        {
            super(props);

            this.state = {
              counts: {
                  students: 0,
                  teachers: 0,
                  parents: 0,
                  visitor: 0  
              }
            };
        }
        
        componentDidMount() 
        {
            this.fetchCount();
        }

       fetchCount()
       {
            var that = this;
            $.get({
                url: 'http://localhost/school_product/admin_con/dashboard_count',
                type: 'GET',
                dataType: 'json',
                headers: {
                        "Content-Type":"text/plain; charset=utf-8", 
                        "Accept": "*", 
                        "Accept-Language":"es-ES,es;q=0.8"
                },   
                success: function(res) 
                { 
                    that.setState({
                            counts: res.counts
                    });
                },
                error: function() { console.log('Failed!'); }
            });
       }

		 render(){
        	return (
        	  <div className="row clearfix">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">playlist_add_check</i>
                        </div>
                        <div className="content">
                            <div className="text">STUDENT</div>
                            <CountTo className="number" to={this.state.counts.students} speed={1000} delay={20}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-cyan hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">help</i>
                        </div>
                        <div className="content">
                            <div className="text">TEACHER</div>
                            <CountTo className="number" to={this.state.counts.teachers} speed={1000} delay={20}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-light-green hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">forum</i>
                        </div>
                        <div className="content">
                            <div className="text">PARENTS</div>
                            <CountTo className="number" to={this.state.counts.parents} speed={1000} delay={20}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-orange hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">person_add</i>
                        </div>
                        <div className="content">
                            <div className="text">NEW VISITORS</div>
                            <CountTo className="number" to={this.state.counts.visitor} speed={1000} delay={20}/>
                        </div>
                    </div>
                </div>
            </div>
        	);
         }
}