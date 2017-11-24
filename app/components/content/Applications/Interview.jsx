import React from 'react';
import CalenderTime from '../modules/CalendarTime/App';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

var per = [];
class InterviewResult extends React.Component
{
      constructor(props) {
        super(props);
         this.state = {
            interviewDate: props.interviewDate,
            isDisabled: false,
            childId: props.childId,
            myapplicantData: props.myapplicantData,
            maths_percentage:'0',
            english_percentage: '0',
            gk_percentage: '0',
            result: ''
         };
         this.handleEnable = this.handleEnable.bind(this);
         this.handleChangeMaths = this.handleChangeMaths.bind(this);
         this.handleChangeGk = this.handleChangeGk.bind(this);
         this.handleChangeEnglish = this.handleChangeEnglish.bind(this);
         this.handleChangeResult = this.handleChangeResult.bind(this);
      }
      handleEnable(){
          this.setState({
                isDisabled: false
          });
      }
      handleChangeMaths(event,index,value){
          this.setState({maths_percentage:value})
      }
      handleChangeEnglish(event,index,value){
          this.setState({english_percentage:value});
      }
      handleChangeGk(event,index,value){
          this.setState({gk_percentage:value});
      }
      handleChangeResult(event,index,value){
          this.setState({result:value});
      }
      componentWillReceiveProps(props) {
           this.setState({
              interviewDate: props.interviewDate,
              childId: props.childId,
              myapplicantData: props.myapplicantData
           });  
      }
      componentWillMount(){
         per = [];
         var percentage = ['0','10','30','50','70','90'];
         for(var j= 0;j < percentage.length;j++){
             per.push(<MenuItem value={percentage[j]} primaryText={percentage[j]} />);
         } 
      }
      componentDidMount()
      {
          $.ajax({
              url: base_url+'admin_con/get_inteview_result',
              dataType: 'json',
              type: 'POST',
              data:{
                  applicant_id: this.state.myapplicantData,
                  child_id: this.state.childId
              },
              success: function(resdata) {
                if(resdata.length > 0)
                {
                      this.setState({
                          maths_percentage: resdata[0]['maths_percentage'],
                          english_percentage: resdata[0]['english_percentage'],
                          gk_percentage: resdata[0]['gk_percentage'],
                          result: resdata[0]['result']
                      });
                      if(resdata[0]['result'] == 'PASS')
                      {
                         this.setState({isDisabled: true});
                      }else{
                         this.setState({isDisabled: false});
                      }
                }else{
                   this.setState({
                          isDisabled: false
                    });
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)
         });
      }
      handleSubmit(event)
      {
          event.preventDefault();

          var myMaths = this.state.maths_percentage;
          var myEnglish = this.state.english_percentage;
          var myGk = this.state.gk_percentage;
          var myResult = this.state.result;

          $.ajax({
              url: base_url+'admin_con/set_inteview_result?id='+this.state.myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#interview_result').serialize()+"&child_id="+this.state.childId+"&maths_percentage="+myMaths+"&english_percentage="+myEnglish+"&gk_percentage="+myGk+"&result="+myResult,
              success: function(resdata) {
                if(resdata.success){
                   swal({
                      title: "Records Saved successfully...",
                      type: "success",
                      confirmButtonClass: 'btn-success',
                      confirmButtonText: 'Okay'
                    });

                    if(myResult == 'PASS'){
                        this.setState({
                              isDisabled: true
                        });
                    }else{
                        this.setState({
                              isDisabled: false
                        });
                    }
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)
         });
      }
      render()
      {
           const styles = {
              floatingLabelStyle: {
                color: black500,
              },
              underlineStyle: {
                borderColor: black500,
              }
          }
          const {maths_percentage,english_percentage,gk_percentage,result} = this.state;
          return(
            <div className="body">
                <ValidatorForm id="interview_result" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
                  <div className="row clearfix">
                       <div className="col-sm-6">
                          <TextField
                                floatingLabelText="Scheduled Date"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                                labelStyle={styles.floatingLabelStyle}
                                underlineStyle={styles.underlineStyle}
                                value={moment(this.state.interviewDate).format('llll')}
                                fullWidth={true}
                                disabled={true}
                          />
                       </div>
                  </div>
                  <div className="row clearfix">
                       <div className="col-sm-6">
                           <SelectValidator 
                              name="maths_percentage" 
                              floatingLabelText="Maths(%)"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={maths_percentage}
                              defaultValue={maths_percentage}
                              onChange={this.handleChangeMaths}
                              id="maths_percentage"
                              fullWidth={true}
                            >
                            {per}
                        </SelectValidator>
                       </div>
                  </div>
                  <div className="row clearfix">
                       <div className="col-sm-6">
                           <SelectValidator 
                              name="english_percentage" 
                              floatingLabelText="English(%)"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={english_percentage}
                              defaultValue={english_percentage}
                              onChange={this.handleChangeEnglish}
                              id="english_percentage"
                              fullWidth={true}
                            >
                            {per}
                        </SelectValidator>
                       </div>
                  </div> 
                  <div className="row clearfix">
                       <div className="col-sm-6">
                           <SelectValidator 
                              name="gk_percentage" 
                              floatingLabelText="General knowledge(%)"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={gk_percentage}
                              defaultValue={gk_percentage}
                              onChange={this.handleChangeGk}
                              id="gk_percentage"
                              fullWidth={true}
                            >
                            {per}
                        </SelectValidator>
                       </div>
                  </div>  
                  <div className="row clearfix">
                       <div className="col-sm-6">
                           <SelectValidator 
                              name="result" 
                              floatingLabelText="RESULT"
                              floatingLabelStyle={styles.floatingLabelStyle}
                              inputStyle={styles.floatingLabelStyle}
                              labelStyle={styles.floatingLabelStyle}
                              underlineStyle={styles.underlineStyle}
                              value={result}
                              defaultValue={result}
                              onChange={this.handleChangeResult}
                              id="result"
                              fullWidth={true}
                              disabled={this.state.isDisabled}
                            >
                             <MenuItem value="NULL" primaryText="Select" />
                             <MenuItem value="PASS" primaryText="PASS" /> 
                             <MenuItem value="FAIL" primaryText="FAIL" /> 
                             <MenuItem value="ABSENT" primaryText="ABSENT" /> 
                        </SelectValidator>
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
                           <RaisedButton 
                              style={{marginRight: 12}} 
                              primary={true}
                              type="button"
                              label="Reshedule" 
                              disabled={this.state.isDisabled}
                              onClick={this.props.resheduleHandler}
                           />
                       </div>
                  </div>                  
                </ValidatorForm>
            </div>
          )
      }
}
export default class Interview extends React.Component
{
      constructor(props) {
         super(props);
         this.state = {
            interviewDate: props.interviewDate,
            timeCondition: props.timeCondition,
            childId: props.childId
         };
         this.handleReshedule = this.handleReshedule.bind(this);
         this.resheduleHandler = this.resheduleHandler.bind(this);
      } 
      componentWillReceiveProps(props) {
          this.setState({
              interviewDate: props.interviewDate,
              timeCondition: props.timeCondition,
              childId: props.childId,
              myapplicantData:props.myapplicantData
          });
      }
      handleReshedule(){
           this.setState({interviewDate:null});
      }
      resheduleHandler(){
           this.setState({
              interviewDate:null,
              timeCondition: 0
           });
      }
      render(){
          //alert(this.state.timeCondition);
          if(this.state.interviewDate!=null && !this.state.timeCondition)
          {
            return(
               <div className="app">
                 <form>
                    <div className="input">
                        <input type="text" value={moment(this.state.interviewDate).format('llll')} readOnly />
                    </div>
                    <div className="m-input-moment">
                      <button type="button"className="im-btn btn-save btn btn-primary waves-effect" onClick={this.handleReshedule}>Reshedule</button>
                    </div>
                 </form>
               </div>      
            );
         }else if(this.state.interviewDate==null && !this.state.timeCondition){
             return(
                <div className="body">
                  <div className="row clearfix">
                     <div className="col-sm-6">
                        <CalenderTime applicantId={this.state.myapplicantData} childId={this.state.childId}/>
                     </div>
                  </div>      
                </div>
             );
         }else if(this.state.timeCondition){
              return(
                <div><InterviewResult myapplicantData={this.state.myapplicantData} applicantId={this.state.myapplicantData} resheduleHandler={this.resheduleHandler} interviewDate={this.state.interviewDate} childId={this.state.childId}/></div>
              );
         }
      }
}