import { _ } from 'underscore';
import React from 'react';
import Input from '../fields/Input';
import Radio from '../fields/Radio';
import SweetAlert from 'react-bootstrap-sweetalert';
import DatePicker from 'react-bootstrap-date-picker';

export default class AddTeachersForm extends React.Component {

  constructor(props) {
    super(props);
    var value = new Date().toISOString();
    this.state = {
    	value: value
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);

    //this.onConfirm = this.onConfirm.bind(this);
    //this.changeInput = this.changeInput.bind(this);
    //this.components = {};
  }
  componentDidMount() 
  {
  		
  }
  loadSweetAlertComponent()
  {
  		alert('Saved...');
  		location.href = '#/teachers';
  }
  handleChangeDate(value)
  {
  		 this.setState({
      		date: value
    	 });
  }
  handleSubmit(event)
  {
  		event.preventDefault();
  		$.ajax({
  			url: 'http://localhost/school_product/admin_con/add_teacher',
      		dataType: 'json',
      		type: 'POST',
      		data: $('#teacher_form').serialize(),
      		success: function(resdata) {
        		if(resdata.success){
        			
        			{this.loadSweetAlertComponent()}
        			
        		}
      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error(err.toString());
      		}.bind(this)	
  		});
  }

  render(){
			return (
				<div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="card">
                        <div className="header">
                            <h2>ADD TEACHER</h2>
                            <ul className="header-dropdown m-r--5">
                                <li className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i className="material-icons">more_vert</i>
                                    </a>
                                    <ul className="dropdown-menu pull-right">
                                        <li><a href="javascript:void(0);">Action</a></li>
                                        <li><a href="javascript:void(0);">Another action</a></li>
                                        <li><a href="javascript:void(0);">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="body">
                            <form id="teacher_form" onSubmit={this.handleSubmit}>
                                <div className="form-group form-float">
                                        <Input
                                            labelname='Teacher Name'
                                        	textname='teacher_name'
                                        	texttype='text'
          									required={true}
          								 />
                                </div>
                                <div className="form-group form-float">
                                		<DatePicker placeholder="Birth Date" id="example-datepicker" dateFormat="YYYY/MM/DD" name="teacher_dob" value={this.state.date} required onChange={this.handleChangeDate}/>
                                </div>
                                <div className="form-group form-float">
                                        <Input
                                           labelname='Email'
                                           textname='teacher_email'
                                           texttype='email'
          								   required={true}
          								 />
                                </div>
                                <div className="form-group form-float">
                                      	<Input
                                           labelname='Mobile'
                                           textname='teacher_mobile'
                                           texttype='text'
          								   required={true}
          								 />
                                </div>
                                <div className="form-group">
                                		<Radio
                                		   radioname='teacher_gender'
                                		   radioid='male' 
                                		   radiolabel='Male'
                                		   checked={true}
                                		   radiovalue='male'
                                		/>
                                		<Radio
                                		   radioname='teacher_gender'
                                		   radioid='female'
                                		   radiolabel='Female' 
                                		   checked={false}
                                		   radiovalue='female'
                                		/>
                                </div>
                                <div className="form-group form-float">
                                    <div className="form-line">
                                        <textarea name="teacher_address" cols="30" rows="5" className="form-control no-resize" required></textarea>
                                        <label className="form-label">Address</label>
                                    </div>
                                </div>
                                <div className="form-group form-float">
                                		<Input
                                           labelname='Religion'
                                           textname='teacher_religion'
                                           texttype='text'
          								   required={true}
          								 />
                                </div>
                                <div className="form-group form-float">
                                	<Input
                                           labelname='Qualification'
                                           textname='teacher_qualification'
                                           texttype='text'
          								   required={true}
          							/>
                                </div>
                                <div className="form-group form-float">
                                	<Input
                                           labelname='Blood Group'
                                           textname='teacher_blood_group'
                                           texttype='text'
          								   required={true}
          							/>
                                </div>
                                <button className="btn btn-primary waves-effect" type="submit">SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
			);
	}
}