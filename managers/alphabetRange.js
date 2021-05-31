const db = require('../models');

const GenericManager = require('./GenericManager');

class AlphabetRangeManager extends GenericManager {
  constructor() {
    super(db.alphabet_range);
  }
}

module.exports = new AlphabetRangeManager();
