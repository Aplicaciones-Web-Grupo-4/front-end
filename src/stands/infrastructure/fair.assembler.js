import { Fair } from '../domain/model/fair.entity.js';
export class FairAssembler {
    static toEntity(r) { return new Fair({ ...r }); }
    static toEntities(resp) {
        if (resp.status !== 200) return [];
        const arr = Array.isArray(resp.data) ? resp.data : resp.data['fairs'];
        return arr.map(this.toEntity);
    }
}
