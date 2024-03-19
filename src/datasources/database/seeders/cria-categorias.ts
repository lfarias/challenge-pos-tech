<<<<<<< HEAD
import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
=======
import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    const countCategoriasRow: any = await queryInterface.sequelize.query(
      "SELECT COUNT(*) AS count FROM Categorias"
    );

    if (countCategoriasRow[0][0].count === 0) {
      await queryInterface.bulkInsert("Categorias", [
        {
          id: uuidv4(),
          nome: "Lanche",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          nome: "Acompanhamento",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          nome: "Bebida",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          nome: "Sobremesa",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },

<<<<<<< HEAD
  // async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
  //   // Nao implementado
  // },
=======
  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    // Nao implementado
  },
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
};
