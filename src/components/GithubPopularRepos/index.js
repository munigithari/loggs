import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    languagesList: [],
    apiStatus: apiConstants.initial,
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachValue => ({
        id: eachValue.id,
        avatarUrl: eachValue.avatar_url,
        name: eachValue.name,
        startsCount: eachValue.stars_count,
        forksCount: eachValue.forks_count,
        issuesCount: eachValue.issues_count,
      }))
      this.setState({
        languagesList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {languagesList} = this.state
    return (
      <ul className="card-container">
        {languagesList.map(eachItem => (
          <RepositoryItem key={eachItem.id} eachRepository={eachItem} />
        ))}
      </ul>
    )
  }

  setActiveLanguageId = id => {
    this.setState({activeLanguageFilterId: id}, this.getRepositories)
  }

  renderFilterList = () => {
    const {activeLanguageFilterId} = this.state

    return (
      <ul className="list-items2">
        {activeLanguageFilterId.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            eachDetails={eachItem}
            setActiveLanguageId={this.setActiveLanguageId}
            isActive={eachItem.id === activeLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  result = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="container1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="image4"
        alt="failure view"
      />
      <h1 className="heading2">Something went wrong</h1>
    </div>
  )

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        {this.renderFilterList()}
        {this.result()}
      </div>
    )
  }
}

export default GithubPopularRepos
