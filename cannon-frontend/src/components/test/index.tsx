import { ChangeEventHandler, useCallback, useState } from "react";
import Layout from "../layout";
import axios from 'axios';

interface TestProps {
  id: string;
}
const Test: React.FC<TestProps> = (props) => {
  const { id } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // On file select (from the pop up)
  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      console.log("File change: ", file)
      setSelectedFile(file);
    }
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    if (!selectedFile) {
      alert("No File selected!");
      return;
    }

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );

    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = useCallback(() => {

    if (selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {selectedFile.lastModified.toString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }, [selectedFile]);

  return (
    <Layout>
      {/* Top Header */}
      <div className="flex flex-row z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h2
          className="flex justify-center text-2xl"
        >
          Test Id:&nbsp;
          <code className="font-mono font-bold">{id}</code>
        </h2>
      </div>

      {/* File Input for script to run the test */}
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>
          Upload!
        </button>
      </div>
      {fileData()}
    </Layout>
  )
}

export default Test;
