import { ROOM_TEMPLATES } from "./RoomTemplates"
import { RNG } from "./RNG"

export class RoomGenerator {
  rng: RNG

  constructor(seed: number) {
    this.rng = new RNG(seed)
  }

  generate() {
    return this.rng.pick(ROOM_TEMPLATES)
  }
}
