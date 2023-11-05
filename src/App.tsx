// Import Components
import Gallery from "./Components/Gallery"

// Import From Redux
import store from "./Services/store"
import { Provider } from 'react-redux'

const App = () => {
  return (
    <div className="container">
      <Provider store={ store }>
        <Gallery />
      </Provider>
    </div>
  )
}

export default App
