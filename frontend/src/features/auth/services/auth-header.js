export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (user && token) {
    // for Node.js Express back-end
    return { "x-access-token": token };
  } else {
    return {};
  }
}
