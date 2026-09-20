import { test } from '../src/fixtures/test';
import { products } from '../src/data/products';

test.describe('Busca @regression', () => {
  test('encontra produtos por termo', async ({ homePage, searchPage }) => {
    await homePage.goto();
    await homePage.header.search('jacket');

    await searchPage.expectResult(products.greyJacket.name);
    await searchPage.expectPath(/\/search\?.*q=jacket/i);
  });
});
