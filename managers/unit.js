const db = require("../models");

const GenericManager = require("./GenericManager");

class UnitManager extends GenericManager {
  constructor() {
    super(db.unit);
  }
}

module.exports = new UnitManager();
