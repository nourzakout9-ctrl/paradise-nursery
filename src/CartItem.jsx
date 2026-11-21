import { useSelector, useDispatch } from 'react-redux'
import './CartItem.css'
import { removeItem, updateQuantity } from './CartSlice.jsx'

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  // Convert a "$15" cost string into the number 15.
  const getUnitPrice = (cost) => parseFloat(cost.substring(1))

  // Subtotal for a single plant: unit price × quantity.
  const calculateItemSubtotal = (item) =>
    (getUnitPrice(item.cost) * item.quantity).toFixed(2)

  // Total amount for the whole cart.
  const calculateTotalAmount = () =>
    cartItems
      .reduce((total, item) => total + getUnitPrice(item.cost) * item.quantity, 0)
      .toFixed(2)

  // Total number of items (for the summary line).
  const calculateTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0)

  // Increase quantity by 1.
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))
  }

  // Decrease quantity by 1; remove the item if it would drop below 1.
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
    } else {
      dispatch(removeItem(item.name))
    }
  }

  // Remove an item from the cart entirely.
  const handleRemove = (item) => {
    dispatch(removeItem(item.name))
  }

  // Checkout placeholder.
  const handleCheckout = () => {
    alert('Coming Soon! Checkout functionality is on its way. 🌱')
  }

  const handleContinueShopping = (e) => {
    if (onContinueShopping) onContinueShopping(e)
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      {/* Total amount for all plants in the cart */}
      <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h2>
      <p className="cart-total-items">
        Total items in cart: {calculateTotalQuantity()}
      </p>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.name}>
              {/* Thumbnail */}
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                {/* Name */}
                <h3 className="cart-item-name">{item.name}</h3>
                {/* Unit price */}
                <p className="cart-item-cost">Unit Price: {item.cost}</p>

                {/* Quantity controls */}
                <div className="cart-item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal for this plant */}
                <p className="cart-item-subtotal">
                  Total: ${calculateItemSubtotal(item)}
                </p>

                {/* Delete button */}
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="cart-actions">
        <button className="continue-shopping-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartItem
