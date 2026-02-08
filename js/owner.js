// PROTECT PAGE
if (localStorage.getItem("owner_logged_in") !== "true") {
  window.location.href = "ownerlogin.html";
}

// LOAD ORDERS
const ordersDiv = document.getElementById("orders");
const orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  ordersDiv.innerHTML = "<p>No orders yet.</p>";
} else {
  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "order";
    div.innerHTML = `
      <strong>Order #${order.id}</strong><br>
      Name: ${order.name}<br>
      Phone: ${order.phone}<br>
      Address: ${order.address}<br>
      Total: $${order.total}
    `;
    ordersDiv.appendChild(div);
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("owner_logged_in");
  window.location.href = "ownerlogin.html";
}
