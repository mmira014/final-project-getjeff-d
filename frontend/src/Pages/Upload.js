import React from 'react'
import axios from 'axios'

// function logFileBin(event) {
//   console.log("logFileBin Output:\n",event.target.result);
//   return event.target.result
// }

class UploadPage extends React.Component {
  state = {
    userFiles: null
  }

  // grabs selected files and stores array in state userFiles
  fileSelectHandler = event => {
    
    // save files into userFiles[] and call upload function
    this.setState(
      {
        userFiles: event.target.files
      }, 
      () => this.uploadFiles())
  }

  printFiles = files => {
    for(var i = 0; i < files.length; ++i) {
      console.log("File:", files[i])
    }
    // console.log(this.state.userFiles[0])
  }

  // transfer user uploaded files into ./tempresources folder
  uploadFiles = async () => {
    // var reader = new FileReader();
    // var reader2 = new FileReader();

    // reader.addEventListener('load', logFileBin); // will call logFileBin when load complete
    // reader.addEventListener('load', logFileBin);

    // reader.readAsBinaryString(this.state.userFiles[0])
    // var strData = reader.readAsText(this.state.userFiles[0]);

    console.log("First File:", this.state.userFiles[0])
    // let fd = new FormData();
    let files = this.state.userFiles;
    let axiosArr = [];

    console.log("File:", files[0], "\nfiles[0].name", files[0].name)
    console.log("Num Files: ", files.length)
    
    for (var i = 0; i < files.length; ++i) {
      let fd = new FormData();
      fd.append('file', files[i], files[i].name) // FIXME: make sure set replaces on name
      
      const newPromise = axios({
        method: 'post',
        url: 'http://localhost:9000/upload', 
        data: fd,
      });
      axiosArr.push(newPromise);
    }

    axios.all(axiosArr)
    .catch((err) => {
      console.log("Error:", err);
    });
    // reader.onload = function() {
    //   let out = reader.result
    //   console.log("out:", out)
    //   fd.append('fileBinary', out)
    //   axios.post('http://localhost:9000/upload',fd)
    //   .then(response => console.log("Response:\n",response.data))
    //   .catch(err => console.error(err))
    // }
    
  }

  render() {
    return (
      <div>
        {/* <h1>Insert file upload box here</h1> */}
        <input type="file" multiple={true} accept="image/*" onChange={this.fileSelectHandler} />
      </div>
    );
  }
}

export default UploadPage;