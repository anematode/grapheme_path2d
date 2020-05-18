class Vec2 {
    constructor (x, y) {
        if (x.x) {
            this.x = x.x
            this.y = x.y
        } else if (Array.isArray(x)) {
            this.x = x[0]
            this.y = x[1]
        } else {
            this.x = x
            this.y = y
        }
    }

    clone() {
        return new Vec2(this.x, this.y)
    }

    subtract(v) {
        this.x -= v.x
        this.y -= v.y
        return this
    }

    add(v) {
        this.x += v.x
        this.y += v.y
        return this
    }

    multiply(s) {
        this.x *= s
        this.y *= s
        return this
    }

    hasNaN() {
        return isNaN(this.x) || isNaN(this.y)
    }

    scale(s) {
        return this.multiply(s)
    }

    divide(s) {
        this.x /= s
        this.y /= s
        return this
    }

    asArray() {
        return [this.x, this.y]
    }

    length() {
        return Math.hypot(this.x, this.y)
    }

    unit() {
        return this.clone().divide(this.length())
    }

    cross(v) {
        return this.x * v.x + this.y * v.y
    }

    rotate(angle, about=Origin) {
        let c = Math.cos(angle), s = Math.sin(angle)

        if (about === Origin) {
            let x = this.x, y = this.y

            this.x = x * c - y * s
            this.y = y * c + x * s
        } else {
            let x = this.x, y = this.y

            this.subtract(about).rotate(angle).add(about)
        }

        return this
    }

    rotateDeg(angle_deg, about=Origin) {
        this.rotate(angle_deg / 180 * 3.14159265359, about)

        return this
    }
}

const Origin = new Vec2(0,0)

class GraphemePath2DSegment {
    constructor(params={}) {
        this.start = params.start ? params.start : new Vec2(0, 0)
        this.end = params.end ? params.end : new Vec2(0, 0)
    }

    get end() {
        return this._end
    }

    get start() {
        return this._start
    }

    set end(v) {
        this._end = v
        this.calculateLength()
    }

    set start(v) {
        this._start = v
        this.calculateLength()
    }

    calculateLength() {
        this.length = this._end.clone().subtract(this._start).length()
    }

    avg

    getNativePath() {
        let path = new Path2D()
        path.moveTo(this._start.x, this._start.y)
        path.lineTo(this._end.x, this._end.y)

        return path
    }

    getPointAlong(fraction = 0) {
        return this._start.clone().add(this._end.clone().subtract(this._start).scale(fraction / this.length))
    }

    getPointAlongArr(fractions) {

    }

    getPointDistanceAlong(dist) {
        return this._start.clone().add(this._end.clone().subtract(this._start).scale(fraction / this.length))
    }

    getPointDistanceAlongArr(dists) {

    }
}

class CubicBezierPath2DSegment extends GraphemePath2DSegment {
    constructor(params={}) {
        super(params)

        this.cp1 = new Vec2()
        this.cp2 = new Vec2()
    }

    calculateLength() {

    }

    getPointAlong(fraction=0) {

    }
}

class GraphemePath2DSubpath {

}

class GraphemePath2D {

}


let canvas = document.createElement("canvas")
let ctx = canvas.getContext('2d')
