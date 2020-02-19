import React from "react";
import { Table, Button } from "reactstrap";
import { PRODUCT_STATUS } from "../config/settings";

function makeTableFromObjectArray(data, clickHandler, renderButton = []) {
    if (data.length === 0) {
        return <h3>The list is empty</h3>;
    }

    const dt2 = data.map(x => Object.keys(x).length);

    // get keys from where we know they're the most
    let keys = Object.keys(data[dt2.indexOf(Math.max(...dt2))]);
    keys = keys.filter(x => x !== "_id" && x !== "id" && x !== "vendorid");

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
            } else if (key === "status") {
                if (!Number.isNaN(Number(elm))) { elm = PRODUCT_STATUS[Number(elm)]; }
            }

            rowElms.push(<td key={index++}>{elm}</td>);
        }

        for (const btn of renderButton) {
            rowElms.push(<td key={index++}><Button>{btn}</Button></td>);
        }

        // eslint-disable-next-line no-underscore-dangle
        const elmRow = <tr key={index++} data-name={obj.product} data-vendorid={obj.vendorid} data-id={obj._id} data-max={obj.quantityRem}>{rowElms}</tr>;

        rows.push(elmRow);
    }

    const table = <Table onClick={clickHandler}><thead>{headerRow}</thead><tbody>{rows.map(x => x)}</tbody></Table>;

    return table;
}

export { makeTableFromObjectArray };
