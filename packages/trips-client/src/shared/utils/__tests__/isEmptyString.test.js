import isEmptyString from '../isEmptyString';

describe('isEmptyString', () => {
  it('should return true if passed null', () => {
    expect(isEmptyString(null)).toBeTruthy();
  });

  it('should return true if passed undefined', () => {
    const x = undefined;
    expect(isEmptyString(x)).toBeTruthy();
  });

  it('should return true if passed a 0 length string', () => {
    expect(isEmptyString('')).toBeTruthy();
  });

  it('should return true if passed only spaces', () => {
    expect(isEmptyString('   ')).toBeTruthy();
  });

  it('should return true if passed more complex whitespace', () => {
    expect(isEmptyString('  \n \r\t ')).toBeTruthy();
  });

  it('should return false if passed an actual value', () => {
    expect(isEmptyString('Hello Brian')).toBeFalsy();
  });

  it('should return false if passed a string with characters, even if they are surrounded by whitespace', () => {
    expect(isEmptyString('   Hello Brian   ')).toBeFalsy();
  });
});
