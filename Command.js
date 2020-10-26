module.exports = class Command {
    constructor(type, value, player) {
        this.type = type
        this.value = value
        this.player = player
    }

    stringfy() {
        return `command:${this.type}?value:${this.value}?player:${this.player}`
    }
}