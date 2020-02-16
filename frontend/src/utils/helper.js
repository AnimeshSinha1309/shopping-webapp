/**
 * convert mongoose object to js object, removing private fields
 * @param {Document} obj
 * @param {Array<String>} blacklist
 */
function extractFields(obj, blacklist = []) {
    const ret = {},
        fields = Object.keys(obj); // may need .toObject() since Mongoose DB has Document thingy with _doc property

    for (const field of fields) {
        if (!/^_/.test(field) && blacklist.indexOf(field) === -1) {
            ret[field] = obj[field];
        }
    }

    // console.log("vendor" in obj, fields, obj, typeof obj, obj.vendor, Object.entries(obj));

    return ret;
}

module.exports = { extractFields };