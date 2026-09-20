# Testes E2E — Sauce Demo Shopify

Suíte de testes Playwright + TypeScript para `https://sauce-demo.myshopify.com`, organizada para ser legível, escalável e adequada a CI.

## Arquitetura

```text
src/
├── components/       # Partes compartilhadas da interface (ex.: cabeçalho)
├── data/             # Massa de teste imutável e centralizada
├── fixtures/         # Injeção tipada dos Page Objects
└── pages/            # Page Objects por domínio
tests/                # Especificações e asserções de negócio
playwright.config.ts  # Ambientes, browsers, evidências e paralelismo
```

Os Page Objects encapsulam navegação e interação. As expectativas de negócio permanecem nos testes, exceto verificações de estado da própria página. Cada teste recebe um contexto isolado do navegador, evitando dependência de ordem e vazamento de carrinho/cookies.

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Instalação

```bash
npm install
npx playwright install
```

Opcionalmente, copie `.env.example` para `.env` e ajuste a URL, locale ou fuso horário.

## Execução

```bash
npm test                 # suíte completa em desktop e smoke mobile
npm run test:smoke       # jornada crítica
npm run test:regression  # regressão funcional
npm run test:chromium    # apenas Chromium
npm run test:mobile      # smoke no Pixel 7
npm run test:headed      # navegador visível
npm run test:ui          # modo interativo do Playwright
npm run typecheck        # validação estática TypeScript
npm run report           # abre o último relatório HTML
```

Também é possível trocar o ambiente sem alterar o código:

```bash
BASE_URL=https://outro-ambiente.exemplo npm test
```

No PowerShell:

```powershell
$env:BASE_URL='https://outro-ambiente.exemplo'; npm.cmd test
```

## Estratégia de cobertura

- **Smoke:** disponibilidade da home, catálogo e detalhe de produto.
- **Regressão:** catálogo, indisponibilidade, busca, carrinho e formulário de login.
- **Compatibilidade:** Chromium, Firefox, WebKit e viewport mobile.
- **Diagnóstico:** trace, vídeo e screenshot são preservados em falhas.
- **CI:** retries somente no pipeline, bloqueio de `test.only` e relatório JUnit/HTML.

O checkout não é concluído para não criar pedidos nem acionar integrações externas em uma loja pública. Para ampliar a cobertura, use uma loja de homologação controlada e dados descartáveis.
