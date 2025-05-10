// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const result = getBankAccount(70);
    expect(result.getBalance()).toBe(70);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const result = getBankAccount(70);
    const fn = () => result.withdraw(80);
    expect(fn).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    const result = getBankAccount(70);
    const account = getBankAccount(0);
    const fn = () => result.transfer(80, account);
    expect(fn).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const result = getBankAccount(70);
    const fn = () => result.transfer(70, result);
    expect(fn).toThrow();
  });

  test('should deposit money', () => {
    const result = getBankAccount(70);
    result.deposit(30);
    expect(result.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    const result = getBankAccount(70);
    result.withdraw(30);
    expect(result.getBalance()).toBe(40);
  });

  test('should transfer money', () => {
    const result = getBankAccount(70);
    const account = getBankAccount(0);
    result.transfer(70, account);
    expect(result.getBalance()).toBe(0);
    expect(account.getBalance()).toBe(70);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = getBankAccount(70);
    const balance = await result.fetchBalance();
    if (balance === null) {
      expect(balance).toBeNull();
      return;
    }
    expect(typeof balance).toBe('number');
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const result = getBankAccount(70);
    const oldBalance = result.getBalance();
    await result.synchronizeBalance();
    const newBalance = result.getBalance();

    expect(typeof newBalance).toBe('number');
    expect(newBalance).not.toBe(oldBalance);
    expect(newBalance).toBeGreaterThanOrEqual(0);
    expect(newBalance).toBeLessThanOrEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const result = getBankAccount(70);

    result.fetchBalance = async () => null;

    await expect(result.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
