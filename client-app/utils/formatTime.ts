
  
  export const formatTime = (date:any) => {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  }

  export const formatDate = (date:any) => {
    const time = new Date(date);
    return time.toISOString().split('T')[0]
  }