import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from 'react-modal';
import axios from 'axios';
import './MapContainer.css'

function permutations(array) {
  if (array.length === 0) return [[]];

  const [first, ...rest] = array;
  const restPermutations = permutations(rest);

  return restPermutations.flatMap((perm) =>
    [...Array(perm.length + 1).keys()].map((index) => [...perm.slice(0, index), first, ...perm.slice(index)])
  );
}

const calculateRoute = (customers) => {
  const points = customers;
  const allRoutes = permutations(points);
  const distances = Array.from(allRoutes, (route) =>
    route.reduce((acc, point, index) => (index === 0 ? 0 : acc + L.latLng(point).distanceTo(L.latLng(route[index - 1]))), 0)
  );

  const minDistance = Math.min(...distances);
  const minDistanceIndex = distances.indexOf(minDistance);
  const bestRoute = Array.from(allRoutes)[minDistanceIndex];

  // Ensure (0,0) is the first point in the route
  const routeWithStartingPoint = [points[0], ...bestRoute.filter(point => point[0] !== points[0][0])];

  return { route: routeWithStartingPoint, distance: minDistance };
};

const MapWithOptimizedRoute = () => {
  const [customers, setCustomers] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/customer');
        const responseData = response.data;
        setCustomers(responseData);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      const calculatedRoute = calculateRoute(
        customers.map((customer) => [parseFloat(customer.Latitude), parseFloat(customer.Longitude)])
      );
      setOptimizedRoute(calculatedRoute);
    }
  }, [customers]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>

      <button className='calcRouterButton' onClick={openModal}>
       Calculate Optimized Route
      </button>

      <MapContainer center={[0, 0]} zoom={1} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {optimizedRoute && optimizedRoute.route && (
          <Polyline positions={optimizedRoute.route} color="blue" />
        )}
        {customers.map((customer, index) => (
          <Marker key={index} position={[parseFloat(customer.Latitude), parseFloat(customer.Longitude)]}>
            <Popup>
              Customer {index + 1} <br />
              Latitude: {customer.Latitude} <br />
              Longitude: {customer.Longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Visitations Order"
      >
        <button className='calcRouterButton' onClick={closeModal}>close</button>
        <h2>Visitations Order</h2>
        {optimizedRoute && optimizedRoute.route && optimizedRoute.route.length > 0 ? (
          <ul>
            {optimizedRoute.route.map((point, index) => (
              <li key={index}>
                Customer {point[0]}, Latitude: {point[1]}, Longitude: {point[2]}
              </li>
            ))}
          </ul>
        ) : (
          <p>Any route to present.</p>
        )}
      </Modal>
    </>
  );
};

export default MapWithOptimizedRoute;
