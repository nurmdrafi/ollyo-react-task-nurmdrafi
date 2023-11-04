// import { useState } from 'react'
// import './App.css'
// Import Components
import Header from "./Components/Header"
import ImageContainer from "./Components/ImageContainer"

// Import From Redux
import store from "./Services/store"
import { Provider } from "react-redux"

const App = () => {
  return (
    <div>
      {/* Gallery */}
      <Provider store={ store }>
        <div style={ galleryWrapper }>
          {/* Header */}
          <Header />
          {/* Images */}
          <ImageContainer />
        </div>
      </Provider>
    </div>
  )
}

// Styles
const galleryWrapper = {

}

export default App
