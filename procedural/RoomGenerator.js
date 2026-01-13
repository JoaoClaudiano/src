import { ROOM_TEMPLATES } from "./RoomTemplates.js";
import { RNG } from "./RNG";
export class RoomGenerator {
    constructor(seed) {
        this.rng = new RNG(seed);
    }
    generate() {
        return this.rng.pick(ROOM_TEMPLATES);
    }
}
