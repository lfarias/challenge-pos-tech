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
    const countMetodosDePagamentoRow: any =
      await queryInterface.sequelize.query(
        "SELECT COUNT(*) AS count FROM MetodosDePagamento"
      );

    if (countMetodosDePagamentoRow[0][0].count === 0) {
      await queryInterface.bulkInsert("MetodosDePagamento", [
        {
          id: uuidv4(),
          nome: "QR Code",
          ativo: true,
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
