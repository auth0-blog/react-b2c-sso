import React, {Component} from 'react';
import './Table.css';
import Button from "../Button/Button";
import {applyMask} from "../../utils";

class Table extends Component {
  render() {
    const headers = this.props.headers || [];
    const rows = this.props.rows || [];
    const {onEditClick, onRemoveClick} = this.props;
    const showTableActions = onEditClick || onRemoveClick;
    return (
      <table className='react-auth0'>
        <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header.text}</th>
          ))}
          {showTableActions && <th/>}
        </tr>
        </thead>
        <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {headers.map((header, idx) => (
              <td key={idx}>
                {header.type === 'currency' ? '$ ' : ''}
                {applyMask(header.type, row[header.key])}
              </td>
            ))}
            {showTableActions && <td className='table-actions'>
              {onEditClick && <Button onClick={() => (this.props.onEditClick(row._id))} text='Edit'/>}
              {onRemoveClick && <Button onClick={() => (this.props.onRemoveClick(row._id))} text='Remove'/>}
            </td>}
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}

export default Table;
