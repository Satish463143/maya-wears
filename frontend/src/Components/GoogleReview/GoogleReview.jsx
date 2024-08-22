import React,{useEffect} from 'react'
import './GoogleReview.css'

const GoogleReview = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://widgets.sociablekit.com/google-reviews/widget.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    
        return () => {
          // Clean up the script when the component is unmounted
          document.body.removeChild(script);
        };
      }, []);
    // useEffect(() => {
    //   const script = document.createElement('script');
    //   script.src = 'https://cdn.trustindex.io/loader.js?dcdaa993366c764d9396bd34a3d';
    //   script.async = true;
    //   script.defer = true;
    //   document.body.appendChild(script);
  
    //   return () => {
    //     // Clean up the script when the component is unmounted
    //     document.body.removeChild(script);
    //   };
    // }, []);
  return (
    <div className='div_container'>
        <div className='container'>
            <div className='sk-ww-google-reviews' data-embed-id='25453069'></div>
            {/* <div className="ti-widget"></div> */}
          </div>
    </div>
  )
}

export default GoogleReview