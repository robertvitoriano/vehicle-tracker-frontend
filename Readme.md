
## **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

---

## **Instalação**

1. Instale as dependências:
   ```bash
   npm install
   ```

---

## **Executando a Aplicação**

Para rodar a aplicação em ambiente de desenvolvimento:
```bash
npm run dev
```

Acesse a aplicação no navegador em: [http://localhost:5173](http://localhost:5173)

---

## **Testes**

### **Testes Unitários (React testing library)**

Os testes unitários utilizam o **Jest** e o **React Testing Library**.

#### Executar todos os testes unitários:
```bash
npm test
```

### **Testes E2E (Cypress)**

Os testes e2e utilizam o **Cypress** para simular interações no navegador.

#### Execute o projeto:
```bash
npm run dev
```

#### Executar os testes de integração no terminal:
```bash
npm run test:e2e
```

---

## **Scripts Disponíveis**

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run test`: Executa os testes unitários.
- `npm run test:e2e`: Abre a interface do Cypress para testes de integração.
- `npm run build`: Gera a build de produção.
- `npm run preview`: Visualiza a build de produção localmente.
- `npm run format`: Formata o código usando o Prettier.

---

## **Estrutura do Projeto**

- **src**: Contém o código-fonte da aplicação.
- **pages**: Páginas principais da aplicação com alguns testes unitários.
- **components**: Componentes reutilizáveis.
- **cypress**: Configurações e testes do Cypress.

---

## **Configuração do Ambiente**

### Variáveis de Ambiente

Certifique-se de configurar as variáveis de ambiente no arquivo .env na raiz do projeto. Exemplo:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_API_KEY=<SUA_CHAVE_GOOGLE_MAPS>
VITE_API_TOKEN=<ADICIONE_O_TOKEN>
```
