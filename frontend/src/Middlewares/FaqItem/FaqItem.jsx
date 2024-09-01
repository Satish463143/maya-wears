import React from 'react';
import './FaqItem.css'; // Assuming you have a CSS file for styling

const FaqItem = ({ question, answer, isActive, onToggle }) => {
  return (
    <>
    
    <div className={`faq-item ${isActive ? 'active' : ''}`} onClick={onToggle}>
      <div className="faq-question">
        {question}
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
    </>
  );
};

export default FaqItem;
