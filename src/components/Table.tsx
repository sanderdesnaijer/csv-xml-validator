import * as React from "react";
import { Records } from "../types";
import TD from "./TD";
import { getError } from "../helpers/validators";

interface Props {
  records: Records;
}

export default class Table extends React.Component<Props, {}> {
  render() {
    const { records } = this.props;

    if (!records.length) return null;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Account Number</th>
            <th>Description</th>
            <th>Start Balance</th>
            <th>Mutation</th>
            <th>End Balance</th>
          </tr>
        </thead>
        <tbody>
          {records.map(
            ({
              reference,
              accountNumber,
              description,
              startBalance,
              mutation,
              endBalance,
              errors,
              id
            }) => (
              <tr className={errors.length && "has-error"} key={id}>
                <TD
                  value={reference}
                  error={getError("unique_reference", errors)}
                />
                <td>{accountNumber}</td>
                <td>{description}</td>
                <td>{startBalance}</td>
                <td>{mutation}</td>
                <TD
                  value={endBalance}
                  error={getError("end_balance", errors)}
                />
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  }
}
