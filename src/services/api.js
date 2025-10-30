import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://book-it-experiences-slots-backend-7.vercel.app/api',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const getExperiences = () => api.get('/experiences')
export const getExperience = (id) => api.get(`/experiences/${id}`)
export const postBooking = (data) => api.post('/bookings', data)
export const validatePromo = (code) => api.post('/promo/validate', { code })

export default api
