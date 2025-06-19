import * as yup from 'yup'

export const profileSchema = yup.object().shape({
  nickname: yup.string().required('Обязательное поле').max(20, 'Не более 20 символов'),
  pa: yup.number().typeError('Должно быть числом').required('Обязательное поле').min(0, 'Значение не может быть отрицательным').max(999, 'Максимум 999'),
  pz: yup.number().typeError('Должно быть числом').required('Обязательное поле').min(0, 'Значение не может быть отрицательным').max(999, 'Максимум 999'),
  fs: yup.number().typeError('Должно быть числом').required('Обязательное поле').min(0, 'Значение не может быть отрицательным').max(15000, 'Максимум 15000'),
})