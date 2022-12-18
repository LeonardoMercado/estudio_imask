

$(document).ready(function(){
  Inputmask({
    mask: '+(57) 9{3} 9{3} 9{4}',
  }).mask("#numeroCelular");

  Inputmask({
    mask: 'A{3} 9{3}'
  }).mask('#placaCarro');
});