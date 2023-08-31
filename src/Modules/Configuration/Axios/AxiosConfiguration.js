import axios from "axios";

// Token Example
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMzgwODIyLCJleHAiOjE2OTU5NzI4MjJ9.8JtNA9iiLk315BizUjJxW1MDH_RK83eE-yYYwKb4p3M";
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `${token}`,
    },
});