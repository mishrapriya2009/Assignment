import axios from "axios";
const baseURL = "http://127.0.0.1:8000"

export const CustomerDetailsPost = async (data) => {
    const response = await axios.post(`${baseURL}/customers/`, data)
    return response.data;
}

export const GetCustomersDetails = async () => {
 const response = await axios.get(`${baseURL}/customers/`)
 return response.data
};

export const CustomerDetailsDelete = async (id) => {
    const response = await axios.delete(`${baseURL}/customers/${id}/`)
    return response.data;
}

