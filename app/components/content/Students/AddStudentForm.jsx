import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {Step,Stepper,StepLabel,StepButton} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CandidateForm from 'CandidateForm';
import CourseBatch from 'CourseBatch';
import StudentFather from 'StudentFather';
import StudentMother from 'StudentMother';
import StudentDocuments from 'StudentDocuments';
import StudentFees from 'StudentFees';
import StudentStatus from 'StudentStatus';

export default class AddStudentForm extends React.Component
{
	constructor(props) 
    {
    	super(props);
    	this.state = {
    		finished: false,
    		stepIndex: 0,
    		Students: props.Students
  		}
  		this.close = this.close.bind(this);
    }

    close = () => {
    	location.href='#students';
    }
  	handleNext = () => {
    	const {stepIndex} = this.state;
	    this.setState({
	      stepIndex: stepIndex + 1,
	      finished: stepIndex >= 6,
	    });
    }
	handlePrev = () => {
	    const {stepIndex} = this.state;
	    if (stepIndex > 0) {
	      this.setState({stepIndex: stepIndex - 1});
	    }
	}

   getChildContext() {
	    return {
	      muiTheme: getMuiTheme(darkBaseTheme)
	    };
   }
   getStepAddContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return  <CandidateForm />;
      case 1:
        return  <CourseBatch />;   
      case 2:
        return  <StudentFather />;
      case 3:
        return  <StudentMother />;
      case 4:
        return  <StudentDocuments />;
      case 5:
        return 	<StudentFees />;           
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
  getStepEditContent(stepIndex){
	  	switch (stepIndex) {
	      case 0:
	        return  <CandidateForm Students={this.props.Students}/>;
	      case 1:
	        return  <CourseBatch Students={this.props.Students}/>;   
	      case 2:
	        return  <StudentFather Students={this.props.Students}/>;
	      case 3:
	        return  <StudentMother Students={this.props.Students}/>;
	      case 4:
	        return  <StudentDocuments Students={this.props.Students}/>;
	      case 5:
	        return 	<StudentFees Students={this.props.Students}/>;
	      case 6: 	
	      	return	<StudentStatus Students={this.props.Students}/>;           
	      default:
	        return 'You\'re a long way from home sonny jim!';
	    }
  }
  componentDidMount(){
  		sessionStorage.clear();
  }
  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    let mynext = 'next_button_'+stepIndex;
    let myback = 'back_button_'+stepIndex;

    if (typeof this.props.Students['student_id'] == 'undefined'){
    	return (
		      <div className="card">
			        <div className="header">
			          	<h2>ADD STUDENT</h2>
			          	<a onClick={this.close} href="javascript:void(0)" style={{float:'right',position: 'relative',bottom:'22px'}}><i className="material-icons">close</i></a>
			        </div>  
			        <div className="body">
					        <Stepper activeStep={stepIndex}>
					          <Step>
					            <StepLabel>Candidate Details</StepLabel>
					          </Step>
					          <Step>
					            <StepLabel>Class & Batch details</StepLabel>
					          </Step>
					          <Step>
					            <StepLabel>Father Details</StepLabel>
					          </Step>
					          <Step>
					            <StepLabel>Mother Details</StepLabel>
					          </Step>
					          <Step>
					            <StepLabel>Upload Documents</StepLabel>
					          </Step>
					          <Step>
					            <StepLabel>Fees</StepLabel>
					          </Step>
					        </Stepper>
						        <div style={contentStyle}>
						          {finished ? (
						            <p>
						              <a
						                href="#"
						                onClick={(event) => {
						                  event.preventDefault();
						                  this.setState({stepIndex: 0, finished: false});
						                }}
						              >
						                Add New
						              </a>
						            </p>
						          ) : (
						            <div>
						              {this.getStepAddContent(stepIndex)}
						              <div style={{marginTop: 12}}>
						                <FlatButton
						                  label="Back"
						                  disabled={stepIndex === 0}
						                  onClick={this.handlePrev}
						                  style={{marginRight: 12,display:"none"}}
						                  id={myback}
						                />
						                <RaisedButton
						                  label={stepIndex === 6 ? 'Finish' : 'Next'}
						                  primary={true}
						                  onClick={this.handleNext}
						                  style={{display:"none"}}
						                  id={mynext}
						                />
						              </div>
						            </div>
						          )}
						        </div>
			        </div> 
		      </div> 
    	);
    }else{
    	return(
    		  <div className="card">
			        <div className="header">
			          	<h2>EDIT STUDENT</h2>
			          	 <a onClick={this.props.close} href="javascript:void(0)" style={{float:'right',position: 'relative',bottom:'22px'}}><i className="material-icons">close</i></a>
			        </div>  
			        <div className="body">
					        <Stepper linear={false} activeStep={stepIndex}>
					          <Step>
					          	<StepButton onClick={() => this.setState({stepIndex: 0})}>Candidate Details</StepButton>	
					          </Step>
					          <Step>
					          	<StepButton onClick={() => this.setState({stepIndex: 1})}>Class & Batch details</StepButton>	
					          </Step>
					          <Step>
						          <StepButton onClick={() => this.setState({stepIndex: 2})}>Father Details</StepButton>	   	
					          </Step>
					          <Step>
					          	<StepButton onClick={() => this.setState({stepIndex: 3})}>Mother Details</StepButton>	
					          </Step>
					          <Step>
					          	<StepButton onClick={() => this.setState({stepIndex: 4})}>Upload Documents</StepButton>
					          </Step>
					          <Step>
					          	<StepButton onClick={() => this.setState({stepIndex: 5})}>Fees</StepButton>
					          </Step>
					          <Step>
					          	<StepButton onClick={() => this.setState({stepIndex: 6})}>Current Status</StepButton>
					          </Step>
					        </Stepper>
						        <div style={contentStyle}>
						          {finished ? (
						            <p>
						              <a
						                href="#"
						                onClick={(event) => {
						                  event.preventDefault();
						                  this.setState({stepIndex: 0, finished: false});
						                }}
						              >
						                Add New
						              </a>
						            </p>
						          ) : (
						            <div>
						              {this.getStepEditContent(stepIndex)}
						              <div style={{marginTop: 12}}>
						                <FlatButton
						                  label="Back"
						                  disabled={stepIndex === 0}
						                  onClick={this.handlePrev}
						                  style={{marginRight: 12,display:"none"}}
						                  id={myback}
						                />
						                <RaisedButton
						                  label={stepIndex === 5 ? 'Finish' : 'Next'}
						                  primary={true}
						                  onClick={this.handleNext}
						                  style={{display:"none"}}
						                  id={mynext}
						                />
						              </div>
						            </div>
						          )}
						        </div>
			        </div> 
		      </div> 
    	);
    }


    
  }		
}

AddStudentForm.childContextTypes = {
  muiTheme: React.PropTypes.object
};