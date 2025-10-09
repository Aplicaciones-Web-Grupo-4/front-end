/**
 * @file stands-api.js
 * @description API para manejar Stands y Fairs usando la arquitectura BaseApi/BaseEndpoint.
 * Se conecta con tu fake API en Render o con la local según el entorno.
 */

import { BaseApi } from '../../shared/infrastructure/base-api.js'
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://db-server-1-66zf.onrender.com'

const standsPath = import.meta.env.VITE_STANDS_ENDPOINT_PATH || `${BASE_URL}/stands`
const fairsPath  = import.meta.env.VITE_FAIRS_ENDPOINT_PATH  || `${BASE_URL}/fairs`

export class StandsApi extends BaseApi {
    #stands
    #fairs

    constructor() {
        super(BASE_URL)
        this.#stands = new BaseEndpoint(this, standsPath)
        this.#fairs  = new BaseEndpoint(this, fairsPath)
    }

    getStands() { return this.#stands.getAll() }
    getStandById(id) { return this.#stands.getById(id) }
    createStand(resource) { return this.#stands.create(resource) }
    updateStand(resource) { return this.#stands.update(resource.id, resource) }
    deleteStand(id) { return this.#stands.delete(id) }

    getFairs() { return this.#fairs.getAll() }
}
