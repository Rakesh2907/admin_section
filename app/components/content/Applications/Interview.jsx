import React from 'react';
import CalenderTime from '../modules/CalendarTime/App';
import moment from 'moment';

var per = [];
class InterviewResult extends React.Component
{
      constructor(props) {
        super(props);
         this.state = {
            interviewDate: props.interviewDate,
            isDisabled: false,
            childId: props.childId,
            myapplicantData: props.myapplicantData
         };
         this.handleEnable = this.handleEnable.bind(this);
      }
      handleEnable(){
          this.setState({
                isDisabled: false
          });
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
             per.push(<option value={percentage[j]}>{percentage[j]}%</option>);
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
                      $("#maths_percentage > [value="+ resdata[0]['maths_percentage']+"]").attr("selected", "true");
                      $("#english_percentage > [value="+ resdata[0]['english_percentage']+"]").attr("selected", "true");
                      $("#gk_percentage > [value="+ resdata[0]['gk_percentage']+"]").attr("selected", "true");
                      $("#result > [value="+ resdata[0]['result']+"]").attr("selected", "true");
                      if(resdata[0]['result'] == 'PASS')
                      {
                         this.setState({
                              isDisabled: true
                         });
                      }else{
                         this.setState({
                              isDisabled: false
                         });
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
          $.ajax({
              url: base_url+'admin_con/set_inteview_result?id='+this.state.myapplicantData,
              dataType: 'json',
              type: 'POST',
              data: $('#interview_result').serialize()+"&child_id="+this.state.childId,
              success: function(resdata) {
                if(resdata.success){
                   swal({
                      title: "Records Saved successfully...",
                      type: "success",
                      confirmButtonClass: 'btn-success',
                      confirmButtonText: 'Okay'
                    });

                    if($("#result").val() == 'PASS'){
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
           var _inlineStyle = {
              marginRight: 10
           }
          return(
            <div className="body">
                <form id="interview_result" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group form-float">
                        <label className="form-label">Scheduled Date</label> 
                        <div className="form-line">
                            <input type="text" value={moment(this.state.interviewDate).format('llll')} readOnly className="form-control"/>
                        </div> 
                    </div>                  
                    <div className="form-group form-float">
                                    <div className="form-line">
                                        <label className="form-label">Maths</label>
                                        <select id="maths_percentage" className="form-control show-tick" data-live-search="true" name="maths_percentage">
                                            {per}
                                        </select>
                                    </div>
                    </div>
                    <div className="form-group form-float">
                        <div className="form-line">
                                        <label className="form-label">English</label>
                                        <select id="english_percentage" className="form-control show-tick" data-live-search="true" name="english_percentage">
                                            {per}
                                        </select>
                        </div>
                    </div>
                    <div className="form-group form-float">
                        <div className="form-line">
                                        <label className="form-label">GK</label>
                                        <select id="gk_percentage" className="form-control show-tick" data-live-search="true" name="gk_percentage">
                                            {per}
                                        </select>
                        </div>
                    </div>
                    <div className="form-group form-float">
                        <div className="form-line">
                              <label className="form-label">Result</label>
                              <select disabled={this.state.isDisabled} id="result" className="form-control show-tick" data-live-search="true" name="result">
                                  <option value="NULL">Select</option>
                                  <option value="PASS">PASS</option>
                                  <option value="FAIL">FAIL</option>
                                  <option value="ABSENT">ABSENT</option>
                              </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary m-t-15 waves-effect" style={_inlineStyle}>Save</button>
                    <button type="button" disabled={this.state.isDisabled} className="btn btn-primary m-t-15 waves-effect" onClick={this.props.resheduleHandler}>Reshedule</button>
                </form>
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
                <div><CalenderTime applicantId={this.state.myapplicantData} childId={this.state.childId}/></div>
             );
         }else if(this.state.timeCondition){
              return(
                <div><InterviewResult myapplicantData={this.state.myapplicantData} applicantId={this.state.myapplicantData} resheduleHandler={this.resheduleHandler} interviewDate={this.state.interviewDate} childId={this.state.childId}/></div>
              );
         }
      }
}