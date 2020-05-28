import { Room } from "../classes/room";

AFRAME.registerComponent('floor', {
    schema: {
        width: { default: 13 },
        depth: { default: 13 },
        level: { default: 0 }
    },
    init: function () {
        this.createEmptyFloor();
        this.floor = [[]];

        this.onPlaceholderChange = this.onPlaceholderChange.bind(this);
        this.el.addEventListener('placeholder-change', this.onPlaceholderChange);
    },

    update: function (oldData) { },

    createEmptyFloor() {
        this.startRoom = new Room();
        this.addRoom({ x: 0, z: 0 });
        this.walls = [];
        this.checkedRoom = [];
        this.updateWalls(this.startRoom, { x: 0, z: 0 })
    },

    createWall() {
        const container = document.createElement("a-entity");
        const wall = document.createElement("a-entity");

        if (this.data.level === 0) {
            wall.setAttribute("mixin", "wall-straight-ground");
        } else {
            wall.setAttribute("mixin", "wall-straight");
        }
        container.setAttribute("placeholder", "");
        container.classList.add("wall");
        container.appendChild(wall);
        return container;
    },

    updateWalls(room, pos) {
        // check room is already checked.
        if (!!~this.checkedRoom.indexOf(room.id)) {
            return;
        }
        this.checkedRoom.push(room.id);
        if (!room.north) {
            
            const wall = this.createWall();
            const wallPos = {
                x: pos.x,
                y: this.data.level * .5,
                z: pos.z + 1
            };
            wall.setAttribute("position", wallPos)
            wall.setAttribute("rotation", { y: 270 });
            this.el.appendChild(wall);            
            this.walls.push({ pos: wallPos, dir: { north: room } });
        } else {
            this.updateWalls(room.north,  {
                x: pos.x,
                z: pos.z + 1
            });
        }

        if (!room.south) {
            const wall = this.createWall();
            const wallPos = {
                x: pos.x,
                y: this.data.level * .5,
                z: pos.z - 1
            };
            wall.setAttribute("position", wallPos)
            wall.setAttribute("rotation", { y: 90 });
            this.el.appendChild(wall);
            this.walls.push({ pos: wallPos, dir: { south: room } });
        } else {
            this.updateWalls(room.south, {
                x: pos.x,
                z: pos.z - 1
            });
        }

        if (!room.east) {
            const wall = this.createWall();
            const wallPos = {
                x: pos.x - 1,
                y: this.data.level * .5,
                z: pos.z
            };
            wall.setAttribute("position", wallPos)
            wall.setAttribute("rotation", { y: 180 });
            this.el.appendChild(wall);
            this.walls.push({ pos: wallPos, dir: { east: room } });
        } else {
            this.updateWalls(room.east, {
                x: pos.x - 1,
                z: pos.z
            });
        }

        if (!room.west) {
            const wall = this.createWall();
            const wallPos = {
                x: pos.x + 1,
                y: this.data.level * .5,
                z: pos.z
            };
            wall.setAttribute("position", wallPos)
            wall.setAttribute("rotation", { y: 0 });
            this.el.appendChild(wall);
            this.walls.push(
                {
                    pos: wallPos,
                    dir: { west: room }
                });
            } else {
                this.updateWalls(room.west, {
                    x: pos.x + 1,
                    z: pos.z
                });
            }
        //add room to the list of checked rooms
        
    },

    onPlaceholderChange({ detail }) {
        let wall = this.walls.find(d => d.pos.x === detail.x && d.pos.z === detail.z);
        // What do we need to do.
        if (!wall) return;
        this.addRoom(wall.pos);
        const newRoom = new Room();
        if(wall.dir.south){
            const southRoom = wall.dir.south;
            newRoom.north = southRoom;
            southRoom.south = newRoom
        }
        if(wall.dir.north){
            const northRoom = wall.dir.north;
            newRoom.south = northRoom;
            northRoom.north = newRoom
        }
        if(wall.dir.east){
            const eastRoom = wall.dir.east;
            newRoom.west = eastRoom;
            eastRoom.east = newRoom
        }
        if(wall.dir.west){
            const westRoom = wall.dir.west;
            newRoom.east = westRoom;
            westRoom.west = newRoom
        }
        this.el.querySelectorAll(".wall").remove();  
        this.checkedRoom = [];
        this.walls = [];
        this.updateWalls(this.startRoom, { x: 0, z: 0 })   
    },
    
    addRoom(pos) {
        const container = document.createElement("a-entity");
        const lobby = document.createElement("a-entity");
        lobby.setAttribute("mixin", "lobby");
        container.appendChild(lobby);
        container.setAttribute("position", {
            x: pos.x,
            y: this.data.level * .5,
            z: pos.z
        });
        this.el.appendChild(container);
    }
});

NodeList.prototype.remove = function(){
    this.forEach(el => el.remove());
}
