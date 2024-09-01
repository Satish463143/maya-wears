import React, { useContext, useState } from 'react';
import FaqItem from '../../Middlewares/FaqItem/FaqItem';
import { StoreContext } from '../../context/StoreContext';
import './Faq.css'

const Faq = () => {
    const { FAQList } = useContext(StoreContext);
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
        <div className='div_container'>
            
                <div className="container">
                <div data-aos="fade-up">
                    <div className='home_loan'>
                        <div style={{ textAlign: 'center',marginTop:'-40px'}}>
                            <h1>FAQ </h1>
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