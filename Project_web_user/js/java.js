document.addEventListener("DOMContentLoaded", function () {
  function showCartModal() {
    document.getElementById("cart-modal").style.display = "block";
  }

  function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
  }

  function showCheckoutModal() {
    document.getElementById("checkout-modal").style.display = "block";
  }

  function closeCheckoutModal() {
    document.getElementById("checkout-modal").style.display = "none";
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let discount = 0;

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
  }

  function updateCartCount() {
    const totalCount = cart.reduce((sum, product) => sum + product.quantity, 0);
    document.getElementById("cart-count").innerText = totalCount;
  }

  function calculateTotal() {
    const subtotal = cart.reduce((total, product) => {
      const price = parseFloat(product.price.replace(/[^\d.-]/g, ""));
      return total + price * product.quantity;
    }, 0);
    return (subtotal - discount).toFixed(2);
  }

  function showCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartItems.innerHTML = "";
    cart.forEach((product, index) => {
      const item = document.createElement("div");
      item.classList.add("cart-item");
      item.innerHTML = `
        <div class="cart-item-header">
          <h5>${product.name}</h5>
          <p>${product.price}</p>
        </div>
        <div class="cart-item-controls">
          <button class="decrease" data-index="${index}">-</button>
          <span class="quantity">${product.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
          <button class="remove" onclick="removeFromCart(${index})">Xóa</button>
        </div>
      `;
      cartItems.appendChild(item);
    });

    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", increaseQuantity);
    });

    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", decreaseQuantity);
    });

    totalPriceElement.innerText = `Tổng giá: ${calculateTotal()} VND`;
  }

  function increaseQuantity(event) {
    const index = event.target.dataset.index;
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
  }

  function decreaseQuantity(event) {
    const index = event.target.dataset.index;
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
  }

  function applyCoupon() {
    const couponCode = document.getElementById("coupon-code").value;
    const couponMessage = document.getElementById("coupon-message");

    if (couponCode === "DISCOUNT10") {
      discount = 10;
      couponMessage.innerText = "Mã giảm giá hợp lệ! Giảm 10 VND.";
      couponMessage.style.color = "green";
    } else if (couponCode === "DISCOUNT50") {
      discount = 50;
      couponMessage.innerText = "Mã giảm giá hợp lệ! Giảm 50 VND.";
      couponMessage.style.color = "green";
    } else {
      discount = 0;
      couponMessage.innerText = "Mã giảm giá không hợp lệ!";
      couponMessage.style.color = "red";
    }
    showCart();
  }

  function checkout() {
    closeCart();
    showCheckoutModal();
  }

  function handleCheckout(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const deliveryTime = document.getElementById("delivery-time").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const specialInstructions = document.getElementById(
      "special-instructions"
    ).value;

    alert(
      `Thanh toán thành công!\nTên: ${name}\nSố điện thoại: ${phone}\nĐịa chỉ: ${address}\nThời gian giao hàng: ${deliveryTime}\nPhương thức thanh toán: ${paymentMethod}\nGhi chú: ${specialInstructions}`
    );

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
    closeCheckoutModal();
  }

  document.querySelectorAll(".box .options a").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productElement = button.closest(".box");
      const productName = productElement.querySelector("h5").innerText;
      const productPrice = productElement.querySelector("h6").innerText;
      const product = {
        name: productName,
        price: productPrice,
      };
      addToCart(product);
    });
  });

  document
    .getElementById("checkout-form")
    .addEventListener("submit", handleCheckout);

  window.showCartModal = showCartModal;
  window.closeCart = closeCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.checkout = checkout;
  window.closeCheckoutModal = closeCheckoutModal;
  window.applyCoupon = applyCoupon;

  updateCartCount();
  showCart();
});

document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const order = {
      customerName: document.getElementById("customerName").value,
      orderDate: document.getElementById("orderDate").value,
      customerAddress: document.getElementById("customerAddress").value,
      orderStatus: document.getElementById("orderStatus").value,
      orderPrice: document.getElementById("orderPrice").value,
    };

    // Lưu thông tin đơn hàng vào Local Storage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Chuyển hướng đến trang ecom-product-order.html
    window.location.href = "ecom-product-order.html";
  });
