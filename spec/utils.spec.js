const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');


describe('formatDates', () => {
  it('Returns an empty array, when passed an empty array', () => {
    expect(formatDates([])).to.eql([]);
  });
  it('Returns a different array to the array passed', () => {
    const input = [];
    expect(formatDates(input)).to.not.equal(input);
  })
  it('Does not mutate', () => {
    const input = [{1 : 2, 3 : 4, 5 : 6}];
    formatDates(input);
    expect(input).to.eql([{ 1: 2, 3: 4, 5: 6 }]);
  })
  it('Returns a reformated timestamp for one object', () => {
    const input = [{ title: 'Yemi', topic: 'Yemi', author: 'Yemi', body: 'Yemi', created_at: 1471522072389}];
    expect(formatDates(input)[0].created_at).to.eql(new Date(1471522072389));
  })
  it('Returns the formatted timestamp for two or more objects', () => {
    const input = [{ title: 'Yemi', topic: 'Yemi', author: 'Yemi', body: 'Yemi', created_at: 1471522072389 }, { title: 'Ope', topic: 'Ope', author: 'Ope', body: 'Ope', created_at: 1488766934447 }, { title: 'Yemi', topic: 'Yemi', author: 'Yemi', body: 'Yemi', created_at: 1477707849225 } ];
    expect(formatDates(input)[0].created_at).to.eql(new Date(1471522072389))
    expect(formatDates(input)[1].created_at).to.eql(new Date(1488766934447))
    expect(formatDates(input)[2].created_at).to.eql(new Date(1477707849225))
  })
 
});

describe.only('makeRefObj', () => {
  it('Returns an empty object when passed an empty array', () => {
    expect(makeRefObj([])).to.eql({});
  })
  it('Does not mutate', () => {
    const input = [{ 1: 2, 3: 4, 5: 6 }];
    makeRefObj(input);
    expect(input).to.eql([{ 1: 2, 3: 4, 5: 6 }]);
  })
  it('Returns a reference object when passed a single obj in an array', () => {
    const input = [{ article_id: 1, title: 'A' }];
    expect(makeRefObj(input)).to.eql({ A: 1 });
  })
  it('Returns a reference object for two or more objects in an array', () => {
    const input = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }];
    expect(makeRefObj(input)).to.eql({A : 1, B : 2, C : 3});
  })
});

describe('formatComments', () => {
  it('Returns empty array when passed an empty array and object', () => {
    expect(formatComments([], {})).to.eql([]);
  })
  it('Does not mutate the the passed data', () => {
    const input1 = [{1 : 2, 3 : 4, 5 : 6}];
    const input2 = {A : 1, B : 2, C : 3};
    formatComments(input1, input2);
    expect(input1).to.eql([{ 1: 2, 3: 4, 5: 6 }]);
    expect(input2).to.eql({ A: 1, B: 2, C: 3 });
  })
  it('Returns an array containing reformated data object', () => {
    const input1 = [{
      body: 'athletic',
      belongs_to: 'Yemi',
      created_by: 'God',
      votes: 100,
      created_at: 773680009000
    }];
    const input2 = {'Yemi' : 1};
    expect(formatComments(input1, input2)).to.eql([{ body: 'athletic', article_id: 1, author: 'God', votes: 100, created_at: new Date(773680009000)}]);
  })
  it('Returns an array containing multiple formatted objects when passed an array containing two or more objects', () => {
    const input1 = [{
      body: 'athletic',
      belongs_to: 'Yemi',
      created_by: 'God',
      votes: 100,
      created_at: 773680009000
    },
      {
        body: 'athletic',
        belongs_to: 'Ope',
        created_by: 'Mum',
        votes: 100,
        created_at: 773680009000
      },
      {
        body: 'athletic',
        belongs_to: 'YemxCode',
        created_by: 'Dad',
        votes: 100,
        created_at: 773680009000
      }];
    const input2 = {Yemi : 1, Ope : 2, YemxCode : 3};
    expect(formatComments(input1, input2)).to.eql([{ body: 'athletic', article_id: 1, author: 'God', votes: 100, created_at: new Date(773680009000) }, { body: 'athletic', article_id: 2, author: 'Mum', votes: 100, created_at: new Date(773680009000) }, { body: 'athletic', article_id: 3, author: 'Dad', votes: 100, created_at: new Date(773680009000) }])
  })
});
