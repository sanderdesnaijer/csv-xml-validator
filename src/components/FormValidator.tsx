import * as React from "react";
import Table from "./Table";
import Filter from "./Filter";
import Header from "./Header";
import { Records, Filter as FilterType } from "../types";
import { procesCsv, procesXml, fetchFile } from "../helpers/loaders";

interface Props {
  records: Records;
  onLoadFile: (records: Records) => void;
  onReset: () => void;
}

interface State {
  records: Records;
  filter: FilterType;
}

const intitialState: State = {
  records: [],
  filter: "invalid"
};

export default class FormValidator extends React.Component<Props, State> {
  readonly state = intitialState;

  onFilter = (filter: FilterType): void => this.setState({ filter });

  getFilteredRecords = (): Records => {
    const { records } = this.props;
    const { filter } = this.state;
    switch (filter) {
      case "valid":
        return records.filter(record => !record.errors.length);
      case "invalid":
        return records.filter(record => record.errors.length);
      default:
        return records;
    }
  };

  loadExampleCsv = async () => {
    const data = await fetchFile("./src/assets/records.csv");
    const records = procesCsv(data);
    this.props.onLoadFile(records);
  };
  loadExampleXml = async () => {
    const data = await fetchFile("./src/assets/records.xml");
    const records = procesXml(data);
    this.props.onLoadFile(records);
  };

  onReset = () => {
    this.props.onReset();
  };

  render() {
    const { filter } = this.state;
    const records = this.getFilteredRecords();
    return (
      <div className="form-validator">
        <Header
          onLoadExampleXml={this.loadExampleXml}
          onLoadExampleCsv={this.loadExampleCsv}
        />
        <Table records={records} />
        <Filter
          filter={filter}
          onFilter={this.onFilter}
          total={records.length}
          onReset={this.onReset}
        />
      </div>
    );
  }
}
