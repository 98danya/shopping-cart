import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function NavBar() {
  const { cart } = useContext(CartContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePopoverToggle = (e) => {
    e.preventDefault();
    setIsPopoverOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.cart-container')) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleViewCartClick = () => {
    setIsPopoverOpen(false);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>

      <div className="cart-container">
        <Link
          to="/cart"
          className="cart-link"
          onClick={handlePopoverToggle}
        >
          Cart ({getCartItemCount()})
        </Link>

        {isPopoverOpen && (
          <div className="cart-popover">
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <Link to="/cart" className="view-cart-link" onClick={handleViewCartClick}>
              View Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;