var express = require('express');
var router = express.Router();
const alphManager = require('../managers/alphabet');
const alphRangeManager = require('../managers/alphabetRange');
const classManager = require('../managers/class');
const qualityManager = require('../managers/qualityProp');
const quantityManager = require('../managers/quantityProp');
const classQualityManager = require('../managers/classesQualityProp');
const classQuantityManager = require('../managers/classQuantityProp');
const unitManager = require('../managers/unit');
const qpUnit = require('../managers/quantityPropUnit');
const db = require('../models/index');

const getDataForRender = async () => {
  const alphabets = await alphManager.get();
  const alphRanges = await alphRangeManager.get();
  const quantity = await quantityManager.get();
  const quality = await qualityManager.get();
  const units = await unitManager.get();

  return { alphabets, quantity, quality, units, alphRanges };
};

router.get('/', function(req, res, next) {
  return getDataForRender().then(result => {
    res.render('expert', result);
  });
});

router.post('/alphabet', (req, res) => {
  return alphManager.create(req.body);
});

router.post('/alphabetRange', (req, res) => {
  return alphRangeManager.create(req.body);
});

router.delete('/alphabetRange', async (req, res) => {
  const alphRange = alphRangeManager.getWhere(req.body);
  console.log('alphRange', alphRange);

  return alphRangeManager.delete(alphRange.id);
});

router.get('/classes/:id', (req, res) => {
  return classManager.getWhere({ alphabet_id: req.params.id }).then(result => {
    console.log(result);
    res.send({ classes: result });
  });
});

router.post('/classes/:id', (req, res) => {
  return classManager.create({
    name: req.body.name,
    alphabet_id: req.params.id,
  });
});

router.post('/quality', (req, res) => {
  return qualityManager.create(req.body).then(result => {
    res.send(result);
  });
});

router.post('/quantity', (req, res) => {
  return quantityManager
    .create({ name: req.body.name, sign: req.body.sign })
    .then(result => {
      return qpUnit.create({
        quantity_property_id: result.id,
        unit_id: req.body.unitId,
      });
    });
});

router.get('/quality', (req, res) => {
  return qualityManager.getWhere().then(result => {
    res.send(result);
  });
});

router.get('/quantity', (req, res) => {
  const { alphabet_id } = req.query;

  console.log('alphabet_id', alphabet_id);

  alphRangeManager.getWhere({ alphabet_id }).then(alphQuantities => {
    console.log('alphQuantities', alphQuantities);

    quantityManager
      .get()
      .then(quantities => {
        return quantities.filter(quantity => {
          return alphQuantities.some(alphQ => {
            console.log(+quantity.id, +alphQ.quantity_property_id);

            return +quantity.id === +alphQ.quantity_property_id;
          });
        });
      })
      .then(filtered =>
        res.send({ quantities: filtered, alphRange: alphQuantities }),
      );
  });
});

router.post('/classQuantity', (req, res) => {
  console.log(req.body);

  return classQuantityManager.create(req.body);
});

router.get('/classQuantity', (req, res) => {
  console.log(req.body);

  return classQuantityManager.get().then(result => res.send(result));
});

router.post('/classQuality', (req, res) => {
  console.log('test', req.body);

  return classQualityManager.create(req.body);
});

router.post('/classesQuality', (req, res) => {
  console.log(req.body);

  const { classes, ...props } = req.body;

  classes.forEach(classQ => {
    classQualityManager.create({ class_id: classQ.id, ...props });
  });
});

router.get('/classesQuality', (req, res) => {
  console.log(req.body);

  return classQualityManager.get().then(classesQ => res.send(classesQ));
});

module.exports = router;
