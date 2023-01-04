const axios = require('axios').default;
const stockService = require('./stockService');

describe('stockService.getStock', () => {
  it('returns the correct values in a json format when a valid stock quote is provided', async () => {
    const csv = 'Symbol,Date,Time,Open,High,Low,Close,Volume,Name\nA.US,2022-09-01,22:03:06,127.63,129.11,126.21,128.93,1266178,AGILENT TECHNOLOGIES\n';
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ data: csv }));

    const actual = await stockService.getStock('any-stock');
    const expected = {
      symbol: 'A.US',
      open: '127.63',
      high: '129.11',
      low: '126.21',
      close: '128.93',
      name: 'AGILENT TECHNOLOGIES',
      date: '2022-09-01',
      time: '22:03:06',
      volume: '1266178',
    };

    expect(actual).toEqual(expected);
  });

  it('returns null when a invalid stock quote is provided', async () => {
    const csv = 'Symbol,Date,Time,Open,High,Low,Close,Volume,Name\nN/D,N/D,N/D,N/D,N/D,N/D,N/D,N/D,N/D\n';
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ data: csv }));

    const actual = await stockService.getStock('invalid-stock');

    expect(actual).toBeNull();
  });
});
