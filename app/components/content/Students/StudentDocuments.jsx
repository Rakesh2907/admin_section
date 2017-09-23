import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class StudentDocuments extends React.Component 
{
	constructor(props) 
    {
     	super(props);
      this.state={
        candidate_img_file: '',
        student_male: base_url+"uploads/candidate/male.jpg",
        student_female: base_url+"uploads/candidate/female.jpg"
      }
      this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
      this.uploadStudentImg = this.uploadStudentImg.bind(this);
    }
    handlePhotoUpload(e)
    {
        e.preventDefault();
        let reader = new FileReader();
        let cimgfile = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
              candidate_img_file: cimgfile
          });
        }
        reader.readAsDataURL(cimgfile)
    }
    uploadStudentImg()
    {
       var cfile = this.state.candidate_img_file
       var cfd = new FormData();
       cfd.append("student_img",cfile);

       if(typeof this.props.Students!='undefined')
       {
            var studentId = this.props.Students['student_id'];
       }else{
            var studentId = sessionStorage.getItem('sess_student_id');
       }
       $.ajax({
                  url: base_url+'students_con/save_student_img?student_id='+studentId,
                  dataType: 'json',
                  type: 'POST',
                  data: cfd,
                  contentType: false,
                  processData: false,
                  success: function(resdata) {
                    if(resdata.length > 0)
                    {
                         swal({
                                title: "Upload Student Photo Successfully...",
                                type: "success",
                                confirmButtonClass: 'btn-success',
                                confirmButtonText: 'Okay'
                          },function(){
                                  document.getElementById("next_button_4").click();
                         });
                      
                    }else{
                        
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                  console.error(err.toString());
                }.bind(this)  
            });
    }
    componentDidMount()
    {
        if(typeof this.props.Students!='undefined')
        {
              $.ajax({
                    type: 'POST',
                    url: base_url+'students_con/get_documents',
                    data: {
                      student_id: this.props.Students['student_id'],
                    },
                    dataType: 'json',
                    success: function (resdata) {
                      if(resdata.length > 0)
                      {
                         if(this.props.Students['gender'] == 'male')
                         {
                            this.setState({student_male: base_url+'uploads/candidate/'+resdata[0]['candidate_img']});
                         }else{
                            this.setState({student_female: base_url+'uploads/candidate/'+resdata[0]['candidate_img']});
                         } 
                      }else{
                      }
                    }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(err.toString());
                      }.bind(this)
            });
        }
    }    
    render() 
    {
    	const styles = {
			  button: {
			    margin: 12,
			  },
			  exampleImageInput: {
			    cursor: 'pointer',
			    position: 'absolute',
			    top: 0,
			    bottom: 0,
			    right: 0,
			    left: 0,
			    width: '100%',
			    opacity: 0,
			  }
		};
    let student_img = base_url+"uploads/candidate/default.png";
    if(typeof this.props.Students!='undefined')
    {
        if(this.props.Students['gender'] == 'male')
        { 
            student_img = this.state.student_male;
        }else{
            student_img = this.state.student_female;
        }
    }     
    	return(
          <div className="row clearfix">
           <div className="col-md-6">
          		<RaisedButton
            			label="Upload Student Photo"
            			labelPosition="before"
            			style={styles.button}
            			containerElement="label"
          		>
            			<input id="student_photo" name="student_photo" type="file" onChange={this.handlePhotoUpload} style={styles.exampleImageInput} />
          		</RaisedButton>
          		<RaisedButton 
                        style={{marginRight: 12}} 
                        primary={true}
                        type="button"
                        label="Upload" 
                        onClick={this.uploadStudentImg}
                  /> <br />
          </div>  
          <div className="col-md-6">
              <img src={student_img} id="student_avatar" name="student_avatar" width="150" height="150"/>
          </div>       
    	 </div>	
    	);
    }
}     	