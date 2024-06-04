// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachDetails, isActive, setActiveLanguageId} = props
  const {id, language} = eachDetails
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'

  const onClickFilter = () => {
    setActiveLanguageId(id)
  }
  return (
    <li className="list2">
      <button type="button" className={btnClassName} onClick={onClickFilter}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
