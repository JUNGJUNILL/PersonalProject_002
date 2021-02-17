import { useRouter } from 'next/router'



const DynamicRouter02 = () =>{

    const router  = useRouter(); 
    const {pid,comment} = router.query; 

    return (
      <div>
        <p>pid : {pid}</p>
        <br/>
        <p>comment : {comment}</p>

      </div>  
    )

}


export default DynamicRouter02; 