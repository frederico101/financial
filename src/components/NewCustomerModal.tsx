// NewCustomerModal.js
import { useState } from "react";
import axios from "axios";
import "./NewCustomerModal.css";

const NewCustomerModal = ({ showModal, closeModal, updateTable }) => {
  const [formData, setFormData] = useState({
    Name: undefined,
    Latitude: undefined,
    Longitude: undefined,
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/customer", {
        
        Name: formData.name,
        Latitude: formData.latitude,
        Longitude: formData.longitude,
      });
      if(response.status == 200){
            alert(response.data)     
      }
      
      closeModal();
      updateTable();
    } catch (error) {
      console.error("Error adding new customer:", error);
    }
  };

  return (
   <div className="container">
      <div className={`modal ${showModal ? "show" : ""}`} style={{ zIndex: showModal ? 1000 : -1 }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
          <label className="addCustomerLabel">
            Name:
            <input type="text" name="name" value={formData.Name} onChange={handleChange} />
          </label>

          <label>
            Latitude:
            <input type="text" name="latitude" value={formData.Latitude} onChange={handleChange} />
          </label>
          
          <label>
            Longitude:
            <input type="text" name="longitude" value={formData.Longitude} onChange={handleChange} />
          </label>
          
          <button className="submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
};

export default NewCustomerModal;
