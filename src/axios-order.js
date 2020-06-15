import Axios from "axios";


const orderAxios =Axios.create({
    baseURL:"https://react-my-burger-8963b.firebaseio.com/"
})

export default orderAxios;