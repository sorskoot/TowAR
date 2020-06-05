import { Room } from "./room";
import { ROOM_TYPE } from "./roomtype";


 /*
        [1][2][3]       [6][4][1]
        [4][X][5]       [7][x][2]
        [6][7][8]       [8][5][3]
    */

const walltypes = {
    0b00000001: { type: "corner", rot: 0 },
    0b00000100: { type: "corner", rot: 90 },
    0b10000000: { type: "corner", rot: 180 },
    0b00100000: { type: "corner", rot: 270 },

    0b00000010: { type: "straight", rot: 0 },
    0b00010000: { type: "straight", rot: 90 },
    0b01000000: { type: "straight", rot: 180 },
    0b00001000: { type: "straight", rot: 270 },
    
    0b00000011: { type: "straight", rot: 0 },
    0b00000110: { type: "straight", rot: 0 },
    0b00000111: { type: "straight", rot: 0 },
    
    0b00010100: { type: "straight", rot: 90 },
    0b10010100: { type: "straight", rot: 90 },
    0b10010000: { type: "straight", rot: 90 },

    0b11000000: { type: "straight", rot: 180 },
    0b01100000: { type: "straight", rot: 180 },
    0b11100000: { type: "straight", rot: 180 },

    0b00001001: { type: "straight", rot: 270 },
    0b00101000: { type: "straight", rot: 270 },
    0b00101001: { type: "straight", rot: 270 },
    
   
    0b00010010: { type: "straight2", rot: 0 },
    0b01010000: { type: "straight2", rot: 90 },
    0b01001000: { type: "straight2", rot: 180 },
    0b00001010: { type: "straight2", rot: 270 },

}

const WALLTYPE_STRAIGHT2_0 = 0b00010010;
const WALLTYPE_STRAIGHT2_90 = 0b01010000;
const WALLTYPE_STRAIGHT2_180 = 0b01001000;
const WALLTYPE_STRAIGHT2_270 = 0b00001010;

const WALLTYPE_STRAIGHT3_0 = 0b01010010;
const WALLTYPE_STRAIGHT3_90 = 0b01011000;
const WALLTYPE_STRAIGHT3_180 = 0b01001010;
const WALLTYPE_STRAIGHT3_270 = 0b00011010;

const WALLTYPE_STRAIGHT4 = 0b01011010;
const WALLTYPE_CORNER4 = 0b10100101;

const WALLTYPE_CORNER3_0 = 0b00100101;
const WALLTYPE_CORNER3_90 = 0b10000101;
const WALLTYPE_CORNER3_180 = 0b10100001;
const WALLTYPE_CORNER3_270 = 0b10100100;

export class Wall extends Room {
    /**
     * Creates a new Wall
     * @param {number} walltype A binary representation of the surrounding rooms
     * @param {boolean} groundfloor True if the wall is on the ground floor
     */
    constructor(walltype, groundfloor) {
        super(ROOM_TYPE.WALL);
        this.walltype = walltype;
        this.groundfloor = groundfloor;
        //choose wall mixin and rotation based on walltype
    }

    getMixin() {
        if(walltypes[this.walltype]){
            return `wall-${walltypes[this.walltype].type}${this.groundfloor?"-ground":""}`    
        }
        return "placeholder";

        // if ((this.walltype & WALLTYPE_STRAIGHT4) === WALLTYPE_STRAIGHT4) {
        //     mixin += '-straight4';
        // } else if (
        //     (this.walltype & WALLTYPE_STRAIGHT3_0) === WALLTYPE_STRAIGHT3_0 ||
        //     (this.walltype & WALLTYPE_STRAIGHT3_90) === WALLTYPE_STRAIGHT3_90 ||
        //     (this.walltype & WALLTYPE_STRAIGHT3_180) === WALLTYPE_STRAIGHT3_180 ||
        //     (this.walltype & WALLTYPE_STRAIGHT3_270) === WALLTYPE_STRAIGHT3_270) {
        //     mixin += '-straight3';
        //     // } else if ((this.walltype & WALLTYPE_CORNER4) === WALLTYPE_CORNER4) {
        //     //     mixin += '-corner4';
        //     // } else if ((this.walltype & WALLTYPE_CORNER3_0) === WALLTYPE_CORNER3_0 ||
        //     //     (this.walltype & WALLTYPE_CORNER3_90) === WALLTYPE_CORNER3_90 ||
        //     //     (this.walltype & WALLTYPE_CORNER3_180) === WALLTYPE_CORNER3_180 ||
        //     //     (this.walltype & WALLTYPE_CORNER3_270) === WALLTYPE_CORNER3_270) {
        //     //     mixin += '-corner3';
        // } else if ((this.walltype & WALLTYPE_STRAIGHT2_270) === WALLTYPE_STRAIGHT2_270 ||
        //     (this.walltype & WALLTYPE_STRAIGHT2_180) === WALLTYPE_STRAIGHT2_180 ||
        //     (this.walltype & WALLTYPE_STRAIGHT2_90) === WALLTYPE_STRAIGHT2_90 ||
        //     (this.walltype & WALLTYPE_STRAIGHT2_0) === WALLTYPE_STRAIGHT2_0
        // ) {
        //     mixin += '-straight2';
        //     // } else if (this.walltype === WALLTYPE_CORNER_0 ||
        //     //     this.walltype === WALLTYPE_CORNER_90 ||
        //     //     this.walltype === WALLTYPE_CORNER_270 ||
        //     //     this.walltype === WALLTYPE_CORNER_180) {
        //     //     mixin += '-corner';
        // } else {
        //     mixin += '-straight';
        // }

        if (this.groundfloor) {
            mixin += '-ground';
        }
        return mixin;
    }

   
    getRotation() {
        return walltypes[this.walltype]?.rot ?? 0;
     

        // if ((this.walltype & WALLTYPE_STRAIGHT3_0) === WALLTYPE_STRAIGHT3_0) {
        //     return 0;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT3_90) === WALLTYPE_STRAIGHT3_90) {
        //     return 90;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT3_180) === WALLTYPE_STRAIGHT3_180) {
        //     return 180;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT3_270) === WALLTYPE_STRAIGHT3_270) {
        //     return 270;
        // }

        // if ((this.walltype & WALLTYPE_STRAIGHT2_270) === WALLTYPE_STRAIGHT2_270) {
        //     return 270;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT2_180) === WALLTYPE_STRAIGHT2_180) {
        //     return 180;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT2_90) === WALLTYPE_STRAIGHT2_90) {
        //     return 90;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT2_0) === WALLTYPE_STRAIGHT2_0) {
        //     return 0;
        // }

        // if ((this.walltype & WALLTYPE_STRAIGHT_270) === WALLTYPE_STRAIGHT_270) {
        //     return 270;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT_180) === WALLTYPE_STRAIGHT_180) {
        //     return 180;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT_90) === WALLTYPE_STRAIGHT_90) {
        //     return 90;
        // }
        // if ((this.walltype & WALLTYPE_STRAIGHT_0) === WALLTYPE_STRAIGHT_0) {
        //     return 0;
        // }

        // if (this.walltype & WALLTYPE_CORNER_270) {
        //     return 270;
        // }
        // if (this.walltype & WALLTYPE_CORNER_180) {
        //     return 180;
        // }
        // if (this.walltype & WALLTYPE_CORNER_90) {
        //     return 90;
        // }
        // if (this.walltype & WALLTYPE_CORNER_0) {
        //     return 0;
        // }
        // return 0;
    }
}
