import React, { useEffect, useState } from 'react';
import './Customer_Mangement.css';
import {Table} from 'antd';
import { CustomerDetailsPost, GetCustomersDetails,CustomerDetailsDelete } from '../Coreapi';

const CustomerManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
  });

  const [errors, setErrors] = useState({});
  const [customerList, setCustomerList] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this customer?')) {
    try {
      await CustomerDetailsDelete(id);
      alert('Customer deleted successfully!');
      fetchCustomers(); // Refresh list after deletion
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete customer.');
    }
  }
};



console.log(customerList)
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
   {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <button onClick={() => handleDelete(record.id)} className="delete-btn">
        Delete
      </button>
    ),
  },
]
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const fetchCustomers = async () => {
    try {
      const response = await GetCustomersDetails();
      console.log(response,'jhkjhkg')
      setCustomerList(response);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await CustomerDetailsPost(formData);
      alert('Customer added successfully!');
      setFormData({ name: '', email: '', phone: '', address: '', company: '' });
      setErrors({});
      fetchCustomers(); // Refresh table
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to add customer.');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customer-management">
      <h2>Customer Management</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        {['name', 'email', 'phone', 'address', 'company'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)} {['name', 'email', 'phone'].includes(field) && '*'}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <div className="error">{errors[field]}</div>}
          </div>
        ))}
        <div className="form-group full-width">
          <button type="submit">Add Customer</button>
        </div>
      </form>

      <h3>Customer List</h3>
      {/* <table className="customer-table" border={1}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Company</th>
          </tr>
        </thead>
        <tbody >
          {customerList.length > 0 ? (
            customerList.map((cust, idx) => (
              <tr key={idx}>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.address}</td>
                <td>{cust.company}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No customers found.</td></tr>
          )}
        </tbody>
      </table> */}

      <Table dataSource={customerList} columns={columns} />
    </div>
  );
};

export default CustomerManagement;
