export const formatDocumentoId = (value: string) => {
  let numbers = value.replace(/\D/g, '');

  numbers = numbers.replace(/^0+/, '');

  if (numbers === '') return '0';

  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
