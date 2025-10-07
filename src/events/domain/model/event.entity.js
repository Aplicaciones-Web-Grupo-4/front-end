// events/domain/model/event.entity.js
export class Stand {
    constructor({ id, name, image, category, shortDescription } = {}) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.category = category;
        this.shortDescription = shortDescription;
    }
}

export class Event {
    constructor({
                    id,
                    slug,
                    title,
                    cover,
                    description,
                    schedules = [],
                    location = { lat: 0, lng: 0, label: '' },
                    stands = []
                } = {}) {
        this.id = id;
        this.slug = slug ?? id;
        this.title = title;
        this.cover = cover; // <- usaremos "cover" (no "coverImage")
        this.description = description;
        this.schedules = schedules;
        this.location = location;
        this.stands = stands.map(s => (s instanceof Stand ? s : new Stand(s)));
    }
}
