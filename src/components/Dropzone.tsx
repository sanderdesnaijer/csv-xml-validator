import * as React from "react";
import ReactDropzone from "react-dropzone";
import { procesCsv, procesXml, fetchFile } from "../helpers/loaders";
import { Records } from "../types";

const dropzoneRef: React.RefObject<any> = React.createRef();

interface Props {
  onLoadFile: (records: Records) => void;
}

export default class Dropzone extends React.Component<Props> {
  onLoadFile = (file: any, fileAsBinaryString: any) => {
    const { onLoadFile } = this.props;
    switch (file.type) {
      case "text/csv":
        return onLoadFile(procesCsv(fileAsBinaryString));
      case "text/xml":
        return onLoadFile(procesXml(fileAsBinaryString));
      default:
        console.log("file not supported yet");
        return null;
    }
  };

  onDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => this.onLoadFile(file, reader.result);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.readAsBinaryString(file);
    });
  };

  render() {
    return (
      <div className="dropzone">
        <ReactDropzone
          ref={dropzoneRef}
          className="dropzone"
          activeClassName="dropzone--active"
          rejectClassName="dropzone--reject"
          accept="text/csv, text/xml"
          onDrop={this.onDrop}
        />
        <button
          type="button"
          onClick={() => {
            dropzoneRef.current.open();
          }}
        >
          Select file from computer
        </button>
      </div>
    );
  }
}
