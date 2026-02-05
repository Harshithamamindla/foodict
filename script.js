let products = [
  { name:'Pizza', price:250, img:'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3', reviews:[] },
  { name:'Burger', price:120, img:'https://images.unsplash.com/photo-1550547660-d9450f859349', reviews:[] }
];

let cart = [];

function hideAll() {
  home.style.display = userDash.style.display = adminDash.style.display = 'none';
}

function goHome() {
  hideAll();
  home.style.display = 'block';
}

function selectRole(role) {
  hideAll();
  if (role === 'user') {
    userDash.style.display = 'block';
    renderProducts();
  }
  if (role === 'admin') adminDash.style.display = 'block';
}

// ADMIN ADD PRODUCT
function addProduct() {
  if (!foodName.value || !foodPrice.value || !foodImg.files[0]) {
    alert("Please fill all fields");
    return;
  }
  products.push({
    name: foodName.value,
    price: Number(foodPrice.value),
    img: URL.createObjectURL(foodImg.files[0]),
    reviews: []
  });
  foodName.value = foodPrice.value = foodImg.value = '';
  alert("Product added successfully");
  renderProducts(); // Update user view
}

// USER PRODUCT DISPLAY
function renderProducts() {
  userProducts.innerHTML = '';
  products.forEach((p,i) => {
    let productHTML = `
      <div class="product">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <label>Quantity:</label>
        <input type="number" id="qty${i}" min="1" value="1">
        <button class="btn btn-primary" onclick="addToCart(${i})">Add to Cart</button>

        <div class="review-section">
          <textarea id="review${i}" rows="2" placeholder="Write a review..."></textarea>
          <button class="btn btn-secondary" onclick="addReview(${i})">Submit Review</button>
          <div class="reviews" id="reviews${i}"></div>
        </div>
      </div>`;
    userProducts.innerHTML += productHTML;
    renderReviews(i);
  });
}

// CART FUNCTION
function addToCart(i) {
  let qty = Number(document.getElementById('qty'+i).value);
  let product = {...products[i], quantity: qty};
  let existing = cart.find(c => c.name === product.name);
  if(existing){
    existing.quantity += qty;
  } else {
    cart.push(product);
  }
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(c => {
    cartItems.innerHTML += `<li>${c.name} x ${c.quantity} - ₹${c.price * c.quantity}</li>`;
    total += c.price * c.quantity;
  });
  document.getElementById('total').innerText = total;
}

// REVIEWS
function addReview(i) {
  let text = document.getElementById('review'+i).value.trim();
  if(!text) return;
  products[i].reviews.push(text);
  document.getElementById('review'+i).value = '';
  renderReviews(i);
}

function renderReviews(i) {
  const reviewDiv = document.getElementById('reviews'+i);
  reviewDiv.innerHTML = '';
  products[i].reviews.forEach(r => {
    reviewDiv.innerHTML += `<div class="review">• ${r}</div>`;
  });
}
