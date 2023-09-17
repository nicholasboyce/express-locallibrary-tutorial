const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 }, 
    date_of_birth: { type: Date }, 
    date_of_death: { type: Date }
});

//Virtual function to get author's full name without storing in database
AuthorSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }
    return fullname;
});

//Virtual function for author's URL
AuthorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
});

//Formatted life dates for author
AuthorSchema.virtual("lifespan").get(function () {
    let lifespan = '';
    if (this.date_of_birth) {
        lifespan += `${this.date_of_birth_formatted} - `;
    }
    if (this.date_of_death) {
        lifespan += `${this.date_of_death_formatted}`;
    }
    return lifespan;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toISODate() : '';
});

AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toISODate() : '';
});

module.exports = mongoose.model("Author", AuthorSchema);