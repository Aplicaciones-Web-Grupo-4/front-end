import { BaseApi } from '../../shared/infrastructure/base-api.js'

const BASE_URL = import.meta.env.VITE_API_URL

export class StandsApi extends BaseApi {
    constructor() {
        super(BASE_URL)
    }

    // --- NUEVO: Stands asignados a un evento ---
    getAssigned(eventId) {
        return this.get(`/api/events/${eventId}/stands`)
    }

    createAssigned(eventId, resource) {
        return this.post(`/api/events/${eventId}/stands`, resource)
    }

    updateAssigned(resource) {
        return this.put(`/api/stands/${resource.id}`, resource)
    }

    deleteAssigned(standId) {
        return this.delete(`/api/stands/${standId}`)
    }

    // --- Eventos reales ---
    getEvents() {
        return this.get(`/api/events`)
    }
}
