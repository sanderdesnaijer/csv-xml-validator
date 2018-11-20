import * as React from "react";

type Props = {
  onLoadExampleXml: () => void;
  onLoadExampleCsv: () => void;
};

const Header = ({ onLoadExampleXml, onLoadExampleCsv }: Props) => (
  <header>
    <h1>CSV/XML validator</h1>
    <p>Drag n drop a csv or xml file here with MT940 format to validate.</p>
    <p>
      Don't have a file ready? Don't worry, we have example files.
      <a onClick={onLoadExampleXml}> Click here for .xml</a> and
      <a onClick={onLoadExampleCsv}> here for .csv</a>.
    </p>
  </header>
);

export default Header;
