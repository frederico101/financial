import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function permutations(array) {
  if (array.length === 0) return [[]];

  const [first, ...rest] = array;
  const restPermutations = permutations(rest);

  return restPermutations.flatMap((perm) =>
    [...Array(perm.length + 1).keys()].map((index) => [...perm.slice(0, index), first, ...perm.slice(index)])
  );
}

const calculateRoute = (customers) => {
  const points = [[0, 0], ...customers];
  const allRoutes = permutations(points);
  const distances = Array.from(allRoutes, (route) =>
    route.reduce((acc, point, index) => (index === 0 ? 0 : acc + L.latLng(point).distanceTo(L.latLng(route[index - 1]))), 0)
  );

  const minDistance = Math.min(...distances);
  const minDistanceIndex = distances.indexOf(minDistance);
  const bestRoute = Array.from(allRoutes)[minDistanceIndex];

  return { route: bestRoute, distance: minDistance };
};

const MapWithOptimizedRoute = () => {
  const [customers, setCustomers] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer");
      const responseData = response.data;
      setPosts(responseData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    // Replace this with your logic to fetch customer data from your database
    const sampleCustomers = [
      { lat: 1, lng: 2 },
      { lat: 3, lng: 4 },
      { lat: 5, lng: 6 },
    ];

    setCustomers(customers);
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      const { route } = calculateRoute(customers);
      setOptimizedRoute(route);
    }
  }, [customers]);

  return (
    <MapContainer center={[0, 0]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {optimizedRoute.length > 0 && (
        <>
          <Polyline positions={optimizedRoute} color="blue" />
          {customers.map((customer, index) => (
            <Marker key={index} position={[customer.lat, customer.lng]}>
              <Popup>
                Customer {index + 1} <br />
                Latitude: {customer.lat} <br />
                Longitude: {customer.lng}
              </Popup>
            </Marker>
          ))}
        </>
      )}
    </MapContainer>
  );
};

export default MapWithOptimizedRoute;