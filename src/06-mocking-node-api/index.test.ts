// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mock = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mock, 1000);
    expect(spy).toHaveBeenCalledWith(mock, 1000);
    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const mock = jest.fn();
    doStuffByTimeout(mock, 1000);
    jest.advanceTimersByTime(1000);
    expect(mock).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mock = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(mock, 1000);
    jest.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledWith(mock, 1000);
    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mock = jest.fn();
    doStuffByInterval(mock, 1000);

    jest.advanceTimersByTime(1000);
    expect(mock).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(mock).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'text.txt';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('nonexistent.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockContent = 'Hello, world!';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(mockContent);

    const result = await readFileAsynchronously('test.txt');
    expect(result).toBe(mockContent);
  });
});
