const db = require('../models');

const GenericManager = require('./GenericManager');

class AlphabetManager extends GenericManager {
  constructor() {
    super(db.alphabet);
  }
}

module.exports = new AlphabetManager();
