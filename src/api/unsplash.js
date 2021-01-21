import axios from "axios";

// jiaYupSlgXodRTHU_AOvambWl5uwe2mT0k4AFGpXJpI

// becareful with the Authorization, not to much space between otherwise you will get error
export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID jiaYupSlgXodRTHU_AOvambWl5uwe2mT0k4AFGpXJpI",
  },
});
