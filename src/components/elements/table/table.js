import React, { Fragment } from "react";
import { FixedSizeList as List } from 'react-window';
import propTypes from 'prop-types';

import "./table.css"

/* 
  Usage example:
  <Table rows={[1, 2, 3]} columns={[1, 2, 2]}/> 
*/ 
class Table extends React.Component {
  render() {
    const height = this.props.height | 30,
    width = this.props.width | 300,
    data = this.props.data,
    itemSize = this.props.itemSize | 20;
  
    const Row = ({ index, style }) => {
      const row = Object.entries(data[index]);
      return (
        <tr key={index} className="listRow">
          {row.map((cell, index) => <td className="listCell" key={index}>{cell[1]}</td> )}
        </tr>
      );
    }
  
    return (
      <Fragment>
        <List
          height={height}
          width={width}
          itemCount={data.length}
          itemSize={itemSize}
        >
          {Row}
        </List>
      </Fragment>
    );
  
  }
}

Table.propTypes = {
  height: propTypes.number,
  width: propTypes.number,
  data: propTypes.array.isRequired,
  itemSize: propTypes.number

}

export default Table;
