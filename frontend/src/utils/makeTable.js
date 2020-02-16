import React from "react";
import { Table } from "reactstrap";

function makeTableFromObjectArray(data) {
    const rows = [],
        keys = Object.keys(data[0]),
        headerRow = <tr key={123}>{
            keys.map((e, i) => <th key={i}>{e}</th>)
        }</tr>;

    let index = 0;

    for (const obj of data) {
        const rowElms = [];

        for (const key of keys) {
            rowElms.push(<td key={index++}>{obj[key]}</td>);
        }

        rows.push(<tr key={index++}>{rowElms}</tr>);
    }

    const table = <Table><thead>{headerRow}</thead><tbody>{rows.map(x => x)}</tbody></Table>;

    return table;
}

export { makeTableFromObjectArray };
