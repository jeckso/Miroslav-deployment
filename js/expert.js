const axios = require('axios');
const $ = require('jquery');

var currAlph;
var currClasses;
var currClass;
const renderClasses = classes => {
  let str = '';
  classes.forEach(
    el =>
      (str += `
    <li class="list-group-item" data-alph=${el.alphabet_id} data-class=${el.id}>
        <span> ${el.name} </span>
        <button type="button" class="btn btn-outline-dark config-props"> class details </button>`),
  );
  console.log('renderClasses', str);
  $('#classes').html(str);
};

$('#alphabets').click(e => {
  if (e.target.className.includes('add-class')) {
    alphId = e.target.parentNode.dataset.id;
    alphName = e.target.parentNode.firstChild.innerText;
    currAlph = alphId;
    console.log(currAlph);
    return axios.get(`/expert/classes/${alphId}`).then(result => {
      currClasses = result.data.classes;
      console.log(result.data.classes);
      $('#class-cont').removeClass('hidden');
      $('#properties-list').removeClass('hidden');
      $('#class-cont').prepend(`<h3>${alphName} classes</h3>`);
      renderClasses(result.data.classes);
    });
  }
});

$('#alphAdd').click(() => {
  const name = $('#alphInput').val();
  return axios.post('/expert/alphabet', { name: name });
});

$('#classAdd').click(() => {
  const name = $('#classInput').val();
  return axios.post(`/expert/classes/${currAlph}`, { name: name });
});

$('#quanAdd').click(() => {
  const name = $('#quanNameInput').val();
  const sign = $('#quanSignInput').val();
  const unitId = $('#unit-select').val();
  return axios.post(`/expert/quantity`, { name, sign, unitId });
});

$('#qualAdd').click(() => {
  const name = $('#qualNameInput').val();
  const sign = $('#qualSignInput').val();
  return axios.post(`/expert/quality`, { name, sign }).then(result => {
    window.location.reload();
  });
});

$('#properties-list').click(e => {
  if (e.target.className.includes('add-prop-quantity')) {
    quantityPropId = e.target.parentNode.dataset.id;
    quantityPropMin = e.target.parentNode.querySelector(
      'input[name="min-value-input"]',
    ).value;
    quantityPropMax = e.target.parentNode.querySelector(
      'input[name="max-value-input"]',
    ).value;

    axios.post('/expert/alphabetRange', {
      alphabet_id: currAlph,
      quantity_property_id: quantityPropId,
      min_value: quantityPropMin,
      max_value: quantityPropMax,
    });
  }
  if (e.target.className.includes('add-prop-quality')) {
    console.log(1111);

    qualityPropId = e.target.parentNode.dataset.id;

    axios.post('/expert/classesQuality', {
      classes: currClasses,
      quality_property_id: qualityPropId,
      property_value: 0,
    });
  }
});

$('#classes').click(async e => {
  if (e.target.className.includes('config-props')) {
    console.log('clicked!');

    currClass = e.target.parentNode.dataset.class;

    const { data: classQuantity } = await axios.get('/expert/classQuantity');
    axios
      .get(`/expert/quantity?alphabet_id=${currAlph}`)
      .then(({ data: { quantities, alphRange } }) => {
        let str = '';
        console.log(quantities);

        quantities.forEach(
          (el, ind) =>
            (str += `
    <li class="list-group-item quantity" data-alph=${
      el.alphabet_id
    } data-quantity=${el.id}>
        <span> ${el.name} </span>
        <div>
          <span> Where is true </span>
          <input type="number" name="x1" value=${classQuantity.find(
            clQ => clQ.quantity_property_id === el.id,
          ).values[0] || alphRange[ind].min_value} placeholder="Value"/>
          <input type="number" name="x2" value=${classQuantity.find(
            clQ => clQ.quantity_property_id === el.id,
          ).values[1] || alphRange[ind].max_value} placeholder="Dep"/>
        </div>
        `),
        );

        return str;
      })
      .then(async str => {
        const { data: qualities } = await axios.get('/expert/quality');
        const { data: classQ } = await axios.get('/expert/classesQuality');

        const currClassesQ = classQ.filter(classPropQ =>
          currClasses.some(currC => currC.id === classPropQ.class_id),
        );

        qualities.forEach(
          (el, ind) =>
            currClassesQ.some(
              currClassQ => currClassQ.quality_property_id === el.id,
            ) &&
            (str += `
        <li class="list-group-item quality" data-alph=${
          el.alphabet_id
        } data-quality=${el.id}>
            <span> ${el.name} </span>
            <div>
              <span> Select value </span>
              <select defaultValue=${currClassesQ[ind].property_value || '0'}>
                <option value="1">1</option>
                <option value="0">0</option>
              </select>
            </div>
            `),
        );

        $('#class-props').html(str);
        $('#button-handler').html(
          ' <button type="button" class="btn btn-outline-dark " id="save-quantity-props"> save </button>',
        );
      });
  }
});

$('#button-handler').click(e => {
  console.log(111, 2222, 3333);

  $('#class-props')
    .find('li')
    .each(function() {
      console.log(this, currClass);
      if (this.className.includes('quantity')) {
        const x1 = $(this).find('input')[0].value;
        const x2 = $(this).find('input')[1].value;

        console.log(x1, x2);

        axios.post('/expert/classQuantity', {
          values: [x1, x2],
          class_id: +currClass,
          quantity_property_id: $(this).data('quantity'),
        });
      } else if (this.className.includes('quality')) {
        const property_value = $(this).find('select').value;
        axios.post('/expert/classQuality', {
          property_value,
          class_id: +currClass,
          quality_property_id: $(this).data('quality'),
        });
      }
    });
});
