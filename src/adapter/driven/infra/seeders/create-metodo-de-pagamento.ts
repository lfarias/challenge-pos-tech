import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    const countPaymentMethodsRow: any =
      await queryInterface.sequelize.query(
        "SELECT COUNT(*) AS count FROM PaymentMethods"
      );

    if (countPaymentMethodsRow[0][0].count === 0) {
      await queryInterface.bulkInsert("PaymentMethods", [
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

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    // Nao implementado
  },
};
