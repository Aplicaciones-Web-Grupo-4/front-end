import { AssignedStand } from "../domain/assigned-stand.entity.js";

export class AssignedStandAssembler {

    static toEntity(resource) {
        return new AssignedStand({
            id: resource.id,
            eventId: resource.eventId,
            name: resource.name,
            category: resource.category
        });
    }

    static toEntities(response) {
        if (response.status !== 200) return [];
        return response.data.map(r => this.toEntity(r));
    }

    static toResource(entity) {
        return {
            name: entity.name,
            category: entity.category
        };
    }
}
