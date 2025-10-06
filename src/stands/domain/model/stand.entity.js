export class Stand {
    constructor({ id=null, name='', category='', fairId=null, code='' }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.fairId = fairId;
        this.code = code; // p.ej. "A1"
    }
}
