import { useState } from 'react'
import './App.css'
import ProductList from './ProductList.jsx'
import AboutUs from './AboutUs.jsx'

function App() {
  // Controls whether we show the landing page or the product listing page.
  const [showProductList, setShowProductList] = useState(false)

  const handleGetStartedClick = () => {
    setShowProductList(true)
  }

  return (
    <div className="app-container">
      {/* Landing page */}
      <div
        className="landing-page"
        style={{ display: showProductList ? 'none' : 'flex' }}
      >
        <div className="background-overlay"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>

      {/* Product listing page */}
      <div
        className="product-list-container"
        style={{ display: showProductList ? 'block' : 'none' }}
      >
        <ProductList onHomeClick={() => setShowProductList(false)} />
      </div>
    </div>
  )
}

export default App
