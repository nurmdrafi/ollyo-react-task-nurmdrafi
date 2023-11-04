// Import Components
import Header from "./Components/Header"
import ImageContainer from "./Components/ImageContainer"
// import ImageGallery from "./Components/ImageGallery"

// Import From Redux
import store from "./Services/store"
import { Provider } from "react-redux"

const App = () => {
  return (
    <div className="container">
      <Provider store={ store }>
        <div>
          <Header />
          <ImageContainer />
        </div>
      </Provider>
    </div>
  )
}

export default App
