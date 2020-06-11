import { Room } from "../classes/room";
import { Wall } from "../classes/wall";
import { ROOM_TYPE } from "../classes/roomtype";

const FLOOR_WIDTH = 99, FLOOR_DEPTH = 99;

export default AFRAME.registerComponent('floor', {
    schema: {
        level: { default: 0 }
    },

    init: function () {
        this.floor = [...Array(FLOOR_WIDTH)].map(() => [...Array(FLOOR_DEPTH)])

        this.currentRoomtype = ROOM_TYPE.LOBBY;

        this.createEmptyFloor();

        this.onPlaceholderChange = this.onPlaceholderChange.bind(this);
        this.el.addEventListener('placeholder-change', this.onPlaceholderChange);

        this.onDomClick = this.onDomClick.bind(this);
        this.el.sceneEl?.addEventListener('dom-click', this.onDomClick);
    },

    update: function (oldData) { },

    createEmptyFloor() {

        // /*10000000*/ //this.addRoom(ROOM_TYPE.LOBBY, { x:  1, z:  1 });
        // /*00010000*/ this.addRoom(ROOM_TYPE.LOBBY, { x:  0, z:  1 });
        // /*00000100*/ //this.addRoom(ROOM_TYPE.LOBBY, { x: -1, z:  1 });

        // /*01000000*/ //this.addRoom(ROOM_TYPE.LOBBY, { x:  1, z:  0 });
        // /*00000010*/ //this.addRoom(ROOM_TYPE.LOBBY, { x: -1, z:  0 });

        // /*00100000*/ this.addRoom(ROOM_TYPE.LOBBY, { x:  1, z:  -1 });        
        // /*00001000*/ this.addRoom(ROOM_TYPE.LOBBY, { x:  0, z:  -1 });
        // /*00000001*/ this.addRoom(ROOM_TYPE.LOBBY, { x: -1, z:  -1 });

        if (this.data.level === 0) {
            this.addRoom(ROOM_TYPE.LOBBY, { x: 0, z: 0 });
            this.updateWalls();
        } else {
            this.addFloors();
        }

        this.createRoomElements();
    },


    updateWalls() {
        // remove all walls first maybe?
        for (let x = 0; x < FLOOR_WIDTH; x++) {
            for (let z = 0; z < FLOOR_DEPTH; z++) {
                if (this.floor[x][z] &&
                    (this.floor[x][z].roomtype === ROOM_TYPE.WALL ||
                        this.floor[x][z].roomtype === ROOM_TYPE.FLOOR)) {
                    this.floor[x][z] = undefined;
                }
            }
        }

        for (let x = 0; x < FLOOR_WIDTH; x++) {
            for (let z = 0; z < FLOOR_DEPTH; z++) {

                if (this.floor[x][z]) {

                    continue;
                }

                let walltype = 0;
                let pp = 0;
                for (let cx = -1; cx <= 1; cx++) {
                    for (let cz = -1; cz <= 1; cz++) {
                        if (cx === 0 && cz === 0) continue;
                        if (this.floor[x + cx] &&
                            this.floor[x + cx][z + cz]
                            && this.floor[x + cx][z + cz].roomtype !== ROOM_TYPE.WALL
                            //&& this.floor[x + cx][z + cz].roomtype !== ROOM_TYPE.FLOOR
                        ) {
                            walltype += 1 << pp;
                        }
                        pp++;
                    }
                }
                if (walltype !== 0) {
                    const wall = new Wall(walltype, this.data.level === 0)
                    this.floor[x][z] = wall;
                }
            }
        }
    },

    onPlaceholderChange({ detail }) {
        this.el.querySelectorAll("a-entity").remove();
        this.addRoom(this.currentRoomtype, { x: detail.x, z: detail.z });
        
        this.updateWalls();
        this.addFloors();
        this.createRoomElements();

        const levelAboveEl = document.querySelector(`[data-level='${this.data.level + 1}']`);
        if (levelAboveEl) {
            const floorAboveComponent = levelAboveEl.components['floor'];
            levelAboveEl.querySelectorAll("a-entity").remove();
            floorAboveComponent.addFloors();
            floorAboveComponent.createRoomElements();
        }
    },

    createRoomElements() {
        for (let x = 0; x < FLOOR_WIDTH; x++) {
            for (let z = 0; z < FLOOR_DEPTH; z++) {
                const room = this.floor[x][z];
                if (room) {
                    const container = document.createElement("a-entity");
                    const roomEntity = document.createElement("a-entity");

                    roomEntity.setAttribute("mixin", room.getMixin());
                    roomEntity.setAttribute("rotation", { x: 0, z: 0, y: room.getRotation() });
                    if ((room.roomtype === ROOM_TYPE.WALL && this.data.level === 0)
                        ||
                        ((room.roomtype === ROOM_TYPE.FLOOR ||
                            room.hasFloor) && this.data.level !== 0)
                    ) {
                        container.setAttribute("placeholder", "");
                        container.setAttribute("data-type", room.getType());
                        if (room.hasFloor) {
                            const floorEntity = document.createElement("a-entity");
                            floorEntity.setAttribute('mixin', 'floor');
                            container.appendChild(floorEntity);
                        }
                    }
                    container.appendChild(roomEntity);
                    container.setAttribute("position", {
                        x: x - ~~(FLOOR_WIDTH / 2),
                        y: this.data.level * .5,
                        z: z - ~~(FLOOR_DEPTH / 2)
                    });
                    this.el.appendChild(container);
                }
            }
        }

    },

    addRoom(roomtype, pos) {
        const room = new Room(roomtype);
        this.floor[pos.x + ~~(FLOOR_WIDTH / 2)][pos.z + ~~(FLOOR_DEPTH / 2)] = room;
    },
    onDomClick(e) {
        if (e.detail.target.classList.contains('select-room')) {
            this.currentRoomtype = e.detail.target.value;
        }
    },

    addFloors() {
        const levelbelowEl = document.querySelector(`[data-level='${this.data.level - 1}']`);
        if (levelbelowEl) {
            const floorbelow = levelbelowEl.components['floor'].floor;
            for (let x = 0; x < FLOOR_WIDTH; x++) {
                for (let z = 0; z < FLOOR_DEPTH; z++) {

                    // if (this.floor[x][z] &&
                    //     this.floor[x][z].roomtype === ROOM_TYPE.WALL) {
                    //     wall.hasFloor = true;
                    // }

                    if (floorbelow[x][z] &&
                        (floorbelow[x][z].roomtype !== ROOM_TYPE.WALL &&
                            floorbelow[x][z].roomtype !== ROOM_TYPE.FLOOR)) {
                        if (!this.floor[x][z]) {
                            this.addRoom(ROOM_TYPE.FLOOR, { x: x - ~~(FLOOR_WIDTH / 2), z: z - ~~(FLOOR_DEPTH / 2) });
                        }else{
                            if(this.floor[x][z].roomtype === ROOM_TYPE.WALL){
                                this.floor[x][z].hasFloor = true;
                            }
                        }
                    }
                }
            }
        }
    }
});

NodeList.prototype.remove = function () {
    this.forEach(el => el.remove());
}

