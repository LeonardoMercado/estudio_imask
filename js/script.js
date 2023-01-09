$(document).ready(function(){

  Inputmask({
    mask:"999",
  }).mask("#basicoPruebas");

  Inputmask({
    mask: '+(57) 9{3} 9{3} 9{4}',
  }).mask("#numeroCelular");

  Inputmask({
    mask: 'A{3} 9{3}'
  }).mask('#placaCarro');

  Inputmask({
    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace("mailto:", "");
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
        casing: "lower"
      }
    }
  }).mask('#emailDinamico');

  Inputmask({
    mask:"$ (.999){+|1},00",
    positionCaretOnClick: "radixFocus",
    radixPoint: ",",
    _radixDance: true,
    numericInput: true,
    placeholder: "0",
    definitions: {
        "0": {
            validator: "[0-9\uFF11-\uFF19]"
        }
    }
  }).mask('#decimalDinamica');

  Inputmask({
    mask:"(99.9)|(X)",
    keepStatic: false,
    definitions: {
      "X": {
        validator: "[xX]",
        casing: "upper"
      }
    }
  }).mask("#alternadorEjemplo");

  Inputmask({
    alias: 'currency',
    prefix: '$ ',
    groupSeparator: '.',
    radixPoint: ',',
    digits: 2,
    autoGroup: true
  }).mask("#dinero");




});