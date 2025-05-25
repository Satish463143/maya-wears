import React, { useState } from 'react';
import FaqItem from '../../Middlewares/FaqItem/FaqItem';
import './Faq.css'
import line_svg from '../../assets/images/headline-curve.svg'


const Faq = () => {
    const faqlist = [
        {
            _id:"1",
            question:"Do you ship just within International or worldwide?",
            answer:"We provide shipping to International locations. We have arrangements with leading International logistics providers to handle your orders."
        },
        {
            _id:"2",
            question:"Can I cancel an order?",
            answer:"Do note: We do not offer refund for cancelled orders but offer credit notes against the cancellations. You can cancel your order within 24 hours of placing it, without any extra charges. To make a cancellation, please write to us on maya-wears.com or contact us on Whatsapp. Once your order is found eligible for cancellation, our team will issue a refund against it in the form of a credit note, that is redeemable within 180 days from the issue date."
        },
        {
            _id:"3",
            question:"How much time will it take for an order to be delivered?",
            answer:"All orders are shipped from our central warehouse in Kathmandu. We will share regular updates about your order from dispatch to delivery via Email & SMS details provided by you when placing the order. The delivery status is also available on your registered account on maya-wears.com Domestic Orders: The Standard Delivery for within Nepal is 2-3 business days. International Orders: The Standard Delivery for international orders is 10-14 business days. While we service worldwide, there may be countries or regions that are under restrictions or political sanctions."
        },
        {
            _id:"4",
            question:"How can I pay for my order?",
            answer:`"We accept the following modes of payment:
    
                1. Debit Card
                2. Net Banking
                3. Digital/ Mobile Wallet"
                In case of any issues, you can simply get in touch with us at maya-wears.com or contact us on Whatsapp and our Customer Operations team will assist you.
                        
            `
        },
        {
            _id:"5",
            question:"What do I do if my order is received in a damaged condition?",
            answer:"You can simply get in touch with us at maya-wears.com or contact us on Whatsapp and our Customer Operations team will assist you with reverse pickup and arranging a replacement piece."
        },
    ]
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
                            {faqlist.map((item, index) => (
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