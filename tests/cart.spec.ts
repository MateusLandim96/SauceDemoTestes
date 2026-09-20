import { test } from '../src/fixtures/test';
import { products } from '../src/data/products';

test.describe('Carrinho @regression', () => {
  test('inicia vazio em um novo contexto', async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.expectEmpty();
  });

  test('adiciona um produto ao carrinho', async ({ productPage, cartPage }) => {
    await productPage.goto(products.greyJacket.path);
    await productPage.addToCart();

    await cartPage.goto();
    await cartPage.expectProduct(products.greyJacket.name, products.greyJacket.price);
  });
});
