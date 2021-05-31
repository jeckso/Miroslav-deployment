const db = require('../models');

const GenericManager = require('./GenericManager');

class ClassManager extends GenericManager {
  constructor() {
    super(db.class);
  }
}

module.exports = new ClassManager();
