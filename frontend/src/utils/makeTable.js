import React from "react";
import { Table, Button } from "reactstrap";

function makeTableFromObjectArray(data, clickHandler, renderButton = "") {
    if (data.length === 0) {
        return <h3>The list is empty</h3>;
    }

    let keys = Object.keys(data[0]);
    keys = keys.filter(x => x !== "_id" && x !== "id");

    const rows = [],
        headerRow = <tr key={123}>{
            keys.map((e, i) => <th key={i}>{e}</th>)
        }</tr>;

    let index = 0;

    for (const obj of data) {
        const rowElms = [];

        for (const key of keys) {
            rowElms.push(<td key={index++}>{obj[key]}</td>);
        }

        if (renderButton) { rowElms.push(<td key={index++}><Button>{renderButton}</Button></td>); }

        // eslint-disable-next-line no-underscore-dangle
        const elmRow = <tr key={index++} data-id={obj._id} data-max={obj.quantityRem} data-name={obj.name}>{rowElms}</tr>;

        rows.push(elmRow);
    }

    const table = <Table onClick={clickHandler}><thead>{headerRow}</thead><tbody>{rows.map(x => x)}</tbody></Table>;

    return table;
}

export { makeTableFromObjectArray };
