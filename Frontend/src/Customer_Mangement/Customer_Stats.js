import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import { GetCustomersDetails } from '../Coreapi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import './Customer_Stats.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CustomerDashboard = () => {
  const [customerList, setCustomerList] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await GetCustomersDetails();
      setCustomerList(response);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Example: Count customers by company for chart
  const companyCounts = customerList.reduce((acc, customer) => {
    acc[customer.company] = (acc[customer.company] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(companyCounts),
    datasets: [
      {
        label: 'Customers per Company',
        data: Object.values(companyCounts),
        backgroundColor: '#1890ff',
      },
    ],
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
  ];

  return (
    <div className="customer-dashboard">
      <h2>Customer Dashboard</h2>

      <Card title="Total Customers" className="total-customer-card">
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{customerList.length}</p>
      </Card>

      <Card title="Customers by Company" className="chart-card">
        <Bar data={chartData} />
      </Card>

      <h3>Customer List</h3>
      <Table dataSource={customerList} columns={columns} rowKey="id" />
    </div>
  );
};

export default CustomerDashboard;
