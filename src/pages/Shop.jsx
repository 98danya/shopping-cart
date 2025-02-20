import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const PLAYLIST_ID = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID;

const getAccessToken = async () => {
  const auth = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": auth,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const data = await response.json();
  return data.access_token;
};

const ShopPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      setLoading(true);
      try {
        const token = await getAccessToken();

        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        const uniqueAlbums = new Map();

        data.items.forEach((track) => {
          const album = track.track.album;
          if (!uniqueAlbums.has(album.id)) {
            uniqueAlbums.set(album.id, {
              id: album.id,
              title: album.name,
              artist: album.artists.map((artist) => artist.name).join(", "),
              image: album.images[0]?.url,
              releaseDate: album.release_date,
              price: 10,
            });
          }
        });

        setAlbums([...uniqueAlbums.values()]);
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
      }
      setLoading(false);
    };

    fetchPlaylistTracks();
  }, []);

  return (
    <div className="shop-container">
      <h1>Albums On Sale</h1>

      {loading ? <p>Loading albums...</p> : null}

      <div className="grid">
        {albums.map((album) => (
          <ProductCard key={album.id} product={album} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;