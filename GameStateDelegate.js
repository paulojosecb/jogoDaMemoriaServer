const Command = require("./Command")
const CommandType = require('./CommandType')
const Player = require('./Player')

module.exports = class GameStateDelegate {

    constructor(server, socket) {
        this.server = server
        this.socket = socket
    }

    didRestartGame = () => {
        let command = new Command(CommandType.restart, " ", Player.server)
        this.sendCommand(command)
    }

    didStartGame = (currentPlayer) => {
        let command = new Command(CommandType.startGame, " ", currentPlayer)
        this.sendCommand(command)
    }

    didEndGame = (winner) => {
        let command = new Command(CommandType.endGame, winner, Player.server)
        this.sendCommand(command)
    }

    didScored = (player) => {
        let command = new Command(CommandType.playerHasScored, player)
        this.sendCommand(command)
    }

    didClockTicked(counter, counterType) {
        let command = new Command(CommandType.clockTicked, `${counter}!${counterType}`, Player.server)
        this.sendCommand(command)
    }

    didSwitchTurn = (player) => {
        let command = new Command(CommandType.switchTurn, " ", player)
        this.sendCommand(command)
    }

    sendCommand = (command) => {
        console.log(command.stringfy())
        this.socket.write(command.stringfy())
    }

    clockTicked = (counter, countdownType) => {
        let command = new Command(CommandType.clockTicked, `${counter}!${countdownType}`, Player.server)
        this.sendCommand(command)
    }

    
}