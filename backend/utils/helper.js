/**
 * convert mongoose object to js object, removing private fields
 * @param {Document} obj
 */
function extractFields(obj) {
    const ret = {},
        fields = Object.keys(obj.toObject());

    for (const field of fields) {
        if (!/^_/.test(field)) {
            ret[field] = obj[field];
        }
    }

    // console.log("vendor" in obj, fields, obj, typeof obj, obj.vendor, Object.entries(obj));

    return ret;
}

module.exports = { extractFields };
