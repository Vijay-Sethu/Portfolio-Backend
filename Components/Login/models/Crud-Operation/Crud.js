const mongoose = require('mongoose');


const CrudSchema = mongoose.Schema({
    accountId: String,
    tableName: String,
    tableHeader: [Object],
    table: [Object],
    status: Boolean
}, {
    versionKey :false
})

module.exports = mongoose.model('crud', CrudSchema)