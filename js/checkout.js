function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("valentina_cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Create order object
  const order = {
    id: "ORD-" + Date.now(),
    name: document.getElementById("name")?.value || "N/A",
    phone: document.getElementById("phone")?.value || "N/A",
    address: document.getElementById("address")?.value || "N/A",
    items: cart,
    total: total.toFixed(2),
    date: new Date().toLocaleString()
  };

  // Save order
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Clear cart
  localStorage.removeItem("valentina_cart");

  // Redirect
  window.location.href = "checkout-success.html";
}
