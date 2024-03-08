import React ,{useEffect} from 'react'
import {notification} from 'antd'

export default function MyNotification({ notiMag}) {
  const [api, contextHolder] = notification.useNotification();
  
  useEffect(() =>  {
    if(notiMag.type){
    api [notiMag.type]({
      message:'系统提示',
        description:notiMag.description
    })
    }
  },[notiMag])
  return (
    <div>
      <>{contextHolder}</>
    </div>
  )
}
