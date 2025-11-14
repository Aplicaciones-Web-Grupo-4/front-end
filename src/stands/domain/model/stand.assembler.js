import { Stand } from "../domain/model/stand.entity.js";

export class StandAssembler {
    static toEntity(resource) {
        return new Stand({
            id: resource.id,
            name: resource.name,
            category: resource.category,
            eventId: resource.eventId
        });
    }

    static toEntities(response) {
        if (response.status !== 200) return [];
        return response.data.map(r => this.toEntity(r));
    }

    static toResource(entity) {
        return {
            id: entity.id,
            name: entity.name,
            category: entity.category
        };
    }
}
