import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './ProductList.css'
import { addItem } from './CartSlice.jsx'
import CartItem from './CartItem.jsx'

function ProductList({ onHomeClick }) {
  // Toggle between the product listing page and the cart page.
  const [showCart, setShowCart] = useState(false)
  // Track which plants have already been added (to disable their button).
  const [addedToCart, setAddedToCart] = useState({})

  const dispatch = useDispatch()

  // Read the cart from the Redux store to display the dynamic item count.
  const cartItems = useSelector((state) => state.cart.items)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // The plant catalog: 3 categories, each with 6 unique houseplants.
  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image:
            'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
          description: 'Produces oxygen at night, improving air quality.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image:
            'https://cdn.pixabay.com/photo/2018/07/11/06/47/spider-plant-3530056_1280.jpg',
          description: 'Filters formaldehyde and xylene from the air.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image:
            'https://cdn.pixabay.com/photo/2019/06/12/14/14/flower-4269365_1280.jpg',
          description: 'Removes mold spores and purifies the air.',
          cost: '$18',
        },
        {
          name: 'Boston Fern',
          image:
            'https://cdn.pixabay.com/photo/2020/04/30/19/52/fern-5114037_1280.jpg',
          description: 'A natural humidifier that removes toxins.',
          cost: '$20',
        },
        {
          name: 'Rubber Plant',
          image:
            'https://cdn.pixabay.com/photo/2020/02/23/06/16/plant-4873621_1280.jpg',
          description: 'Easy to grow and great at cleaning indoor air.',
          cost: '$17',
        },
        {
          name: 'Aloe Vera',
          image:
            'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg',
          description: 'Releases oxygen and absorbs airborne toxins.',
          cost: '$14',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        {
          name: 'Lavender',
          image:
            'https://cdn.pixabay.com/photo/2015/07/02/10/40/lavender-828711_1280.jpg',
          description: 'Calming fragrance that helps with relaxation.',
          cost: '$20',
        },
        {
          name: 'Jasmine',
          image:
            'https://cdn.pixabay.com/photo/2019/05/13/06/51/jasmine-4199849_1280.jpg',
          description: 'Sweet-scented flowers that bloom in the evening.',
          cost: '$18',
        },
        {
          name: 'Rosemary',
          image:
            'https://cdn.pixabay.com/photo/2019/07/29/16/44/rosemary-4368466_1280.jpg',
          description: 'Fragrant herb that also repels insects.',
          cost: '$15',
        },
        {
          name: 'Mint',
          image:
            'https://cdn.pixabay.com/photo/2016/06/28/22/02/mint-1484505_1280.jpg',
          description: 'Refreshing aroma, perfect for teas and cooking.',
          cost: '$12',
        },
        {
          name: 'Lemon Balm',
          image:
            'https://cdn.pixabay.com/photo/2019/07/14/16/23/lemon-balm-4337028_1280.jpg',
          description: 'Citrus-scented leaves that soothe and calm.',
          cost: '$14',
        },
        {
          name: 'Scented Geranium',
          image:
            'https://cdn.pixabay.com/photo/2016/06/17/19/01/geranium-1463287_1280.jpg',
          description: 'Leaves release a pleasant rose-like fragrance.',
          cost: '$16',
        },
      ],
    },
    {
      category: 'Medicinal Plants',
      plants: [
        {
          name: 'Chamomile',
          image:
            'https://cdn.pixabay.com/photo/2016/07/13/16/06/chamomile-1514280_1280.jpg',
          description: 'Used in teas to aid sleep and digestion.',
          cost: '$15',
        },
        {
          name: 'Echinacea',
          image:
            'https://cdn.pixabay.com/photo/2016/08/11/23/48/coneflower-1587372_1280.jpg',
          description: 'Boosts the immune system and reduces inflammation.',
          cost: '$18',
        },
        {
          name: 'Basil',
          image:
            'https://cdn.pixabay.com/photo/2016/03/05/19/02/basil-1238231_1280.jpg',
          description: 'Aromatic herb with anti-inflammatory properties.',
          cost: '$12',
        },
        {
          name: 'Thyme',
          image:
            'https://cdn.pixabay.com/photo/2017/07/05/15/41/thyme-2476551_1280.jpg',
          description: 'Antiseptic herb used to relieve coughs.',
          cost: '$14',
        },
        {
          name: 'Calendula',
          image:
            'https://cdn.pixabay.com/photo/2018/06/18/21/28/marigold-3483852_1280.jpg',
          description: 'Petals soothe the skin and heal minor wounds.',
          cost: '$16',
        },
        {
          name: 'Sage',
          image:
            'https://cdn.pixabay.com/photo/2017/07/22/16/02/sage-2529224_1280.jpg',
          description: 'Traditional herb used to ease sore throats.',
          cost: '$17',
        },
      ],
    },
  ]

  // Add a plant to the Redux cart and mark its button as disabled.
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant))
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }))
  }

  // Navbar handlers
  const handlePlantsClick = (e) => {
    e.preventDefault()
    setShowCart(false)
  }

  const handleCartClick = (e) => {
    e.preventDefault()
    setShowCart(true)
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    if (onHomeClick) onHomeClick()
  }

  return (
    <div>
      {/* ===== Navbar (shown on both the listing and cart pages) ===== */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={handleHomeClick}>
          <h3>Paradise Nursery</h3>
          <span className="tagline">Where Green Meets Serenity</span>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={handleHomeClick}>
            Home
          </a>
          <a href="#" onClick={handlePlantsClick}>
            Plants
          </a>
          <a href="#" onClick={handleCartClick} className="cart-link">
            {/* Cart icon with the dynamic total item count */}
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{totalQuantity}</span>
            Cart
          </a>
        </div>
      </nav>

      {!showCart ? (
        /* ===== Product listing ===== */
        <div className="product-grid-wrapper">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant, i) => (
                  <div key={i} className="product-card">
                    <img
                      className="product-thumbnail"
                      src={plant.image}
                      alt={plant.name}
                    />
                    <div className="product-info">
                      <h3 className="product-name">{plant.name}</h3>
                      <p className="product-description">{plant.description}</p>
                      <p className="product-price">{plant.cost}</p>
                      <button
                        className="add-to-cart-button"
                        onClick={() => handleAddToCart(plant)}
                        disabled={addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ===== Cart page ===== */
        <CartItem onContinueShopping={handlePlantsClick} />
      )}
    </div>
  )
}

export default ProductList
