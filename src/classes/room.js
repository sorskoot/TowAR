export class Room {
    constructor(roomtype) {
        this.roomtype = roomtype;
        this.id = ~~(Math.random()*new Date());
    }
    getType() {return ""}
    getMixin() {
        return this.roomtype;
    }

    getRotation() { return 0 };
}