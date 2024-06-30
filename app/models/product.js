import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import Logger from "../utils/Logger.js"; // Import Logger to use it within the model

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING, // Change to standard string for URL
      allowNull: true,
    },
    components: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    discount: {
      type: DataTypes.FLOAT, // percentage of discount on product
      allowNull: true,
      defaultValue: 0.0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    hooks: {
      beforeCreate: (product, options) => {
        Logger.debug(`Before Create Hook: ${JSON.stringify(product)}`);
      },
      beforeUpdate: (product, options) => {
        Logger.debug(`Before Update Hook: ${JSON.stringify(product)}`);
      },
    },
  }
);

export default Product;
