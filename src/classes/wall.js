import { Room } from "./room";
import { ROOM_TYPE } from "./roomtype";

const WALLTYPE_CORNER_0 = 0b00000001;
const WALLTYPE_CORNER_90 = 0b00000100;
const WALLTYPE_CORNER_180 = 0b10000000;
const WALLTYPE_CORNER_270 = 0b00100000;

const WALLTYPE_STRAIGHT_0 = 0b00000010;
const WALLTYPE_STRAIGHT_90 = 0b00010000;
const WALLTYPE_STRAIGHT_180 = 0b01000000;
const WALLTYPE_STRAIGHT_270 = 0b00001000;

const WALLTYPE_STRAIGHT2_0 = 0b00010010;
const WALLTYPE_STRAIGHT2_90 = 0b01010000;
const WALLTYPE_STRAIGHT2_180 = 0b01001000;
const WALLTYPE_STRAIGHT2_270 = 0b00001010;

const WALLTYPE_STRAIGHT3_0 = 0b01010010;
const WALLTYPE_STRAIGHT3_90 = 0b01011000;
const WALLTYPE_STRAIGHT3_180 = 0b01001010;
const WALLTYPE_STRAIGHT3_270 = 0b00011010;

const WALLTYPE_STRAIGHT4 = 0b01011010;

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
        let mixin = 'wall';

        if((this.walltype & WALLTYPE_STRAIGHT4) === WALLTYPE_STRAIGHT4 ){
            mixin += '-straight4';
        }else if (            
            (this.walltype & WALLTYPE_STRAIGHT3_0) === WALLTYPE_STRAIGHT3_0 ||
            (this.walltype & WALLTYPE_STRAIGHT3_90) === WALLTYPE_STRAIGHT3_90 ||
            (this.walltype & WALLTYPE_STRAIGHT3_180) === WALLTYPE_STRAIGHT3_180 ||
            (this.walltype & WALLTYPE_STRAIGHT3_270) === WALLTYPE_STRAIGHT3_270) {
            mixin += '-straight3';
        } else if ((this.walltype & WALLTYPE_STRAIGHT2_270) === WALLTYPE_STRAIGHT2_270 ||
            (this.walltype & WALLTYPE_STRAIGHT2_180) === WALLTYPE_STRAIGHT2_180 ||
            (this.walltype & WALLTYPE_STRAIGHT2_90) === WALLTYPE_STRAIGHT2_90 ||
            (this.walltype & WALLTYPE_STRAIGHT2_0) === WALLTYPE_STRAIGHT2_0
        ) {
            mixin += '-straight2';
        } else if (this.walltype === WALLTYPE_CORNER_0 ||
            this.walltype === WALLTYPE_CORNER_90 ||
            this.walltype === WALLTYPE_CORNER_270 ||
            this.walltype === WALLTYPE_CORNER_180) {
            mixin += '-corner';            
        } else {
            mixin += '-straight';
        }

        if (this.groundfloor) {
            mixin += '-ground';
        }
        return mixin;
    }

    /*
        [1][2][3]       [6][4][1]
        [4][X][5]       [7][x][2]
        [6][7][8]       [8][5][3]
    */
    getRotation() {

        if ((this.walltype & WALLTYPE_STRAIGHT3_0) === WALLTYPE_STRAIGHT3_0) {
            return 0;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT3_90) === WALLTYPE_STRAIGHT3_90) {
            return 90;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT3_180) === WALLTYPE_STRAIGHT3_180) {
            return 180;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT3_270) === WALLTYPE_STRAIGHT3_270) {
            return 270;
        }
        
        if ((this.walltype & WALLTYPE_STRAIGHT2_270) === WALLTYPE_STRAIGHT2_270) {
            return 270;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT2_180) === WALLTYPE_STRAIGHT2_180) {
            return 180;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT2_90) === WALLTYPE_STRAIGHT2_90) {
            return 90;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT2_0) === WALLTYPE_STRAIGHT2_0) {
            return 0;
        }

        if ((this.walltype & WALLTYPE_STRAIGHT_270) === WALLTYPE_STRAIGHT_270) {
            return 270;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT_180) === WALLTYPE_STRAIGHT_180) {
            return 180;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT_90) === WALLTYPE_STRAIGHT_90) {
            return 90;
        }
        if ((this.walltype & WALLTYPE_STRAIGHT_0) === WALLTYPE_STRAIGHT_0) {
            return 0;
        }

        if (this.walltype & WALLTYPE_CORNER_270) {
            return 270;
        }
        if (this.walltype & WALLTYPE_CORNER_180) {
            return 180;
        }
        if (this.walltype & WALLTYPE_CORNER_90) {
            return 90;
        }
        if (this.walltype & WALLTYPE_CORNER_0) {
            return 0;
        }
        return 0;
    }
}
