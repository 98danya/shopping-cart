import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Our Store!</h1>
      <p>Discover the best products at unbeatable prices.</p>
      <Link to="/shop">
        <button className="shop-now-btn">Shop Now</button>
      </Link>
    </div>
  );
}

export default Home;