import * as React from "react";

type Props = {
  error: string;
  value: string;
};

const TD = ({ error, value }: Props) => {
  if (error) {
    return (
      <td className="has-error">
        {value}
        <span className="error-label">{`*${error}`}</span>
      </td>
    );
  } else {
    return <td>{value}</td>;
  }
};

export default TD;
