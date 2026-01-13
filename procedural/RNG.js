export class RNG {
    constructor(seed) {
        this.seed = seed;
    }
    next() {
        this.seed |= 0;
        this.seed = (this.seed + 0x6D2B79F5) | 0;
        let t = Math.imul(this.seed ^ (this.seed >>> 15), 1 | this.seed);
        t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    pick(array) {
        return array[Math.floor(this.next() * array.length)];
    }
}
