import { createSlice } from '@reduxjs/toolkit'

// createSlice() divides the application state into a manageable "slice"
// and bundles the reducers that update that slice.
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item: { name, image, cost, quantity }
  },
  reducers: {
    // Add a product to the cart. If it already exists, just increase quantity.
    addItem: (state, action) => {
      const { name, image, cost } = action.payload
      const existingItem = state.items.find((item) => item.name === name)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ name, image, cost, quantity: 1 })
      }
    },

    // Remove a product from the cart entirely, by its name.
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload)
    },

    // Update the quantity of a specific product in the cart.
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload
      const itemToUpdate = state.items.find((item) => item.name === name)
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity
      }
    },
  },
})

// Export the action creators generated from the reducers.
export const { addItem, removeItem, updateQuantity } = CartSlice.actions

// Export the reducer to be used in the store.
export default CartSlice.reducer
