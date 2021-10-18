# Info Sistemas - Interview

## Requisitos

- Criar projeto backend utilizando (Node.Js)
- Criar crud de veículos com os seguintes atributos (id, placa, chassi, renavam, modelo, marca, ano). Obs.: Os dados podem ser salvos em arquivos
- Criar teste unitários utilizando Mocha (Node) para cada uma das operações (create, read, update, delete)
- Criar recursos rest para acesso aos dados dos veículos


### Ambiente

#### Banco de dados

A api rest foi construida utilizando como banco de dados o MongoDB, ou seja, para subir o ambiente, é necessário da configuração do banco de dados.

Para facilitar, criei o arquivo do `docker-compose.yml` afim de facilitar.

Para subir o banco de dados, basta ter o docker compose instalado e executar o comando abaixo:
```sh
docker-compose up -d
```

Caso queira testar utilizando o mongodb atlas, basta ir no diretório  de configuração `config` e alterar os arquivos `default.json` ou `test.json` informando a string de conexão.

#### API

Para executar a API, basta seguir os seguintes passos:

1 - Banco de dados deve estar online  
2 - Dentro do diretório raiz, digitar o comando `npm install` no terminal para instalar as dependências.  
3 - Executar o comando `npm run dev` para executar a aplicação

#### Tests

Os testes estão utilizando o framework de testes `mocha` combinado com  o `chai`.

Para executar os testes, basta executar o comando `npm test`



