import * as yup from 'yup'

export const formSchema = yup.object().shape({
  name: yup.string().required('Обязательное поле').max(20, 'Не более 20 символов'),
  nickname: yup.string().required('Обязательное поле').max(20, 'Не более 20 символов'),
  previousNick: yup.string().required('Обязательное поле').max(100, 'Не более 100 символов'),
  previousClan: yup.string().required('Обязательное поле').max(100, 'Не более 100 символов'),
  pa: yup.number().typeError('Должно быть числом').required('Обязательное поле').min(0, 'Значение не может быть отрицательным').max(999, 'Максимум 999'),
  pz: yup.number().typeError('Должно быть числом').required('Обязательное поле').min(0, 'Значение не может быть отрицательным').max(999, 'Максимум 999'),
  fs: yup.number().typeError('Должно быть числом').required('Обязательное поле').min(0, 'Значение не может быть отрицательным').max(15000, 'Максимум 15000'),
  characterUrl: yup.string().required('Обязательное поле').matches(/^https:\/\/pwobs\.com/, 'Ссылка должна быть на https://pwobs.com'),
  recommends: yup.string().notRequired().max(100, 'Не более 100 символов'),
  reason: yup.string().required('Обязательное поле').max(100, 'Не более 100 символов'),
})