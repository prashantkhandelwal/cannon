import { ChangeEventHandler, useCallback, useState } from "react";
import Layout from "../layout";
import axios from 'axios';

interface TestProps {
  id: string;
}
const Test: React.FC<TestProps> = (props) => {
  const { id } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [running, setRunning] = useState<boolean>(false);

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

    const formData = new FormData();
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );

    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object
    setRunning(true);
    axios.post("api/uploadfile", formData).finally(() => {
      setRunning(false);
    });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = useCallback(() => {
    if (selectedFile) {
      return (
        <div>
          <h2 className="font-semibold">File Details</h2>
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
        <div className="ml-0.5 text-xs">
          <h4>Choose the script, and click Run Test to deploy and test.</h4>
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
      <div className="flex flex-col gap-2">
        <div>
          <input type="file" onChange={onFileChange} />
          <button
            onClick={onFileUpload}
            className={`bg-transparent hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-0.5 px-3 border border-blue-500 hover:border-transparent rounded`
              + (selectedFile ? "" : " opacity-50")}
            disabled={!selectedFile}
          >
            Run Test
            {running ?
              <div
                className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
              </div> :
              null
            }
          </button>
        </div>
        {fileData()}
      </div>
    </Layout>
  )
}

export default Test;
