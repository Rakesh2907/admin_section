import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class StudentDocuments extends React.Component 
{
	constructor(props) 
    {
     	super(props);
      this.state={
        candidate_img_file: ''
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
       var studentId = sessionStorage.getItem('sess_student_id');
       var cfile = this.state.candidate_img_file
       var cfd = new FormData();
       cfd.append("student_img",cfile);

       $.ajax({
                url: base_url+'students_con/upload_student_img?student_id='+studentId,
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
    	return(
          <div>	
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
    	);
    }
}     	