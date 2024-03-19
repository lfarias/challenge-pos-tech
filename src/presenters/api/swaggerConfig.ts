import swaggerJsdoc from 'swagger-jsdoc';
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fiap Tech Challenge Soat',
      version: '1.0.0',
<<<<<<< HEAD
      description: 'Projeto Fase I - SOAT turma I',
    },
    servers: [
      { url: "/api" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          name: 'Authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
=======
      description: 'Projeto Fase I - SOAT turma 32',
    },
    servers: [
      { url: "/api" }
    ]
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  },
  apis: ['**/routers/*.*'],
};

const specs = swaggerJsdoc(options);

export default specs;
