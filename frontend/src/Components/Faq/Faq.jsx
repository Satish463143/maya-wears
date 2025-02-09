import React, { useContext, useState } from 'react';
import FaqItem from '../../Middlewares/FaqItem/FaqItem';
import { StoreContext } from '../../context/StoreContext';
import './Faq.css'
import line_svg from '../../assets/images/headline-curve.svg'


const Faq = () => {
    const { FAQList } = useContext(StoreContext);
    const [activeIndex, setActiveIndex] = useState(null);
     
    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
        <div className='div_container faqqqqq'>            
                <div className="container">
                <div >
                    <div >
                        <div className='best__of__'>
                            <h1 className='help__section'>Help Section </h1>
                            <img src={line_svg} alt=""  />
                        </div>
                        
                        <div className='faq_width'>                        
                            {FAQList.map((item, index) => (
                                <FaqItem
                                    key={index}
                                    question={item.question}
                                    answer={item.answer}
                                    isActive={activeIndex === index}
                                    onToggle={() => toggleFAQ(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

export default Faq