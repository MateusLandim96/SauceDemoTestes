import { test } from '../src/fixtures/test';

test.describe('Autenticação @regression', () => {
  test('exibe os controles necessários para o login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectLoaded();
  });
});
