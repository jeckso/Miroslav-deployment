const db = require('../models');

const GenericManager = require('./GenericManager');

class ClassesQuantityPropManager extends GenericManager {
  constructor() {
    super(db.classes_quantity_property);
  }
}

module.exports = new ClassesQuantityPropManager();
