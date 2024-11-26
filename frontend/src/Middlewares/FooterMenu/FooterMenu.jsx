import React from 'react'

const FooterMenu = ({ menu, answer, isActive, onToggle }) => {
  return (
    <>
    <div
      className={`faq-item ${isActive ? "active" : ""}`}
      onClick={onToggle}
    >
      <div className="faq-question">{menu}</div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  </>
  )
}

export default FooterMenu