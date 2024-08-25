import React,{useEffect} from 'react'
import './GoogleReview.css'

const GoogleReview = () => {
   
    useEffect(()=>{
      const script =document.createElement('script');
      script.src= "https://static.elfsight.com/platform/platform.js"
      script.async = true;
      script.defer = true;
        document.body.appendChild(script);
    
        return () => {
          // Clean up the script when the component is unmounted
          document.body.removeChild(script);
        };
      }, []);

//     <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
// <div class="elfsight-app-bb85483c-62bc-4336-ad91-6ee47dc0d77c" data-elfsight-app-lazy></div>
  return (
    <div className='div_container' style={{paddingTop:'20px'}}>
        <div className='container'>
           
            <div className="elfsight-app-bb85483c-62bc-4336-ad91-6ee47dc0d77c" data-elfsight-app-lazy></div>
          </div>
    </div>
  )
}

export default GoogleReview