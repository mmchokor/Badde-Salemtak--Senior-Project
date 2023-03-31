import axios from 'axios'
import { API_URL } from '../constants/apiURL'

// It is a sign up function that takes data as a parameter and returns the result
// results contain all the user info in a form of an object
const signUp = async (data) => {
   try {
      const response = await axios.post(`${API_URL}/users/`, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      })
      return response.data // Return only the data object from the response
   } catch (error) {
      throw error.response.data // Throw the response data as an error
   }
}

// It is a sign in function that takes data as a parameter and returns the result
// results contain only the authentication token
const signIn = async (data) => {
   try {
      const response = await axios.post(`${API_URL}/users/login`, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      })
      return response.data 
   } catch (error) {
      throw error // Throw the response data as an error
   }
}

// It is a forget password function that takes data as a parameter and returns the result
// return either a success message or an error message
const forgetPassword = async (data) => {
   try {
      const response = await axios.post(
         `${API_URL}/users/forgetPassword`,
         data,
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      )
      return response.data
   } catch (error) {
      throw error.response.data
   }
}

// It is a update user info function that takes data and token as a parameter and returns the result
// return the updates user info in a form of an object
const updateUserInfo = async (data, token) => {
   try {
      const response = await axios.patch(`${API_URL}/users/updateMe`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
      })
      return response.data
   } catch (error) {
      throw error.response.data
   }
}

// It is a update user password function that takes data and token as a parameter and returns the result
// return either a success message or an error message and the user with new token
const updateUserPassword = async (data, token) => {
   try {
      const response = await axios.patch(
         `${API_URL}/users/updateMyPassword`,
         data,
         {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
         }
      )
      return response.data
   } catch (error) {
      throw error.response.data
   }
}

// export all module
export { forgetPassword, signIn, signUp, updateUserInfo, updateUserPassword }

