import React from "react"
import { IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io'
import { useNavigate, useParams } from "react-router-dom"

const LanguageDropdown = ({ language }) => {

  const languages = [
    { id : 0, lang: "en" },
    { id: 1, lang: "fi" }
  ]

  const navigate = useNavigate()
  const { language: lang } = useParams()
  const [selecting, setSelecting] = React.useState(false)

  const handleClick = () => {
    setSelecting(true)
  }

  const handleSelect = (e, language) => {
    setSelecting(false)
    if (language !== lang) {
      navigate(`/${language}`)
    }
  }

  return (
    <div className="dropdown-container">
      { selecting ? <div className="dropdown-big">
        {languages.map((l) => 
          <div key={l.id} className="dropdown-content" onClick={e => handleSelect(e, l.lang)} style={{marginTop: 2, marginBottom: 2}}>
            <p>{l.lang}</p>
            {language === l.lang ? <IoMdCheckmark/> : <></>}
          </div>)}
      </div>
      : <div className="dropdown-content" onClick={handleClick}>
        <p>{language}</p>
        <IoMdArrowDropdown/>
      </div>
      }
    </div>
  )
}

export default LanguageDropdown