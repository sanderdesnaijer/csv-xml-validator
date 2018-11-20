import * as React from "react";
import FormValidator from "./FormValidator";
import Dropzone from "./Dropzone";

import { Records } from "../types";

interface State {
  records: Records;
}

const intitialState: State = {
  records: []
};

export default class Main extends React.Component<{}, State> {
  readonly state = intitialState;

  loadRecords = (records: Records) => this.setState({ records });

  onResetRecords = () => this.setState({ records: [] });

  render() {
    const { records } = this.state;

    return (
      <div className="main">
        <FormValidator
          records={records}
          onLoadFile={this.loadRecords}
          onReset={this.onResetRecords}
        />
        {!records.length && <Dropzone onLoadFile={this.loadRecords} />}
      </div>
    );
  }
}
