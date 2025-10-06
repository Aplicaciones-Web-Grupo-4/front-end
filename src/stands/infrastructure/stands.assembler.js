import { Stand } from '../domain/model/stand.entity.js';
export class StandAssembler {
    static toEntity(resource) { return new Stand({ ...resource }); }
    static toEntities(response) {
        if (response.status !== 200) return [];
        const resources = Array.isArray(response.data) ? response.data : response.data['stands'];
        return resources.map(r => this.toEntity(r));
    }
    static toResource(entity) { return { ...entity }; }
}
