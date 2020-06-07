import { Room } from "./room";
import { ROOM_TYPE } from "./roomtype";


 /*
        [1][2][3]       [6][4][1]
        [4][X][5]       [7][x][2]
        [6][7][8]       [8][5][3]
    */

const walltypes = {
    0b00000001: { type: "corner", rot: 0 },
    0b00000010: { type: "straight", rot: 0 },
    0b00000011: { type: "straight", rot: 0 },    
    0b00000100: { type: "corner", rot: 90 },
    0b00000101: { type: "corner2", rot: 90 },
    0b00000110: { type: "straight", rot: 0 },
    0b00000111: { type: "straight", rot: 0 },
    0b00001000: { type: "straight", rot: 270 },
    0b00001001: { type: "straight", rot: 270 },
    0b00001010: { type: "straight2", rot: 270 },              
    0b00001011: { type: "straight2", rot: 270 },                  
    0b00001100: { type: "straight-corner", rot: 270 },
    0b00001101: { type: "straight-corner", rot: 270 },    
    0b00001110: { type: "straight2", rot: 270 },
    0b00001111: { type: "straight2", rot: 270 },
    
    0b00010000: { type: "straight", rot: 90 },
    0b00010001: { type: "straight-corner-mirror", rot: 90 },
    0b00010010: { type: "straight2", rot: 0 },
    0b00010011: { type: "straight2", rot: 0 },
    0b00010100: { type: "straight", rot: 90 },
    0b00010101: { type: "straight-corner-mirror", rot: 90 },
    0b00010110: { type: "straight2", rot: 0 },
    0b00010111: { type: "straight2", rot: 0 },
    0b00011000: { type: "opposite", rot: 90 },
    0b00011001: { type: "opposite", rot: 90 },
    0b00011010: { type: "straight3", rot: 270 },
    0b00011011: { type: "straight3", rot: 270 },
    0b00011100: { type: "opposite", rot: 90 },
    0b00011101: { type: "opposite", rot: 90 },
    0b00011110: { type: "straight3", rot: 270 },
    0b00011111: { type: "straight3", rot: 270 },
    
    0b00100000: { type: "corner", rot: 270 },
    0b00100001: { type: "corner2", rot: 0 },
    0b00100010: { type: "straight-corner-mirror", rot: 0 },
    0b00100011: { type: "straight-corner-mirror", rot: 0 },    
    0b00100100: { type: "corner-opposite", rot: 90 },
    0b00100101: { type: "corner3", rot: 0 },
    0b00100110: { type: "straight-corner-mirror", rot: 0 },
    0b00100111: { type: "straight-corner-mirror", rot: 0 },
    0b00101000: { type: "straight", rot: 270 },
    0b00101001: { type: "straight", rot: 270 },   
    0b00101010: { type: "straight2", rot: 270 },              
    0b00101011: { type: "straight2", rot: 270 },                  
    0b00101100: { type: "straight-corner", rot: 270 },
    0b00101101: { type: "straight-corner", rot: 270 },    
    0b00101110: { type: "straight2", rot: 270 },
    0b00101111: { type: "straight2", rot: 270 },
    
    0b00110000: { type: "straight-corner", rot: 90 },
    0b00110001: { type: "straight-corner2", rot: 90 },
    0b00110010: { type: "straight2-corner-mirror", rot: 90 },
    0b00110011: { type: "straight2-corner-mirror", rot: 90 },
    0b00110100: { type: "straight-corner", rot: 90 },
    0b00110101: { type: "straight-corner2", rot: 90 },
    0b00110110: { type: "straight2-corner-mirror", rot: 90 },
    0b00110111: { type: "straight2-corner-mirror", rot: 90 },
    0b00111000: { type: "opposite", rot: 90 },
    0b00111001: { type: "opposite", rot: 90 },
    0b00111010: { type: "straight3", rot: 270 },
    0b00111011: { type: "straight3", rot: 270 },
    0b00111100: { type: "opposite", rot: 90 },
    0b00111101: { type: "opposite", rot: 90 },
    0b00111110: { type: "straight3", rot: 270 },
    0b00111111: { type: "straight3", rot: 270 },

    0b01000000: { type: "straight", rot: 180 },
    0b01000001: { type: "straight-corner", rot: 180 },
    0b01000010: { type: "opposite", rot: 0 },
    0b01000011: { type: "opposite", rot: 0 },    
    0b01000100: { type: "straight-corner-mirror", rot: 180 },
    0b01000101: { type: "straight-corner2", rot: 180 },
    0b01000110: { type: "opposite", rot: 0 },
    0b01000111: { type: "opposite", rot: 0 },
    0b01001000: { type: "straight2", rot: 180 },
    0b01001001: { type: "straight2", rot: 180 },
    0b01001010: { type: "straight3", rot: 180 },              
    0b01001011: { type: "straight3", rot: 180 },                  
    0b01001100: { type: "straight2-corner", rot: 180 },
    0b01001101: { type: "straight2-corner", rot: 180 },    
    0b01001110: { type: "straight3", rot: 180 },
    0b01001111: { type: "straight3", rot: 180 },

    0b01010000: { type: "straight2", rot: 90 },
    0b01010001: { type: "straight2-corner", rot: 90 },
    0b01010010: { type: "straight3", rot: 0 },
    0b01010011: { type: "straight3", rot: 0 },
    0b01010100: { type: "straight2", rot: 90 },    
    0b01010101: { type: "straight2-corner", rot: 90 },
    0b01010110: { type: "straight3", rot: 0 },
    0b01010111: { type: "straight3", rot: 0 },
    0b01011000: { type: "straight3", rot: 90 },
    0b01011001: { type: "straight3", rot: 90 },
    0b01011010: { type: "straight4", rot: 0 },
    0b01011011: { type: "straight4", rot: 0 },
    0b01011100: { type: "straight3", rot: 90 },
    0b01011101: { type: "opposite", rot: 90 },
    0b01011110: { type: "straight4", rot: 0 },
    0b01011111: { type: "straight4", rot: 0 },

    0b01100000: { type: "straight", rot: 180 },
    0b01100001: { type: "straight-corner", rot: 180 },
    0b01100010: { type: "opposite", rot: 0 },
    0b01100011: { type: "opposite", rot: 0 },    
    0b01100100: { type: "straight-corner-mirror", rot: 180 },
    0b01100101: { type: "straight-corner2", rot: 180 },
    0b01100110: { type: "opposite", rot: 0 },
    0b01100111: { type: "opposite", rot: 0 },
    0b01101000: { type: "straight2", rot: 180 },
    0b01101001: { type: "straight2", rot: 180 },   
    0b01101010: { type: "straight3", rot: 180 },              
    0b01101011: { type: "straight3", rot: 180 },                  
    0b01101100: { type: "straight2-corner", rot: 180 },
    0b01101101: { type: "straight2-corner", rot: 180 },    
    0b01101110: { type: "straight3", rot: 180 },
    0b01101111: { type: "straight3", rot: 180 },

    0b01110000: { type: "straight2", rot: 90 },
    0b01110001: { type: "straight2-corner", rot: 90 },
    0b01110010: { type: "straight3", rot: 0 },
    0b01110011: { type: "straight3", rot: 0 },
    0b01110100: { type: "straight2", rot: 90 },
    0b01110101: { type: "straight2-corner", rot: 90 },
    0b01110110: { type: "straight3", rot: 0 },
    0b01110111: { type: "straight3", rot: 0 },
    0b01111000: { type: "straight3", rot: 90 },
    0b01111001: { type: "straight3", rot: 90 },
    0b01111010: { type: "straight4", rot: 0 },
    0b01111011: { type: "straight4", rot: 0 },  
    0b01111100: { type: "straight3", rot: 90 },
    0b01111101: { type: "straight3", rot: 90 },
    0b01111110: { type: "straight4", rot: 0 },
    0b01111111: { type: "straight4", rot: 0 },
    
    0b10000000: { type: "corner", rot: 180 },
    // 0b10000001: { type: "corner", rot: 0 },
    // 0b10000010: { type: "straight", rot: 0 },
    // 0b10000011: { type: "straight", rot: 0 },    
    // 0b10000100: { type: "corner", rot: 90 },
    // 0b10000101: { type: "corner2", rot: 90 },
    // 0b10000110: { type: "straight", rot: 0 },
    // 0b10000111: { type: "straight", rot: 0 },
    // 0b10001000: { type: "straight", rot: 270 },
    // 0b10001001: { type: "straight", rot: 270 },
    // 0b10001010: { type: "straight2", rot: 270 },              
    // 0b10001011: { type: "straight2", rot: 270 },                  
    // 0b10001100: { type: "straight-corner", rot: 270 },
    // 0b10001101: { type: "straight-corner", rot: 270 },    
    // 0b10001110: { type: "straight2", rot: 270 },
    // 0b10001111: { type: "straight2", rot: 270 },

    // 0b10010000: { type: "straight", rot: 90 },
    // 0b10010001: { type: "straight-corner-mirror", rot: 90 },
    // 0b10010010: { type: "straight2", rot: 0 },
    // 0b10010011: { type: "straight2", rot: 0 },
    // 0b10010100: { type: "straight", rot: 90 },
    // 0b10010101: { type: "straight-corner-mirror", rot: 90 },
    // 0b10010110: { type: "straight2", rot: 0 },
    // 0b10010111: { type: "straight2", rot: 0 },
    // 0b10011000: { type: "opposite", rot: 90 },
    // 0b10011001: { type: "opposite", rot: 90 },
    // 0b10011010: { type: "straight3", rot: 270 },
    // 0b10011011: { type: "straight3", rot: 270 },
    // 0b10011100: { type: "opposite", rot: 90 },
    // 0b10011101: { type: "opposite", rot: 90 },
    // 0b10011110: { type: "straight3", rot: 270 },
    // 0b10011111: { type: "straight3", rot: 270 },

    // 0b10100000: { type: "corner", rot: 270 },
    // 0b10100001: { type: "corner2", rot: 0 },
    // 0b10100010: { type: "straight-corner-mirror", rot: 0 },
    // 0b10100011: { type: "straight-corner-mirror", rot: 0 },    
    // 0b10100100: { type: "corner-opposite", rot: 90 },
    // 0b10100101: { type: "corner3", rot: 0 },
    // 0b10100110: { type: "straight-corner-mirror", rot: 0 },
    // 0b10100111: { type: "straight-corner-mirror", rot: 0 },
    // 0b10101000: { type: "straight", rot: 270 },
    // 0b10101001: { type: "straight", rot: 270 },   
    // 0b10101010: { type: "straight2", rot: 270 },              
    // 0b10101011: { type: "straight2", rot: 270 },                  
    // 0b10101100: { type: "straight-corner", rot: 270 },
    // 0b10101101: { type: "straight-corner", rot: 270 },    
    // 0b10101110: { type: "straight2", rot: 270 },
    // 0b10101111: { type: "straight2", rot: 270 },

    // 0b10110000: { type: "straight-corner", rot: 90 },
    // 0b10110001: { type: "straight-corner2", rot: 90 },
    // 0b10110010: { type: "straight2-corner-mirror", rot: 90 },
    // 0b10110011: { type: "straight2-corner-mirror", rot: 90 },
    // 0b10110100: { type: "straight-corner", rot: 90 },
    // 0b10110101: { type: "straight-corner2", rot: 90 },
    // 0b10110110: { type: "straight2-corner-mirror", rot: 90 },
    // 0b10110111: { type: "straight2-corner-mirror", rot: 90 },
    // 0b10111000: { type: "opposite", rot: 90 },
    // 0b10111001: { type: "opposite", rot: 90 },
    // 0b10111010: { type: "straight3", rot: 270 },
    // 0b10111011: { type: "straight3", rot: 270 },
    // 0b10111100: { type: "opposite", rot: 90 },
    // 0b10111101: { type: "opposite", rot: 90 },
    // 0b10111110: { type: "straight3", rot: 270 },
    // 0b10111111: { type: "straight3", rot: 270 },
    // 0b11000000: { type: "straight", rot: 180 },
    // 0b11000001: { type: "straight-corner", rot: 180 },
    // 0b11000010: { type: "opposite", rot: 0 },
    // 0b11000011: { type: "opposite", rot: 0 },    
    // 0b11000100: { type: "straight-corner-mirror", rot: 180 },
    // 0b11000101: { type: "straight-corner2", rot: 180 },
    // 0b11000110: { type: "opposite", rot: 0 },
    // 0b11000111: { type: "opposite", rot: 0 },
    // 0b11001000: { type: "straight2", rot: 180 },
    // 0b11001001: { type: "straight2", rot: 180 },
    // 0b11001010: { type: "straight3", rot: 180 },              
    // 0b11001011: { type: "straight3", rot: 180 },                  
    // 0b11001100: { type: "straight2-corner", rot: 180 },
    // 0b11001101: { type: "straight2-corner", rot: 180 },    
    // 0b11001110: { type: "straight3", rot: 180 },
    // 0b11001111: { type: "straight3", rot: 180 },
    // 0b11010000: { type: "straight2", rot: 90 },
    // 0b11010001: { type: "straight2-corner", rot: 90 },
    // 0b11010010: { type: "straight3", rot: 0 },
    // 0b11010011: { type: "straight3", rot: 0 },
    // 0b11010100: { type: "straight2", rot: 90 },    
    // 0b11010101: { type: "straight2-corner", rot: 90 },
    // 0b11010110: { type: "straight3", rot: 0 },
    // 0b11010111: { type: "straight3", rot: 0 },
    // 0b11011000: { type: "straight3", rot: 90 },
    // 0b11011001: { type: "straight3", rot: 90 },
    // 0b11011010: { type: "straight4", rot: 0 },
    // 0b11011011: { type: "straight4", rot: 0 },
    // 0b11011100: { type: "straight3", rot: 90 },
    // 0b11011101: { type: "opposite", rot: 90 },
    // 0b11011110: { type: "straight4", rot: 0 },
    // 0b11011111: { type: "straight4", rot: 0 },
    // 0b11100000: { type: "straight", rot: 180 },
    // 0b11100001: { type: "straight-corner", rot: 180 },
    // 0b11100010: { type: "opposite", rot: 0 },
    // 0b11100011: { type: "opposite", rot: 0 },    
    // 0b11100100: { type: "straight-corner-mirror", rot: 180 },
    // 0b11100101: { type: "straight-corner2", rot: 180 },
    // 0b11100110: { type: "opposite", rot: 0 },
    // 0b11100111: { type: "opposite", rot: 0 },
    // 0b11101000: { type: "straight2", rot: 180 },
    // 0b11101001: { type: "straight2", rot: 180 },   
    // 0b11101010: { type: "straight3", rot: 180 },              
    // 0b11101011: { type: "straight3", rot: 180 },                  
    // 0b11101100: { type: "straight2-corner", rot: 180 },
    // 0b11101101: { type: "straight2-corner", rot: 180 },    
    // 0b11101110: { type: "straight3", rot: 180 },
    // 0b11101111: { type: "straight3", rot: 180 },
    // 0b11110000: { type: "straight2", rot: 90 },
    // 0b11110001: { type: "straight2-corner", rot: 90 },
    // 0b11110010: { type: "straight3", rot: 0 },
    // 0b11110011: { type: "straight3", rot: 0 },
    // 0b11110100: { type: "straight2", rot: 90 },
    // 0b11110101: { type: "straight2-corner", rot: 90 },
    // 0b11110110: { type: "straight3", rot: 0 },
    // 0b11110111: { type: "straight3", rot: 0 },
    // 0b11111000: { type: "straight3", rot: 90 },
    // 0b11111001: { type: "straight3", rot: 90 },
    // 0b11111010: { type: "straight4", rot: 0 },
    // 0b11111011: { type: "straight4", rot: 0 },  
    // 0b11111100: { type: "straight3", rot: 90 },
    // 0b11111101: { type: "straight3", rot: 90 },
    // 0b11111110: { type: "straight4", rot: 0 },
    // 0b11111111: { type: "straight4", rot: 0 },

 
 
 
    0b10010000: { type: "straight", rot: 90 },
    0b10010100: { type: "straight", rot: 90 },
    0b11000000: { type: "straight", rot: 180 },
    0b11100000: { type: "straight", rot: 180 },
    0b10010010: { type: "straight2", rot: 0 },
    0b10010110: { type: "straight2", rot: 0 },
    0b10010111: { type: "straight2", rot: 0 },
    0b11010100: { type: "straight2", rot: 90 },
    0b11110100: { type: "straight2", rot: 90 },
    0b11111111: { type: "straight4", rot: 0 },    
    0b11111011: { type: "straight4", rot: 0 },
    0b11011111: { type: "straight4", rot: 0 },
    0b11111110: { type: "straight4", rot: 0 },
    0b11011011: { type: "straight4", rot: 0 },
    0b11111010: { type: "straight4", rot: 0 },
    0b11011110: { type: "straight4", rot: 0 },
}

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
    getType(){
        return this.walltype.toString(2);
    }
    getMixin() {
        if(walltypes[this.walltype]){
            return `wall-${walltypes[this.walltype].type}${this.groundfloor?"-ground":""}`    
        }
        return "floor";

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
