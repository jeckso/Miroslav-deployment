class GenericManager {
  constructor(model) {
    this.model = model;
    this.getById;
  }

  get() {
    return this.model.findAll();
  }

  getWhere(opt) {
    return this.model.findAll({ where: opt, raw: true });
  }

  getIncludes(model) {
    return this.model.findAll({
      raw: true,
      include: model,
    });
  }
  getById(id) {
    return this.model.findByPk(Number(id));
  }

  update(id, values) {
    return this.model
      .update(values, {
        where: { id: Number(id) },
        returning: true,
        plain: true,
      })
      .then(result => result[1]);
  }

  create(values) {
    console.log('00000', this.model);

    return this.model
      .findOrCreate({ where: values, defaults: values })
      .then(([data, created]) => {
        if (created) {
          return data.get();
        }
      });
  }

  delete(id) {
    return this.model.findByPk(id).destroy();
  }
}

module.exports = GenericManager;
