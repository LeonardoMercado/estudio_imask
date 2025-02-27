
const MAX_VALUE_CO = 3;
const MAX_VALUE_OTHERS = 6;
const PAIS = 'CO';

$(document).ready(function(){

  Inputmask({
    alias: "currency"
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

  Inputmask({
    mask: function () { 
      let mascara = '';
      let paisActual = $('#mascaraFuncion').attr('data');
      if(PAIS === paisActual){
        mascara = `AAA-9{${MAX_VALUE_CO}}`;
      } else {
        mascara = `AAA-9{${MAX_VALUE_OTHERS}}`;
      }
      return [mascara]; 
    }
  }).mask("#mascaraFuncion");

  Inputmask({
    mask: "999-999-9999",
    jitMasking: false,
  }).mask("#mascaraJITFalse");

  Inputmask({
    mask: "999-999-9999",
    jitMasking: true,
  }).mask("#mascaraJITTrue");

  Inputmask({
    mask: "999-999-9999",
    jitMasking: 5,
  }).mask("#mascaraJITUmbral");

  Inputmask({
    mask: '99/99/9999',
    placeholder: "dd/mm/yyyy"
  }).mask("#opcionesPlaceHolder");

  Inputmask({
    mask: 'a{3,9}',
    oncomplete: function(){ 
      mostradorError($('#errorOnComplete'),true); 
    },
    onincomplete: function(){
      mostradorError($('#errorOnComplete'),false); 
    }
  }).mask("#opcionesOnComplite");

  Inputmask({
    mask: 'a{3}-9{3}',
    oncleared: function(){ alert('Debe ingresar un valor para este input'); }
  }).mask("#opcionesCleared");

  Inputmask({
    mask: '+(57) 9{3} 9{3} 9{4}',
    "clearIncomplete": true
  }).mask("#opcionesClearIncomplete");

  Inputmask({
    alias: "datetime",
  }).mask("#aliasDateTime");

  Inputmask({
    alias: "decimal",
    prefix: '$ ',
    radixPoint: ",",
    autoGroup: true,
    groupSeparator: "\.",
    digits: 2,
    digitsOptional: false,
    placeholder: "0",
    oncomplete: function(){
      console.log("La máscara se ha completado");
    },
    onincomplete: function(){
      console.log("La máscara no se ha completado");
    }
  }).mask("#aliasDecimal");

  Inputmask({
    alias: "integer",
  }).mask("#aliasInteger");

  Inputmask({
    alias: "currency",
    radixPoint: ",",
    prefix: "COP$ ",
    autoGroup: true,
    groupSeparator: "\.",
    digits: 2,
    digitsOptional: false,
    placeholder: "0"
  }).mask("#aliasCurrencyCO");

  Inputmask({
    alias: "currency",
    radixPoint: ",",
    prefix: "MXN$ ",
    autoGroup: true,
    groupSeparator: "\.",
    digits: 2,
    digitsOptional: false,
    placeholder: "0"
  }).mask("#aliasCurrencyMX");

  Inputmask({
    alias: "email",
  }).mask("#aliasEmail");

  Inputmask({
    alias: "ip",
  }).mask("#aliasIp");

  Inputmask({
    alias: "mac",
  }).mask("#aliasMac");

  Inputmask({
    alias: "url",
  }).mask("#aliasUrl");




});

function mostradorError(select,esValido){
  select.removeClass('d-none');
  select.text(`El campo ${(esValido)?'':'NO'} es valido`);
  if(esValido){
    select.addClass('text-success');    
    select.removeClass('text-danger');    
  } else {
    select.removeClass('text-success');    
    select.addClass('text-danger');  
  }
}