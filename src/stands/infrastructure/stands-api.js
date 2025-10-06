import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const standsPath = import.meta.env.VITE_STANDS_ENDPOINT_PATH;
const fairsPath  = import.meta.env.VITE_FAIRS_ENDPOINT_PATH;

export class StandsApi extends BaseApi {
    #stands; #fairs;
    constructor() {
        super();
        this.#stands = new BaseEndpoint(this, standsPath);
        this.#fairs  = new BaseEndpoint(this, fairsPath);
    }
    getStands() { return this.#stands.getAll(); }
    getStandById(id) { return this.#stands.getById(id); }
    createStand(resource) { return this.#stands.create(resource); }
    updateStand(resource) { return this.#stands.update(resource.id, resource); }
    deleteStand(id) { return this.#stands.delete(id); }

    getFairs() { return this.#fairs.getAll(); }
}
