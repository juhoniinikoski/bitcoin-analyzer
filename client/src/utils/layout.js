import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import LanguageDropdown from "../components/LanguageDropdown"
import { textContent } from "../content/textContent"
import { IoMdArrowBack } from 'react-icons/io'

const Layout = ({children, language, setLanguage}) => {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const content = language === 'en' ? textContent.en : textContent.fi

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <div className="main-container">
      <div className="header-bar-container">
        {pathname === `/${language}` ? <div></div> : 
          <div className="back-button" onClick={handleClick}>
            <IoMdArrowBack style={{marginRight: 8}} size={20}/>
            {content.back}
          </div>}
        <LanguageDropdown language={language} setLanguage={setLanguage}/>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Layout