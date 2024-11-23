import React, { useEffect, useState } from 'react'

const Progress = ({timer,onTimeOut}) => {
    const [remainingTime, setRemainigTime] = useState(timer);
      useEffect(()=>{
  const interval=setInterval(()=>{
      console.log('set interval')
      setRemainigTime((prev)=>prev-10)
      },10)

      return()=>{
          console.log('clear interval')
          clearInterval(interval)
      }
  },[])
  useEffect(()=>{
    const time=  setTimeout(onTimeOut, timer);

      return()=>{
  clearTimeout(time);
      }
  },[timer,onTimeOut])

  return (
    <progress value={remainingTime} max={timer} />
  )
}

export default Progress