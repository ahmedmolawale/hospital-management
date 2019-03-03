var expect = require('chai').expect;

expect(false).to.be.false;

const titleOfMovie = (title) => {
    const words = title.split(' ');
    const titleCaseWords = words.map(word => {
        return word[0].toUpperCase() + word.substring(1);
    });
    return titleCaseWords.join(' ');
}
expect(titleOfMovie('the blue ones are not yet borne')).to.be.a('string');
expect(titleOfMovie('t')).to.equal('T');
expect(titleOfMovie('the')).to.equal('The');

expect(titleOfMovie('the blue ones are not yet borne')).to.equal('The Blue Ones Are Not Yet Borne');






