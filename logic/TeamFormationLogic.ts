import { ValidateDataLogic } from './ValidateDataLogic.js';

export const teamFormationLogic = { teamFormationAlgorithm };

function teamFormationAlgorithm(data: any) {
  if (ValidateDataLogic.validateData(data)) {
    // TODO team formation algorithm goes here
    // right now I'm just printing the data properties
    const mapping = data.mapping;
    console.log('displaying from data:');
    mapping.forEach((item: any, index: number) => {
      console.log(`Property ${index + 1}:`);
      console.log(`columnName: ${item.columnName}`);
      console.log(`optionName: ${item.optionName}`);
    });
  } else {
    throw new Error('Invalid data provided.');
  }
}

// test run function
const testData = {
  mapping: [
    { columnName: 'John Doe', optionName: 'gender' },
    { columnName: '30', optionName: 'first_language' },
    { columnName: 'Software Engineer', optionName: 'wam' },
    { columnName: 'johndoe@example.com', optionName: 'anxiety' },
    { columnName: '$100,000', optionName: 'agreeableness' },
  ],
};

// this data should fail due to incorrect properties
const testFailData = {
  mapping: [
    { columnName: 'John Doe', optionName: 'gender' },
    { columnName: '30', optionName: 'first_language' },
    { columnName: 'Software Engineer', optionName: 'wam' },
    { columnName: 'johndoe@example.com', optionName: 'anxiety' },
    { columnName: '$100,000', optionName: 'FAILHERE' },
  ],
};
teamFormationAlgorithm(testData);
console.log('-----------------------------------------------------------');
teamFormationAlgorithm(testFailData);
