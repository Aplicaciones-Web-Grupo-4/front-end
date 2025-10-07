// events/application/event.assembler.js
import { Event, Stand } from "../domain/model/event.entity";

export function toStandEntity(dto = {}) {
    return new Stand({
        id: dto.id,
        name: dto.name,
        image: dto.image,
        category: dto.category,
        shortDescription: dto.shortDescription,
    });
}

export function toEventEntity(dto = {}) {
    return new Event({
        id: dto.id,
        slug: dto.slug ?? dto.id,
        title: dto.title,
        // Acepta cover o coverImage:
        cover: dto.cover ?? dto.coverImage,
        description: dto.description,
        // Acepta days o schedules:
        schedules: dto.days ?? dto.schedules ?? [],
        // Acepta locationText/Lat/Lng o location {label, lat, lng}:
        location: {
            label: dto.locationText ?? dto.location?.label,
            lat: dto.locationLat ?? dto.location?.lat,
            lng: dto.locationLng ?? dto.location?.lng,
        },
        stands: (dto.stands ?? []).map(toStandEntity),
    });
}
