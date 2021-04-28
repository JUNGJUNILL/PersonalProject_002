var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime')
var updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: '%d seconds',
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",       //하루전
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    }
  })

export const  custumDateFormat = (values)=>{

    const day = new Date(values); 
    
    const present = dayjs().format('YY.MM.DD.HH:mm:ss'); 
    const date = dayjs(day).format('YY.MM.DD.HH:mm:ss'); 
    const editPresent = present.substr(0,8); 
    const editDate    = date.substr(0,8); 
    const editDate02  = date.substr(9,5); 

    if(editPresent !== editDate){
        return editDate; 
    }else{
        return editDate02+' '+ dayjs().to(day); 
    }
    


}

export default custumDateFormat; 