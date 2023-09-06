import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export const ValidateDataLogic = { validateData };

const ajvInstance = new Ajv({ allErrors: true });

addFormats(ajvInstance);

const schema = {
  type: 'object',
  properties: {
    mapping: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          columnName: { type: 'string' },
          optionName: {
            type: 'string',
            enum: [
              'gender',
              'first_language',
              'wam',
              'anxiety',
              'agreeableness',
            ],
          },
        },
        required: ['columnName', 'optionName'],
      },
    },
  },
  required: ['mapping'],
};

function validateData(data: any): boolean {
  const validate = ajvInstance.compile(schema);
  const isValid = validate(data);
  return isValid;
}
