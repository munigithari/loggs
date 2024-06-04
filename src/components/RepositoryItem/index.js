// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepository} = props
  const {name, issuesCount, forksCount, startsCount, avatarUrl} = eachRepository

  return (
    <li className="list">
      <img src={avatarUrl} className="image1" alt={name} />
      <h1 className="heading">{name}</h1>
      <div className="container1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="image2"
          alt="stars"
        />
        <p className="paragraph">{startsCount} stars count</p>
      </div>
      <div className="container1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="image2"
          alt="forks"
        />
        <p className="paragraph">{forksCount} forks count</p>
      </div>
      <div className="container1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="image2"
          alt="open issues"
        />
        <p className="paragraph">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
