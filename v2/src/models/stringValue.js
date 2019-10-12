export class StringValue {
  static NAME = 'StringValue';

  static schema = {
    name: StringValue.NAME,
    properties: {
      value: { type: 'string' },
    },
  };
}
