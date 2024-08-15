<h1>E-Commerce Web Application</h1>
https://66bdd7b70d0bf5ac3154d7d0--tiny-marzipan-1e1240.netlify.app
<br/>
<i>only frontend part is deployed.</i>
<ul>
  <h2>Features</h2>
  <li>products catalogue</li>
  <li>cart page to display the cart items</li>
  <li>way for user to manage the cart items increase or decrease the quantity,remove from cart.</li>
</ul>
<ul>
  <h2>Contexts (state Management) </h2>
  <li>"CachedProductsContext" - it is used to store(cached) the products.</li>
  <li>"CachedCartContext" - it is used to store(cached) the cart items.</li>
  <li>"CartContext" (present in repo but not using it,CachedCartContext is being used for storing the cart items) - it is added with the thought that, this context will have (productId,quantityOfProduct) as the parameters and every time one goes to the cart page their is an API call based on the productId, so that if there is some updates in the product details which the user has added in their cart, it will reflect the latest details of that. </li>
</ul>
