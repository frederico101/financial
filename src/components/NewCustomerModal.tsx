// NewCustomerModal.js
import { useState } from "react";
import axios from "axios";
import "./NewCustomerModal.css";

const NewCustomerModal = ({ showModal, closeModal, updateTable }) => {
  const [formData, setFormData] = useState({
    Name: undefined,
    SecondName: undefined,
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
        SecondName: formData.secondName,
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
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.Name} onChange={handleChange} />
          </label>
          <label>
            Second Name:
            <input type="text" name="secondName" value={formData.SecondName} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewCustomerModal;
