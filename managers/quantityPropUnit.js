const db = require('../models');

const GenericManager = require('./GenericManager');

class QuantityPropUnitManager extends GenericManager {
  constructor() {
    super(db.quantity_propertiy_unit);
  }
}

module.exports = new QuantityPropUnitManager();
