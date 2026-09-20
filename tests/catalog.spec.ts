import { expect, test } from '../src/fixtures/test';
import { products } from '../src/data/products';

test.describe('Catálogo @regression', () => {
  test('lista produtos disponíveis e indisponíveis', async ({ catalogPage }) => {
    await catalogPage.goto();

    await catalogPage.expectProduct(products.blackHeels.name, products.blackHeels.price);
    const soldOutProduct = catalogPage.product(products.soldOutBrownShades.name);
    await expect(soldOutProduct).toContainText(/sold out/i);
    await expect(soldOutProduct).toContainText(products.soldOutBrownShades.price);
  });

  test('abre um produto a partir do catálogo', async ({ catalogPage, productPage }) => {
    await catalogPage.goto();
    await catalogPage.openProduct(products.greyJacket.name);

    await productPage.expectProduct(products.greyJacket.name, products.greyJacket.price);
    await productPage.expectPath(/\/products\/grey-jacket$/);
  });
});
