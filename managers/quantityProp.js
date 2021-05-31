const db = require('../models');

const GenericManager = require('./GenericManager');

class QuantityPropManager extends GenericManager {
  constructor() {
    super(db.quantity_property);
  }
}

module.exports = new QuantityPropManager();
