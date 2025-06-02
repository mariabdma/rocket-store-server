# Rocket Store - Backend

Este é o backend de um sistema de compras online desenvolvido com NestJS, TypeScript e SQLite. A aplicação permite o gerenciamento de produtos e a simulação de uma compra por meio de um carrinho.

## Funcionalidades

- Cadastro, edição, listagem e exclusão de produtos
- Consulta de produto por ID
- Finalização de compras com verificação de estoque
- Validações com class-validator
- Testes unitários com Jest
- Banco de dados SQLite

## Testes

Os testes unitários cobrem os principais casos de uso dos serviços:

```bash
pnpm test
```

## Instalação e execução

### Pré-requisitos

- Node.js 18+
- PNPM

### Passo a passo

```bash
git clone https://github.com/mariabdma/rocket-store-server.git
cd rocket-store-server
pnpm install
pnpm start:dev
```

A API estará disponível em http://localhost:3000.

## Estrutura

```
src/
├── cart/               # Módulo de finalização de compra
├── products/           # Módulo de produtos
├── main.ts             # Arquivo principal
└── app.module.ts       # Módulo raiz
```

## Exemplo de requisição POST /cart/checkout

```json
{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ]
}
```

Resposta esperada:

```json
{
  "message": "Compra finalizada com sucesso.",
  "summary": [
    {
      "productId": 1,
      "name": "Camiseta Azul",
      "remaining": 8
    },
    {
      "productId": 3,
      "name": "Lip Oil",
      "remaining": 14
    }
  ]
}
```

## Exemplo de requisição POST /products

```json
{
  "name": "Camiseta Azul",
  "category": "CLOTHING",
  "description": "Camiseta de algodão azul marinho",
  "available_units": 10,
  "price": 59.9,
  "sale_percentage": 10
}
```

## Listar e Buscar produtos

Endpoints:
GET /products
GET /products/:id

## Atualizar produto

Endpoint:
PUT /products/:id

```json
{
  "price": 49.9,
  "available_units": 20
}
```

## Remover produto

Endpoint: DELETE /products/:id
