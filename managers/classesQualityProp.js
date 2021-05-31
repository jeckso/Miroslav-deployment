const db = require('../models');

const GenericManager = require('./GenericManager');

class ClassesQualityPropManager extends GenericManager {
  constructor() {
    super(db.classes_quality_property);
  }
}

module.exports = new ClassesQualityPropManager();
