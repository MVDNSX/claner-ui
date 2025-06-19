import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { formSchema } from '../../Validator/formSchema'

import { useEffect, useRef } from 'react'
import InputForm from '../../UI/CustomInput/CustomInput'
import style from './EntryFrom.module.scss'
import CustomButton from '../../UI/CustomButton/CustomButton'
import scrollIntoView from 'scroll-into-view-if-needed'

const EntryForm = () => {

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

  const {register, handleSubmit, formState: {errors}, } = useForm({
    resolver: yupResolver(formSchema)
  })





  return (
    <>
      <form className={style.join_form}>
        <div className={style.content} ref={scrollContainerRef}>
          <InputForm type='text' label='Ваше имя:' {...register('name')} error={errors.name?.message} onClick={handleInputFocus}/>
          <InputForm type='text' label='Ник:' {...register('nickname')} error={errors.nickname?.message} onClick={handleInputFocus}/>
          <div className={style.stats}>
            <InputForm type='number' inputMode='numeric' label='ПА:' {...register('pa')} error={errors.pa?.message} onFocus={handleInputFocus}/>
            <InputForm type='number' inputMode='numeric' label='ПЗ:' {...register('pz')} error={errors.pz?.message} onFocus={handleInputFocus}/>
            <InputForm type='number' inputMode='numeric' label='БД:' {...register('fs')} error={errors.fs?.message} onClick={handleInputFocus}/>
          </div>
        </div>
        
        <div className={style.control}>
          <CustomButton text="Отправить заявку" type='submit'/>
        </div>
      </form>
    </>
  )
}

export default EntryForm