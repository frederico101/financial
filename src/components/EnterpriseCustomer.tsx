import { useState, useEffect } from "react";
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from 'jquery';
import 'datatables.net';
import NewCustomerModal from "./NewCustomerModal";
import "./NewCustomerModal.css";
import moment from "moment";

const EmployeeTable = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    $('#custumerTable').DataTable().destroy();

    if (posts.length > 0) {
      $('#custumerTable').DataTable();
    }
  }, [posts]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateTable = async () => {
    try {
      const updatedPosts = await getPosts();

      $('#custumerTable').DataTable().destroy();

      if (updatedPosts != null) {
        $('#custumerTable').DataTable();
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Customer</button>

      {posts.length > 0 ? (
        <table id="custumerTable" className="display">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.Name || "N/A"}</td>
                <td>{post.Latitude || "N/A"}</td>
                <td>{post.Longitude || "N/A"}</td>
                <td>{moment(post.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                <td>{moment(post.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}

      <NewCustomerModal showModal={showModal} closeModal={closeModal} updateTable={updateTable} />
    </div>
  );
};

export default EmployeeTable;
