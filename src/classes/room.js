export class Room {
    constructor(roomtype) {
        this.roomtype = roomtype;
        this.id = +new Date();
    }

    getMixin() {
        return this.roomtype;
    }

    getRotation() { return 0 };
}