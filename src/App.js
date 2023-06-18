import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import Header from './component/Header'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
class App extends Component {
  state = {
    ListItems: [],
    isFailed: true,
    isSuccess: false,
    isLoading: true,
    ActiveId: categoriesList[0].id,
  }

  componentDidMount() {
    this.getCategoryData()
  }

  getCategoryData = async () => {
    const {ActiveId} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${ActiveId}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({ListItems: updatedData, isLoading: false})
      this.setState({isSuccess: true, isFailed: false})
    } else {
      this.setState({isSuccess: false, isFailed: true})
    }
  }

  setActiveId = event => {
    this.setState({ActiveId: event.target.value})
  }

  render() {
    const {ListItems, isLoading, isFailed, isSuccess} = this.state

    return (
      <div className="container">
        <Header />
        <section>
          <div>
            <select onChange={this.setActiveId}>
              {categoriesList.map(each => (
                <option value={each.id} key={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          {isSuccess && (
            <ul>
              {ListItems.map(each => (
                <li key={each.id}>
                  <div>
                    <img
                      className="image"
                      src={each.imageUrl}
                      alt={each.name}
                    />
                  </div>
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          )}
          {isFailed && (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
                alt="failure view"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button>Retry</button>
            </div>
          )}
          )}
        </section>
      </div>
    )
  }
}

export default App
