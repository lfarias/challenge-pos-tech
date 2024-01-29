# Tech Challenge - FIAP

Este é o projeto desenvolvido durante a fase I do curso de pós-graduação em arquitetura de software da FIAP

Integrantes do grupo:
Julio Cesar de Olivera Knob - RM351077
Luciano Antunes de Farias - RM351076

### Changelog Fase II:
- **[Estrutura do Projeto](#estrutura-do-projeto)**: Refatoração do projeto para utilizar conceitos do `clean architecture`;
- **[Kubernetes](#kubernetes)**: Adicionado deploy utilizando Kubernetes;
- **`/pedido/realizar-pedido/{id}`**: Atualizado endpoint para criar o checkout e retornar o pedido com a fatura para aguardar o pagamento;
- **Webhook - Confirmação de pagamento**: Adicionado o endpoint para alterar o status de pagamento(aprovado/reprovado);
- **`/pedido/`**: Atualizado endpoint para listar pedidos:
  1. Por Padrao agora ela retorna na regra de Pronto > Em Preparo > Recebido e não mosta as Finalizadas;
  2. Mantida a possibilidade de filtrar por usuário e/ou status:
      - Rascunho;
      - Aguardando pagamento;
      - Falha em gerar pedido (Pagamento reprovado);
      - Aguardando preparo (Pagamento aprovado);
      - Em preparo;
      - Pronto;
      - Entregue;

## Propósito do projeto

Fornecer um sistema para gerenciamento de pedidos para uma empresa do ramo de serviços de alimentação.

## Stack utilizada

* Node.js (TS) - v16
* MySQL
* Express
* Docker
* Kubernetes

## Instalação do projeto

Este projeto está pronto para ser executado em um ambiente Docker. Por este motivo, será necessária apenas a instalação do Docker e/ou Kubernetes, não sendo necessária a instalação manual do projeto. Também não será necessária a instalação manual do banco de dados (MySQL).

Caso não tenha o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker/).

Para executar em ambiente de desenvolvimento:

* Faça o `fork` e `clone` este repositório em seu computador;
* Entre no diretório local onde o repositório foi clonado;

### Executar em ambiente Kubernetes

Os arquivos para o Kubernetes se encontram no diretório ```k8s/```:

1. Crie o secrets como o exemplo abaixo ou use um de terceiros com as envs listadas:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: fiap-tech-secrets
type: Opaque
data: # value = Base64
  db_username: dXNlcl90ZWNo
  db_password: dGVzdHRlc3Q=
  db_root_password: YWRtaW4xMjM=
  db_name: ZmlhcC1zb2F0LXByb2plY3RfZGI=
  jwt_secret: dTZCWTh3NHMzYXlHNjJvRzA1TVYxSE96eTllYm9UYVdoUWpIQ0ZpWmhjMjBFYlIwOGdzWlZPdUdQUGVVVUVJMg==
```

2. Execute o comando `kubectl apply -f <./secret.yaml>` no diretório raiz do projeto para gerar os secrets;

3. Execute os comandos abaixo para subir as ferramentas do ambiente Kubernetes:

Banco de dados:
```
kubectl apply -f k8s/db/db.pvc.yaml
kubectl apply -f k8s/db/db.deployment.yaml
kubectl apply -f k8s/db/db.svc.yaml
```

API:
```
kubectl apply -f k8s/api/api.deployment.yaml
kubectl apply -f k8s/api/api.svc.yaml
```

A API estará pronta para receber requisições a partir da URL base http://localhost:30080/.
**OBS**: Caso a URL base não esteja disponível em `localhost`, execute o comando `minikube ip` no terminal e utilize o IP disponibilizado no lugar de `localhost`. Exemplo: `192.168.49.2:30080/api/produto`.


### Docker Compose

Utilize o comando `docker compose up` para "construir" (*build*) e subir o servidor local, expondo a porta 3000 em `localhost`. Além do container da `api` também subirá o serviço `db` com o banco de dados de desenvolvimento.

**IMPORTANTE:** Esta API está programada para ser acessada a partir de `http://localhost:3000` e o banco de dados utiliza a porta `3306`. Certifique-se de que não existam outros recursos ocupando as portas `3000` e `3306` antes de subir o projeto.

Para derrubar o serviço, execute o comando `docker compose down`.

## Utilizacao

Os projeto create o metodo de pagamento no banco(QR Code) e as categorias padroes quando iniciado.

## Endpoints

Esta API fornece documentação no padrão OpenAPI.
Os endpoints disponíveis, suas descrições e dados necessários para requisição podem ser consultados e testados em http://localhost/3000/docs.