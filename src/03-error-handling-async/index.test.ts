import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test';
    const result = await resolveValue(value);
    expect(result).toBe('test');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'This is a custom error message';
    const fn = () => throwError(msg);
    expect(fn).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    const fn = () => throwError();
    expect(fn).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const fn = () => throwCustomError();
    expect(fn).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
