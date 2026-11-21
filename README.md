# paradise-nursery
# Paradise Nursery Shopping Application

Paradise Nursery is a dynamic e-commerce web application for an online plant
shop. Built with **React** and **Redux Toolkit**, it lets users browse a
catalog of houseplants, view details such as images, names, descriptions, and
prices, add plants to a shopping cart, and manage their cart items.

## Features

- A welcoming landing page with the company name and a "Get Started" button.
- A product listing page displaying houseplants grouped into categories, each
  with a thumbnail, name, and price.
- "Add to Cart" buttons that add a plant to the cart, disable after being
  clicked, and increment the cart icon count.
- A navigation bar (available on the Product Listing and Cart pages) with links
  to Home, Plants, and Cart, plus a live cart item count.
- A shopping cart page that shows each item's thumbnail, name, and unit price,
  the per-item subtotal, and the overall cart total.
- Buttons to increase/decrease item quantity, delete an item, check out
  ("Coming Soon"), and continue shopping.

## Tech Stack

- React (functional components + hooks)
- Redux Toolkit (`configureStore`, `createSlice`)
- React-Redux (`Provider`, `useSelector`, `useDispatch`)
- Vite (build tooling)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure

```
src/
├── main.jsx          # App entry point, wraps App in the Redux Provider
├── App.jsx           # Landing page + routing to the product list
├── App.css           # Landing page styles (background image, Get Started)
├── store.js          # Redux store (configureStore)
├── CartSlice.jsx     # Redux slice for the shopping cart
├── ProductList.jsx   # Product listing page (categories, add to cart, navbar)
├── CartItem.jsx      # Shopping cart page (totals, quantity, delete, checkout)
└── AboutUs.jsx       # Company details
```

## Author

Nour Waleed Zakout
