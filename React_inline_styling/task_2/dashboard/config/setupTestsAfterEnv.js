// Cleanup after tests to ensure proper process exit
afterAll(async () => {
  jest.clearAllTimers();
  // Give a small delay for any pending async operations
  await new Promise(resolve => setTimeout(resolve, 100));
});
