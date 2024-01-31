import { MapContainer } from 'react-leaflet'
import './App.css'
import EnterpriseCustomer from './components/EnterpriseCustomer'
import MapWithOptimizedRoute from './components/routeComponent/MapContainer'


function App() {
  

  return (
    <>
    <EnterpriseCustomer></EnterpriseCustomer>
    <MapWithOptimizedRoute />
    </>
    )
}

export default App
