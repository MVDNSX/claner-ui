import { useForm } from 'react-hook-form'
import InputForm from '../../UI/CustomInput/CustomInput'
import style from './EditProfileModal.module.scss'

function EditProfileModal({data}) {
  const {nickname, pa, pz, fs, class_id} = data

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname,
      pa,
      pz,
      fs,
    }
  })
  
  
  const onSubmit = (data) => {
    
  }

  return (
    <form className={style.profile_modal} onSubmit={handleSubmit(onSubmit)}>
      <InputForm label='Ник:' {...register('nickname')} error={errors.nickname?.message}/>
      <InputForm label='ПА:' {...register('pa')} error={errors.pa?.message}/>
      <InputForm label='ПЗ:' {...register('pz')} error={errors.pz?.message}/>
      <InputForm label='БД:' {...register('fs')} error={errors.fs?.message}/>
    </form>
  )
}

export default EditProfileModal