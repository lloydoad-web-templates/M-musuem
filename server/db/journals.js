// for creating and retriving urls from database
const db = require("./connection");
// joi is used to validate schema
const Joi = require("joi");

const schema = Joi.object().keys({
    entry: Joi.string().required(),
    date: Joi.date().required()
}).with("entry", "date");

// name of database connection
const journals = db.get("journals");

/*
{
    entry: this.textFieldData,
    date: dateString
}
*/

function create(entry) {
    const result = Joi.validate(entry, schema);

    // if valid, insert into database
    if(result.error == null) {
        journals.insert(entry);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    create
};