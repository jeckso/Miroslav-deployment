const db = require('../models');

const GenericManager = require('./GenericManager');

class QualityPropManager extends GenericManager {
  constructor() {
    super(db.quality_property);
  }
}

module.exports = new QualityPropManager();
