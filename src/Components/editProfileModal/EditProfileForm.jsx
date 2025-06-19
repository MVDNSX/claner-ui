import { yupResolver } from '@hookform/resolvers/yup'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import scrollIntoView from 'scroll-into-view-if-needed'
import useGlobalStore from '../../store/useGlobalStore'
import useProfileMemberStore from '../../store/useProfileMemberStore'
import useReferencesStore from '../../store/useReferenceStore'
import CustomButton from '../../UI/CustomButton/CustomButton'
import InputForm from '../../UI/CustomInput/CustomInput'
import CustomRadioButton from '../../UI/CustomRadioButton/CustomRadioButton'
import { profileSchema } from '../../Validator/profileSchema'
import style from './EditProfileForm.module.scss'

function EditProfileForm() {

  const member = useProfileMemberStore(state => state.member)
  const classes = useReferencesStore(state => state.classes)
  
  const UpdateProfile = useProfileMemberStore(state => state.UpdateProfile)
  const isLoading = useProfileMemberStore(state => state.isLoading)
  const onClose = useGlobalStore(state => state.closeModal)

  const currentInputRef = useRef();
  const scrollContainerRef = useRef()

  const handleInputFocus = (e) => {
      currentInputRef.current = e.target;
      scrollIntoView(currentInputRef.current, {
      behavior: 'smooth',
      block: 'center',
      boundary: scrollContainerRef.current
    })
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: member.nickname,
      pa: member.pa,
      pz: member.pz,
      fs: member.fs,
      class_id: member.class_id
    },
    resolver: yupResolver(profileSchema)
  })

  const selectedClassId = watch('class_id');

  
  
  const onSubmit = async (data) => {
    await UpdateProfile(data)
    onClose()
  }

  return (
    <form className={style.profile_form} onSubmit={handleSubmit(onSubmit)}>
      <div ref={scrollContainerRef} className={style.content}>
        <InputForm type='text' label='Ник:' {...register('nickname')} error={errors.nickname?.message} onClick={handleInputFocus}/>
        <InputForm type='number' inputMode='numeric' label='Показатель атаки:' {...register('pa')} error={errors.pa?.message} onFocus={handleInputFocus}/>
        <InputForm type='number' inputMode='numeric' label='Показатель защиты:' {...register('pz')} error={errors.pz?.message} onFocus={handleInputFocus}/>
        <InputForm type='number' inputMode='numeric' label='Боевой дух:' {...register('fs')} error={errors.fs?.message} onClick={handleInputFocus}/>
        <div className={style.classes}>
          <div className={style.heading}>
            Игровой класс:
          </div>
          <div className={style.group}>
            {classes.map(({id, icon_url}) => {
              return <CustomRadioButton key={id} {...register('class_id')} value={id} icon={icon_url} checked={+selectedClassId === id} current={id === member.class_id}/>
            })}
          </div>
        </div>
      </div>
      <div className={style.control}>
        <CustomButton text="Сохранить" type='submit' loading={isLoading}/>
      </div>
    </form>
  )
}

export default EditProfileForm