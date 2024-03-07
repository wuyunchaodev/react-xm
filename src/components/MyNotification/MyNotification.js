import React ,{useEffect} from 'react'
import {notification} from 'antd'

export default function MyNotification({ type='info', message='系统提示',
description}) {
  const [api, contextHolder] = notification.useNotification();
  
  useEffect(() =>  {
    api [type]({
        message,
        description
    })
  },[])
  return (
    <div>
      <>{contextHolder}</>
    </div>
  )
}
