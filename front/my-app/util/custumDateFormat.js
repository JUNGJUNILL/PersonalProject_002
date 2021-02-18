export const  custumDateFormat = (values='2020-09-22 10:23:11')=>{

    const day = new Date(values); 
    //const dayOfWeekArray =['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)']; 
    //const dayOfWeek = dayOfWeekArray[new Date(values).getDay()]; 
    //let date = day.toLocaleString()+' '+dayOfWeek; 
    let date = day.toLocaleString(); 
    
    return date; 

}

export default custumDateFormat; 