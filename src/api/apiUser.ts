import axios from 'axios'
import { CustomerForm, CustomerFormSearch, LoginForm } from '@typesModel/Customer';
import axiosInstance, { baseURL } from '@hook/axiosInstance';
import DeviceInfo from 'react-native-device-info';
async function getDeviceInfo() {
  const deviceInfo = {
    browser: 'ReactNative', // vì không có trình duyệt trong RN
    browserVersion: 'N/A',
    os: DeviceInfo.getSystemName(),         // iOS / Android
    osVersion: DeviceInfo.getSystemVersion(),
    device: await DeviceInfo.getModel(),    // tên thiết bị (e.g., Pixel 6, iPhone 14)
  };
  return deviceInfo;
}
const apiLogin = async ({identifier, password} : LoginForm) => {
    try {
        const deviceInfo = await getDeviceInfo();
        console.log(`${baseURL}/login`)
        const response = await axios.post(`${baseURL}/login`, { identifier, password,deviceInfo });
        return response.data;
    } catch (error) {
        console.log(error)
    }
    
}
const apiCreateCustomer = async ({phone, name} : CustomerForm) => {
    const response = await axiosInstance.post('/customer/create', { phone, name });
    return response.data;
}
const apiSearchCustomer = async (name:string) => {
    const response = await axiosInstance.get(`/customer/search?name=${name}`);
    return response.data;
}
const apiUpdateCustomer = async ({id, payload} :{id:number, payload:CustomerForm}) => {
    const response = await axiosInstance.post(`/customer/update/${id}`, payload );
    return response.data;
}
const apiFindCustomer = async (phone :{phone:string}) => {
    const response = await axiosInstance.post('/find-customer', { phone });
    return response.data;
}
const apigetUser = async (id:number) => {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
}
const apiGetAllCustomer = async (page:number, limit:number, data: CustomerFormSearch) =>{
    const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(data && Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value)])))
    });
    const response = await axiosInstance.get(`/customer?${params}`);
    return response.data;
}


export {apiSearchCustomer, apiLogin,apiCreateCustomer,apiFindCustomer,apiGetAllCustomer,apiUpdateCustomer,apigetUser}