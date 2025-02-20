import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const albumImages = [
    {
      id: 1,
      title: "Album 1",
      image: "https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5",
    },
    {
      id: 2,
      title: "Album 2",
      image: "https://i.scdn.co/image/ab67616d0000b27318974569625e8449a5497ef3",
    },
    {
      id: 3,
      title: "Album 3",
      image: "https://i.scdn.co/image/ab67616d0000b2734aae15b54015e5d6cd870073",
    },
    {
      id: 4,
      title: "Album 4",
      image: "https://i.scdn.co/image/ab67616d0000b2730744690248ef3ba7b776ea7b",
    },
    {
      id: 5,
      title: "Album 5",
      image: "https://i.scdn.co/image/ab67616d0000b2731fcabc8a98dd45fac3daf6ac",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % albumImages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="ipod-container">
        <Link to="/shop">
        <img src="/ipod.png" alt="iPod" className="ipod-image" />
          <div className="album-screen">
            <div className="album-slider" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
              {albumImages.map((album, index) => (
                <img
                  key={album.id}
                  src={album.image}
                  alt={album.title}
                  className="album-image"
                />
              ))}
            </div>
          </div>
        </Link>
      </div>

      <h1>Welcome to THE Music Store!</h1>
      <p>Discover the best albums at unbeatable prices.</p>
      <Link to="/shop">
        <button className="shop-now-btn">Shop Now</button>
      </Link>
    </div>
  );
}

export default Home;