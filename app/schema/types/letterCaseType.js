'use strict';

const {
    GraphQLEnumType
} = require('graphql');

const LetterCaseType = new GraphQLEnumType({
    name: 'LetterCaseType',
    values: {
        TITLE: { value: 'title' },
        UPPER: { value: 'upper' },
        LOWER: { value: 'lower' }
    }
});

const toTitleCase = str => {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}


module.exports = { LetterCaseType, toTitleCase };