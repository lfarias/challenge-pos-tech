# Tech Challenge - FIAP

Este é o projeto desenvolvido durante a fase I do curso de pós-graduação em arquitetura de software da FIAP

Integrantes do grupo:
Julio Cesar de Olivera Knob - RM351077
Luciano Antunes de Farias - RM351076

## Propósito do projeto

Fornecer um sistema para gerenciamento de pedidos para uma empresa do ramo de serviços de alimentação.

## Stack utilizada

* Node.js (TS) - v16
* MySQL
* Express
* Docker

## Instalação do projeto

Este projeto está pronto para ser executado em um ambiente Docker. Por este motivo, será necessária apenas a instalação do Docker, não sendo necessária a instalação manual do projeto. Também não será necessária a instalação manual do banco de dados (MySQL).

[documentação oficial do Docker](https://docs.docker.com/get-docker/).

Para executar em ambiente de desenvolvimento basta seguir os passos abaixo:

* Faça `clone` este repositório em seu computador;
* Entre no diretório local onde o repositório foi clonado;
* Utilize o comando `docker compose up` para "construir" (*build*) e subir o servidor local, expondo a porta 3000 em `localhost`. Além do container da `api` também subirá o serviço `db` com o banco de dados de desenvolvimento.

**IMPORTANTE:** Esta API está programada para ser acessada a partir de `http://localhost:3000` e o banco de dados utiliza a porta `3306`. Certifique-se de que não existam outros recursos ocupando as portas `3000` e `3306` antes de subir o projeto.

Para derrubar o serviço, execute o comando `docker compose down`.

## Utilizacao

Os projeto create o metodo de pagamento no banco(QR Code) e as categorias padroes quando iniciado.

## Endpoints

Esta API fornece documentação no padrão OpenAPI.
Os endpoints disponíveis, suas descrições e dados necessários para requisição podem ser consultados e testados em http://localhost/3000/docs.