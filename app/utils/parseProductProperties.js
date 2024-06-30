import Logger from "./Logger.js";

function safeJSONParse(data) {
  let parsedData = data;
  try {
    while (typeof parsedData === "string") {
      parsedData = JSON.parse(parsedData);
    }
  } catch (e) {
    // If parsing fails, return the original data
    return data;
  }
  return parsedData;
}

export function parseProductProperties(product) {
  try {
    const parsedProduct = { ...product.toJSON() };

    Logger.debug(`Raw product data: ${JSON.stringify(parsedProduct)}`);

    // Parse components if it's a string
    if (typeof parsedProduct.components === "string") {
      parsedProduct.components = safeJSONParse(parsedProduct.components);
    }

    // Ensure components is always an array
    if (!Array.isArray(parsedProduct.components)) {
      parsedProduct.components = [];
    }

    Logger.debug(`Parsed product data: ${JSON.stringify(parsedProduct)}`);

    return parsedProduct;
  } catch (error) {
    Logger.error(`Express app, parseProductProperties: ${error}`);
    console.error("Failed to parse product properties:", error);
    return product; // Return the original product if parsing fails
  }
}
