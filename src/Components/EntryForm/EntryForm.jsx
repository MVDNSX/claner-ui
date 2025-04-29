import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {formSchema} from '../../Validator/formSchema'

import InputForm from '../../UI/InputForm'
import style from './EntryFrom.module.scss'
import { useEffect } from 'react'

const EntryForm = () => {

  const {register, handleSubmit, formState: {errors}, } = useForm({
    resolver: yupResolver(formSchema)
  })

  const onSubmit = async (data) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, 10000);
    const tg = window.Telegram.WebApp;
    const initData = tg?.initData || '';
    tg.MainButton.showProgress();

    try {
      console.log(`Отправляем данные: ${data}`)

      const url = 'https://clanner-server.onrender.com/api/declaration/create'

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({initData, data}),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if(!response.ok){
        throw new Error(`Ошибка: ${response.status}`);
      }

      const result = await response.json()
      console.log(`Ответ сервера ${result}`)
      tg.MainButton.hideProgress();

      tg.showPopup({
        title: 'Успешно!',
        message: 'Ваша заявка отправлена',
        buttons: [{ text: 'Ок' }],
      });

    } catch (error) {
      clearTimeout(timeoutId)

      let message = 'Произошла ошибка при отправке.';

      if(error.name === 'AbortError'){
        message = 'Сервер не ответил в течение 10 секунд.';
      }

      console.error('Ошибка:', error);

      tg.MainButton.hideProgress();

      tg.showPopup({
        title: 'Ошибка',
        message,
        buttons: [{ text: 'Ок' }],
      });

    }
  }
  

  useEffect(() => {
    const tg = window.Telegram.WebApp

    const handleClick = () => {
      handleSubmit(onSubmit)()
    }

    tg.MainButton.onClick(handleClick)

    return () => {
      tg.MainButton.offClick(handleClick)
    }
  }, [handleSubmit])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm label='Ваше имя:' {...register('name') } error={errors?.name?.message}/>
        <InputForm label='Ник:' {...register('nickname') } error={errors?.nickname?.message}/>
        <InputForm label='Прошлые ники:' {...register('previousNick') } error={errors?.previousNick?.message}/>
        <InputForm label='Прошлые кланы:' {...register('previousClan') } error={errors?.previousClan?.message}/>
        <div className={style.stats}>
          <InputForm label='ПА:' {...register('pa') } error={errors?.pa?.message}/>
          <InputForm label='ПЗ:' {...register('pz') } error={errors?.pz?.message}/>
          <InputForm label='БД:' {...register('fs') } error={errors?.fs?.message}/>
        </div>
          <InputForm label='Ссылка на персонажа:' {...register('characterUrl') } error={errors?.characterUrl?.message}/>
          <InputForm label='Могут рекомендовать:' {...register('recommends') } error={errors?.recommends?.message}/>
          <InputForm label='Причина вступления:' {...register('reason') } error={errors?.reason?.message}/>
      </form>
    </>
  )
}

export default EntryForm