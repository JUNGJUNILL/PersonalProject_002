import { useRouter } from 'next/router'



const DynamicRouter = () =>{

    const router  = useRouter(); 
    const {pid,foo} = router.query; 

    return (
      <div>
        <p>Post : {pid}</p>
        <br/>
        <p>foo : {foo}</p>

      </div>  
    )

}


export default DynamicRouter; 