/**
 * convert mongoose object to js object, removing private fields
 * @param {Document} obj
 * @param {Array<String>} blacklist
 */
function extractFields(obj, blacklist = []) {
    const ret = {},
        fields = Object.keys(obj); // may need .toObject() since Mongoose DB has Document thingy with _doc property

    for (const field of fields) {
        if ((field === "_id" || !/^_/.test(field)) && blacklist.indexOf(field) === -1) {
            ret[field] = obj[field];
        }
    }

    return ret;
}

function filterFields(array, blacklist = []) {
    return array.map(x => extractFields(x, blacklist));
}

module.exports = { filterFields };
