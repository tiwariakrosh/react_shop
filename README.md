# React Shop Product Viewer

This project is a React application built with TypeScript that displays a list of products and detailed product information fetched from the live API at [dummyjson.com](https://dummyjson.com/products). The project demonstrates how to integrate a live API, implement routing, and use TypeScript for type safety.

---

## Project Overview

- **Product List:** Displays a list of products fetched from the dummyjson API.
- **Product Details:** Shows detailed information for a selected product.
- **Layout:** The app uses a two-pane design:
  - **Left Side:** Displays product details (or a placeholder message if no product is selected).
  - **Right Side:** Shows the product list.
- **Routing:** Uses `react-router-dom` (v6) for navigation.
- **Styling:** Basic CSS is included. Feel free to adjust or add styles to enhance the layout and responsiveness.
- **Mobile Responsive**

---

## Live API Integration

The project uses live API endpoints from dummyjson.com:

- **Fetch All Products:** `https://dummyjson.com/products`
- **Fetch Product by ID:** `https://dummyjson.com/products/{id}`

---

## Test instructions

- **You should implement components:**

- **Product list**

  - **Pagination**
  - **Fetch All Products from:** `https://dummyjson.com/products`
  - **Each item should display:**
    - availabilityStatus
    - brand
    - category
    - minimumOrderQuantity
    - price (before and after discount)
    - rating
    - stock
    - thumbnail
    - title
    - minimum css required

- **Product item**

  - **On item click:** Display product full details in the center of app.
  - **Review and Rating section** Make sure to include review section with (dates, comment and rating)

- **Deploy your react code in netlify.com for demo purposes.**
  - An issue might occur when you refresh the page once deploy on Netlify. Consider that issue as well while deploying.
- **Make your repo public and share your repo.**

## **Bonus**

- **Create filter:**
  - no server side query needed
  - filter should apply for all the products
  - pagination should be updated based on the filtered result
