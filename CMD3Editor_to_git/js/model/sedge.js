//schema edge

class SEdge {
    constructor(from, to) {
        this.from = from
        this.to = to
    }

    equals(other) {
        if (other === undefined || other.from === undefined || other.to.undefined) return false
        return this.from.x === other.from.x &&
            this.from.y === other.from.y &&
            this.to.x === other.to.x &&
            this.to.y === other.to.y
    }
}