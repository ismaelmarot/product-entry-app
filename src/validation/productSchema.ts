// import * as yup from 'yup';

// export const productSchema = yup.object({
//   code: yup.string().optional(),
//   detail: yup.string().required("Detalle requerido"),
//   amount: yup.number().typeError("Número válido").positive('> 0').integer("Entero").required(),
//   cost_price: yup.number().typeError("Número válido").min(0, '>= 0').required(),
//   sale_price: yup.number().typeError("Número válido").min(0, '>= 0').required(),
//   usePercentage: yup.boolean(),
//   percentage: yup
//     .number()
//     .typeError("Número válido")
//     .min(0, '>= 0')
//     .when('usePercentage', {
//       is: true,
//       then: schema => schema.required('Porcentaje requerido'),
//       otherwise: schema => schema.notRequired(),
//     }),
// }).required();


import * as yup from 'yup';

export const productSchema = yup.object({
  code: yup.string().optional(),
  detail: yup.string().required("Detalle requerido"),
  amount: yup.number()
    .typeError("Número válido")
    .positive('> 0')
    .integer("Entero")
    .required(),
  cost_price: yup.number()
    .typeError("Número válido")
    .min(0, '>= 0')
    .required(),
  sale_price: yup.number()
    .typeError("Número válido")
    .min(0, '>= 0')
    .when('usePercentage', {
      is: false,
      then: schema => schema.required('Precio de venta requerido'),
      otherwise: schema => schema.notRequired()
    }),
  usePercentage: yup.boolean(),
  percentage: yup
    .number()
    .typeError("Número válido")
    .min(0, '>= 0')
    .when('usePercentage', {
      is: true,
      then: schema => schema.required('Porcentaje requerido'),
      otherwise: schema => schema.notRequired(),
    }),
}).required();
