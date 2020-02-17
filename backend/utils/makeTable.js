import React from "react";
import { Table, Button } from "reactstrap";

function makeTableFromObjectArray(data, clickHandler, renderButton = false) {
    if (data.length === 0) {
        return <h3>The list is empty</h3>;
    }

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

        if (renderButton) { rowElms.push(<Button>Dispatch</Button>); }

        rows.push(<tr key={index++}>{rowElms}</tr>);
    }

    const table = <Table onClick={clickHandler}><thead>{headerRow}</thead><tbody>{rows.map(x => x)}</tbody></Table>;

    return table;
}

export { makeTableFromObjectArray };
