import React from "react";

export default function Cart({ cart = [], setCart, onClose }) {
  const itemsMap = cart.reduce((acc, item) => {
    const key = item.id || item.name || item.title || JSON.stringify(item);
    if (!acc[key]) acc[key] = { item, qty: 0 };
    acc[key].qty += 1;
    return acc;
  }, {});

  const items = Object.entries(itemsMap);

  const removeOne = (key) => {
    const idx = cart.findIndex((c) => {
      const k = c.id || c.name || c.title || JSON.stringify(c);
      return k === key;
    });
    if (idx > -1) {
      const copy = [...cart];
      copy.splice(idx, 1);
      setCart(copy);
    }
  };

  const clearCart = () => setCart([]);

  const buy = () => {
    if (!cart.length) return alert("Cart is empty");
    const orderId = Math.random().toString(36).slice(2, 9).toUpperCase();
    const eta = Math.floor(Math.random() * 30) + 20; // 20-50 mins
    alert(`Order ${orderId} placed! ETA ${eta} mins.`);
    clearCart();
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-[90%] max-w-[600px] rounded p-4 shadow-lg z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Your Cart</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="max-h-[50vh] overflow-auto">
          {items.length === 0 && <div className="text-center text-gray-500">Cart is empty</div>}

          {items.map(([key, { item, qty }]) => (
            <div key={key} className="flex items-center justify-between border-b py-2">
              <div>
                <div className="font-semibold">{item.title || item.name || item.restaurant || "Item"}</div>
                <div className="text-sm text-gray-500">Qty: {qty}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => removeOne(key)} className="px-3 py-1 bg-gray-200 rounded">-</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={clearCart} className="px-4 py-2 bg-gray-200 rounded">Clear</button>
          <button onClick={buy} className="px-4 py-2 bg-[#fc8019] text-white rounded">Buy ({cart.length})</button>
        </div>
      </div>
    </div>
  );
}
