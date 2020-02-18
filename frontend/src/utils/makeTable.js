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
            let elm = obj[key];

            if (key === "image") {
                if (!elm) {
                    elm = "NA";
                } else if (elm.data && elm.data.data) {
                    const imageData = elm.data.data.map(x => String.fromCharCode(x)).join("");

                    elm = <img src={imageData}></img>;
                    rowElms.push(<td className="image" key={index++}>{elm}</td>);
                    continue;
                } else {
                    elm = "NA";
                }
            }

            rowElms.push(<td key={index++}>{elm}</td>);
        }

        if (renderButton) {
            rowElms.push(<td key={index++}><Button>{renderButton}</Button></td>);
        }

        // eslint-disable-next-line no-underscore-dangle
        const elmRow = <tr key={index++} data-id={obj._id} data-max={obj.quantityRem} data-name={obj.name}>{rowElms}</tr>;

        rows.push(elmRow);
    }

    const table = <Table onClick={clickHandler}><thead>{headerRow}</thead><tbody>{rows.map(x => x)}</tbody></Table>;

    return table;
}

export { makeTableFromObjectArray };
