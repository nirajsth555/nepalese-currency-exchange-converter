import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://www.nrb.org.np/api/forex/v1/"
    baseURL: process.env.REACT_APP_API_BASE_URL
});

export const fetchRates = (data) => {
    return axiosInstance.get("rates", {
        params: {
            per_page: data.perPage,
            from: data.fromDate,
            to: data.toDate,
            page: data.page
        }
    })
}



