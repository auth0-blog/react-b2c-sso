import {maskCurrency, maskJs} from "mask-js";

export {
  convertToObject, applyMask
}

function convertToObject(type, value) {
  switch (type) {
    case 'currency':
      value = Number(value.toString().replace(/\D/g,''));
      break;
    case 'date':
      if (value.length === 10) {
        const parts = value.split('/');
        value = new Date(Number(parts[0]), Number(parts[1] - 1), Number(parts[2]));
      }
      break;
    case 'phone':
      value = value.replace(/\D/g,'');
      break;
  }
  return value;
}

function applyMask(type, value) {
  if (!value) return value;
  switch (type) {
    case 'currency':
      value = maskCurrency(value.toString());
      break;
    case 'date':
      const isDateObject = value.toISOString;
      if (isDateObject) {
        const length = value.length >= 10 ? 10 : value.length;
        value = maskJs('9999/99/99', value.toISOString().slice(0,length).replace(/-/g,""));
      } else {
        value = maskJs('9999/99/99', value);
      }
      break;
    case 'phone':
      value = maskJs('(99) 9999?9-9999', value);
      break;
  }
  return value;
}
