# Desafio 3: API de Otimização de Rotas de Entrega Escalável

API RESTful robusta e escalável para gerenciamento e otimização de rotas de entrega[cite: 28], desenvolvida como parte do Desafio 3 do programa de bolsas da Compass UOL.

A aplicação permite o cadastro e gerenciamento de pontos de entrega, o cálculo de rotas otimizadas utilizando o algoritmo do Vizinho Mais Próximo, e a consulta do histórico de cálculos. 

## Tecnologias Utilizadas

-   **Framework**: NestJS 
-   **Linguagem**: TypeScript
-   **Banco de Dados**: MongoDB com Mongoose 
-   **Testes**: Jest para testes unitários e de integração (com Supertest) 
-   **Validação**: `class-validator` e `class-transformer` 
-   **Segurança**: Guards para autenticação via API Key e Throttler para Rate Limiting 
-   **Containerização**: Docker e Docker Compose 
-   **Orquestração**: Kubernetes (manifestos de Deployment e Service) 

## Como Executar o Projeto

### Pré-requisitos

-   Node.js (v18 ou superior)
-   Docker e Docker Compose
-   Um cliente de API (como Postman ou Insomnia)

### Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/gtiAnderson/logistics-route-optimizer-Nestjs
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto. Você pode copiar o conteúdo do arquivo `.env.example` e preencher com seus dados.

    ***.env.example***
    ```
    MONGODB_URI=SUA_URI_DE_CONEXAO_DO_MONGODB_ATLAS
    API_KEY=SUA_CHAVE_SECRETA_PARA_A_API
    ```

### Executando com Docker (Recomendado)

Com o Docker Desktop em execução, rode o seguinte comando no terminal:

```bash
docker-compose up --build
```
## Endpoints da API

A tabela abaixo descreve todos os endpoints disponíveis na aplicação.

| Método | Rota | Protegido? | Descrição |
| :--- | :--- | :---: | :--- |
| `POST` | `/pontos` | Sim  | Cria um novo conjunto de pontos de entrega.  |
| `GET` | `/pontos/:id` | Não | Busca um conjunto de pontos pelo seu ID.  |
| `PATCH`| `/pontos/:id` | Sim  | Atualiza ou adiciona pontos a um conjunto existente.  |
| `GET` | `/rotas/historico` | Não | Lista o histórico de rotas calculadas, ordenado por data.  |
| `GET` | `/rotas/:id` | Sim  | Calcula a rota otimizada para um conjunto de pontos e a salva no histórico.  |
| `DELETE`| `/rotas/:id` | Sim  | Deleta uma rota calculada do histórico pelo seu ID. |
