import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm} from 'react-material-ui-form-validator';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {black500, blue500} from 'material-ui/styles/colors';

export default class CourseBatch extends React.Component 
{
	constructor(props) {
    	super(props);
    	this.state={
    		student_status:'pending'
    	}
    	this.handleStudentStatus = this.handleStudentStatus.bind(this);
    }
    handleStudentStatus(event,value){
    	this.setState({student_status:value});
    }
    handleSubmit(event){
    	event.preventDefault();
    	var status = this.state.student_status;
    	if(typeof this.props.Students!='undefined')
    	{
    		this.props.Students['status'] = status;
	    	$.ajax({
	                  type: 'POST',
	                  url: base_url+'students_con/set_student_status',
	                  data:{
	                  	student_status:status,
	                  	student_id:this.props.Students['student_id']
	                  },
	                  dataType: 'json',
	                  success: function (resdata) 
	                  {
	                      	swal({
                                	title: "Student Status Updated...",
                                	type: "success",
                                	confirmButtonClass: 'btn-success',
                                	confirmButtonText: 'Okay'
                            },function(){
                            		location.reload();
                            });
	                  }    
	               }); 
	    }               
    }
    componentDidMount(){
    	if(typeof this.props.Students!='undefined'){
    		if(this.props.Students['is_deleted'] == "1"){
    			this.setState({student_status:'is_deleted'});
    		}else{
    			this.setState({student_status:this.props.Students['status']});
    		}
        	
        }
    }
    render(){
    	const styles = {
    		floatingLabelStyle: {
    			color: black500,
  			},
  			radioButton: {
    		  marginTop:16,
    		  marginLeft:10,
              width: 'auto',
              display: 'inline-block',
              fill:black500
    	    }
  	    }		
    	return(
    	  <div>
    	  	<ValidatorForm id="myform6" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
    	  		<div className="row clearfix"> 
    	  			<div className="col-sm-6">      
	           			<RadioButtonGroup name="student_status" valueSelected={this.state.student_status} onChange={this.handleStudentStatus}>
	           					 <RadioButton
	                        		value="pending"
	                        		label="Pending"
	                        		style={styles.radioButton}
	                        		disabled={true}
	                        		labelStyle={styles.floatingLabelStyle}
	                     		 />
	             				 <RadioButton
	                        		value="completed"
	                        		label="Completed"
	                        		style={styles.radioButton}
	                        		labelStyle={styles.floatingLabelStyle}
	                     		 />
	                	   		 <RadioButton
	                        		value="former"
	                        		label="Former"
	                        		style={styles.radioButton}
	                        		labelStyle={styles.floatingLabelStyle}
	                     		/>
	                     		<RadioButton
	                        		value="is_deleted"
	                        		label="Deleted"
	                        		style={styles.radioButton}
	                        		labelStyle={styles.floatingLabelStyle}
	                     		/>
	           			</RadioButtonGroup>
                   </div>
    	  		</div>
    	  		<div className="row clearfix"> 
    	  		  <div className="col-sm-6">  
    	  		  	 <RaisedButton 
                  		style={{marginRight: 12}} 
                  		primary={true}
                  		type="submit"
                  		label="Save" 
              		 />
    	  		  </div>
    	  		</div>	
    	  	</ValidatorForm>
    	  </div>
    	);
    }
}    