import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Category from "./components/Category";
import TopRest from "./components/TopRest";
import OnlineDelivery from "./components/OnlineDelivery";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const [search, setSearch] = useState("");

  return (
    <>
      <Header cart={cart} setShowCart={setShowCart} setShowSignIn={setShowSignIn} user={user} setUser={setUser} onSearch={setSearch} />
      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onSignIn={(u) => setUser(u)}
        />
      )}
      <Category />
      <TopRest setCart={setCart} search={search} />
      <OnlineDelivery setCart={setCart} search={search} />
      {showCart && (
        <Cart cart={cart} setCart={setCart} onClose={() => setShowCart(false)} />
      )}
      <Footer />
    </>
  );
}