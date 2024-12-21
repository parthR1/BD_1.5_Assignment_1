const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

// Endpoint 1: Given new item's price and cart total as query params return the total cart value.
app.get('/cart-total', (req, res) => {
  let newItemCost = parseFloat(req.query.newItemPrice);
  let cartTotalAmt = parseFloat(req.query.cartTotal);

  let updatedCartTotal = newItemCost + cartTotalAmt;

  res.send(updatedCartTotal.toString());
});

// Endpoint 2: Given membership status(boolean value) as query params return the final price after applying discount if applicable.
app.get('/membership-discount', (req, res) => {
  let cartTotalAmt = parseFloat(req.query.cartTotal);
  let isPrimeMember = req.query.isMember === 'true';
  let discountedCartTotal;

  if (isPrimeMember) {
    discountedCartTotal =
      cartTotalAmt - (cartTotalAmt * discountPercentage) / 100;
  } else {
    discountedCartTotal = cartTotalAmt;
  }

  res.send(discountedCartTotal.toString());
});

// Endpoint 3: Given cartTotal as a query parameter return the tax applied on the Cart Total.
app.get('/calculate-tax', (req, res) => {
  let cartTotalAmt = parseFloat(req.query.cartTotal);
  let taxOnCartTotal = (cartTotalAmt * taxRate) / 100;
  res.send(taxOnCartTotal.toString());
});

// Endpoint 4: Given shippingMethod and distance as query parameters, return the estimated number of days for delivering the package.
app.get('/estimate-delivery', (req, res) => {
  let shipMethod = req.query.shippingMethod;
  let dist = parseFloat(req.query.distance);
  let result;

  if (shipMethod === 'express') {
    result = dist / 100;
  } else if (shipMethod === 'standard') {
    result = dist / 50;
  } else {
    result = 'Invalid shipping method';
  }
  res.send(result.toString());
});

// Endpoint 5: Given weight and distance as query parameters return the shipping cost of the packages.
app.get('/shipping-cost', (req, res) => {
  let wt = parseFloat(req.query.weight);
  let dist = parseFloat(req.query.distance);

  let shippingCost = wt * dist * 0.1;
  res.send(shippingCost.toString());
});

// Endpoint 6: Given purchaseAmount as query parameter, return the loyalty points earned.
app.get('/loyalty-points', (req, res) => {
  let purchaseAmt = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = purchaseAmt * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
