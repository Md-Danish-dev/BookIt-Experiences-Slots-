import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' })
export const getExperiences = () => api.get('/experiences')
export const getExperience = (id) => api.get(`/experiences/${id}`)
export const postBooking = (data) => api.post('/bookings', data)
export const validatePromo = (code) => api.post('/promo/validate', { code })
export default api
