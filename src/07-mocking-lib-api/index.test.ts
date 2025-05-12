// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    const way = '/users';
    jest.useFakeTimers();
    throttledGetDataFromApi(way);
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    spy.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.fn();
    jest.spyOn(axios, 'create').mockReturnValue({
      get: getSpy,
    } as unknown as AxiosInstance);
    jest.useFakeTimers();
    throttledGetDataFromApi('/users');
    jest.runAllTimers();
    expect(getSpy).toHaveBeenCalledWith('/users');
  });
});
