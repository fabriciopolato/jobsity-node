/* eslint-disable no-plusplus */
module.exports = function csvParser(csv) {
  const lines = csv.trim('\n').split('\n');

  const result = [];

  const headers = lines[0].trim('\r').split(',').map((elem) => elem.toLowerCase());

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
};
