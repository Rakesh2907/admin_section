import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import {Step,Stepper,StepLabel,StepButton} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import EmployeeGeneral from 'EmployeeGeneral';
import EmployeePersonal from 'EmployeePersonal';
import EmployeeContact from 'EmployeeContact';
import EmployeeDocuments from 'EmployeeDocuments';
import EmployeeBankInfo from 'EmployeeBankInfo';
import EmployeeAdditionalInfo from 'EmployeeAdditionalInfo';
import PayRoll from 'PayRoll';
import PaySlip from 'PaySlip';

export default class EmployeeTabs extends React.Component
{
	 constructor(props) {
          super(props);
          this.state = { 
          	finished: false,
            finished1: false,
    		    stepIndex: 0,
            stepIndex1: 0
          }
     }
     componentWillReceiveProps(props){
       // console.log(props.departmentInfo);
     }
     close = () => {
        location.href='#employee';
     }
     handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 5,
        });
     }

     handleNext1 = () => {
        const {stepIndex1} = this.state;
        this.setState({
          stepIndex1: stepIndex1 + 1,
          finished1: stepIndex1 >= 2,
        });
     }
      handlePrev = () => {
          const {stepIndex} = this.state;
          if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
          }
      }
      handlePrev1 = () => {
          const {stepIndex1} = this.state;
          if (stepIndex1 > 0) {
            this.setState({stepIndex1: stepIndex1 - 1});
          }
      }
     
     getStepAddContent(stepIndex){
        switch (stepIndex) {
          case 0:
            return  <EmployeeGeneral departmentInfo={this.props.departmentInfo} categoryInfo={this.props.categoryInfo}/>;

            case 1:
            return  <EmployeePersonal/>;

            case 2:
            return  <EmployeeContact/>;

            case 3:
            return  <EmployeeDocuments/>;

            case 4:
            return  <EmployeeBankInfo/>;

            case 5:
            return  <EmployeeAdditionalInfo/>;

            default:
            return 'You\'re a long way from home sonny jim!';
        }
     }
     getStepEditContent(stepIndex){
     		switch (stepIndex) {
     			case 0:
	        	return  <EmployeeGeneral EmployeeID={this.props.myemployeeId} employeeInfo={this.props.employeeInfo} departmentInfo={this.props.departmentInfo} categoryInfo={this.props.categoryInfo}/>;

	        	case 1:
	        	return  <EmployeePersonal EmployeeID={this.props.myemployeeId} employeeInfo={this.props.employeeInfo}/>;

	        	case 2:
	        	return  <EmployeeContact EmployeeID={this.props.myemployeeId} employeeInfo={this.props.employeeInfo}/>;

	        	case 3:
	        	return  <EmployeeDocuments EmployeeID={this.props.myemployeeId} employeeInfo={this.props.employeeInfo}/>;

            case 4:
            return  <EmployeeBankInfo EmployeeID={this.props.myemployeeId} employeeInfo={this.props.employeeInfo}/>;

            case 5:
            return  <EmployeeAdditionalInfo EmployeeID={this.props.myemployeeId} employeeInfo={this.props.employeeInfo}/>;

	        	default:
	        	return 'You\'re a long way from home sonny jim!';
     		}
     }

     getStepEditSalaryContent(stepIndex1){
          switch (stepIndex1) {
            case 0:
              return <PayRoll EmployeeID={this.props.myemployeeId} employeeInfo={this.props.employeeInfo}/>
            case 1:
              return <PaySlip EmployeeID={this.props.myemployeeId} employeeInfo={this.props.employeeInfo}/>
            default:
            return 'NOT SET';  
          }
     }

     componentDidMount(){
            sessionStorage.clear();
     }
     componentDidMount(){
     }
     render(){
     	const {finished, finished1, stepIndex, stepIndex1} = this.state;
     	const contentStyle = {margin: '0 16px'};
    	let mynext = 'next_button_'+stepIndex;
    	let myback = 'back_button_'+stepIndex;

      let mynext1 = 'next_button1_'+stepIndex1;
      let myback1 = 'next_button1_'+stepIndex1

      const styles = {
        headline: {
          fontSize: 24,
          paddingTop: 16,
          marginBottom: 12,
          fontWeight: 400,
        },
      };

     	if(this.props.myemployeeId)
     	{
     		return(
     			<div className="card">
			        <div className="header">
			          	<h2>EDIT EMPLOYEE</h2>
			          	 <a onClick={this.props.close} href="javascript:void(0)" style={{float:'right',position: 'relative',bottom:'22px'}}><i className="material-icons">close</i></a>
			        </div>  
			         <div className="body">
                 <Tabs value={this.state.value} onChange={this.handleChange}>
                  <Tab label="PROFILE" value="a">
                     <div>
    					        <Stepper linear={false} activeStep={stepIndex}>
    					          <Step>
    					          	<StepButton onClick={() => this.setState({stepIndex: 0})}>GENARAL DETAILS</StepButton>	
    					          </Step>
    					          <Step>
    					          	<StepButton onClick={() => this.setState({stepIndex: 1})}>PERSONAL DETAILS</StepButton>	
    					          </Step>
    					          <Step>
    						          <StepButton onClick={() => this.setState({stepIndex: 2})}>CONTACT DETAILS</StepButton>	   	
    					          </Step>
    					          <Step>
    					          	<StepButton onClick={() => this.setState({stepIndex: 3})}>UPLOAD DOCUMENTS</StepButton>
    					          </Step>
                        <Step>
                          <StepButton onClick={() => this.setState({stepIndex: 4})}>BANK INFO</StepButton>
                        </Step>
                        <Step>
                          <StepButton onClick={() => this.setState({stepIndex: 5})}>ADDITIONAL INFO</StepButton>
                        </Step>
    					        </Stepper>
    						        <div style={contentStyle}>
    						          {finished ? (
    						            <p>
    						              <a
    						                href="#"
    						                onClick={(event) => {
    						                  event.preventDefault();
                                  sessionStorage.clear();
    						                  this.setState({stepIndex: 0, finished: false});
    						                }}
    						              >
    						                Edit Again
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
                     </Tab>
                    <Tab label="LEAVES" value="b">
                       <div>
                          
                       </div>
                    </Tab>
                    <Tab label="TIMETABLE" value="c">
                       <div>
                          
                       </div>
                    </Tab>
                    <Tab label="SALERY" value="d">
                       <div>
                           <Stepper linear={false} activeStep={stepIndex1}>
                             <Step>
                                <StepButton onClick={() => this.setState({stepIndex1: 0})}>PAYROLL</StepButton>  
                            </Step>
                            <Step>
                                <StepButton onClick={() => this.setState({stepIndex1: 1})}>PAYSLIP</StepButton> 
                            </Step>
                            <Step>
                            </Step>
                           </Stepper> 
                           <div style={contentStyle}>
                          {finished1 ? (
                            <p>
                              <a
                                href="#"
                                onClick={(event) => {
                                  event.preventDefault();
                                  this.setState({stepIndex1: 0, finished1: false});
                                }}
                              >
                                Edit Again
                              </a>
                            </p>
                          ) : (
                            <div>
                              {this.getStepEditSalaryContent(stepIndex1)}
                              <div style={{marginTop: 12}}>
                                <FlatButton
                                  label="Back"
                                  disabled={stepIndex1 === 0}
                                  onClick={this.handlePrev1}
                                  style={{marginRight: 12,display:"none"}}
                                  id={myback1}
                                />
                                <RaisedButton
                                  label={stepIndex1 === 2 ? 'Finish' : 'Next'}
                                  primary={true}
                                  onClick={this.handleNext1}
                                  style={{display:"none"}}
                                  id={mynext1}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                       </div>
                    </Tab>
                    <Tab label="MORE" value="e">
                       <div>
                          
                       </div>
                    </Tab>
                  </Tabs>    
			        </div> 
			    </div>    
     		);
     	}else{
     		return(
           <div className="card">
              <div className="header">
                  <h2>ADD EMPLOYEE</h2>
                  <a onClick={this.close} href="javascript:void(0)" style={{float:'right',position: 'relative',bottom:'22px'}}><i className="material-icons">close</i></a>
              </div>
              <div className="body">
                  <Stepper activeStep={stepIndex}>
                    <Step>
                      <StepLabel>GENARAL DETAILS</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>PERSONAL DETAILS</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>CONTACT DETAILS</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>UPLOAD DOCUMENTS</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>BANK INFO</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>ADDITIONAL INFO</StepLabel>
                    </Step>
                  </Stepper>
                    <div style={contentStyle}>
                      {finished ? (
                        <p>
                          <a
                            href="#"
                            onClick={(event) => {
                              event.preventDefault();
                              sessionStorage.clear();
                              this.setState({stepIndex: 0, finished: false});
                            }}
                          >
                            Add Employee
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