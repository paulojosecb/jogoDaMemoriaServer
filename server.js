const net = require("net")

const GameStateDelegate = require('./GameStateDelegate')
const GameState = require('./GameState')

const Command = require('./Utils/Command')
const CommandType = require('./Utils/Enums/CommandType')
const Player = require("./Utils/Enums/Player")
const { scryptSync } = require("crypto")

const Commands = {
    connection: "connection"
}

var currentConnections = 0

var sc

let gameStateDelegate = new GameStateDelegate()
let gameState = new GameState(gameStateDelegate)

const server = net.createServer((socket) => {

    gameStateDelegate.sockets.add(socket)

    socket.on("end", () => {
        console.log("Alguem se desconectou")
        let command = new Command(CommandType.disconnection, "", currentConnections == 2 ? Player.playerTwo : Player.playerTwo)
        socket.write(command.stringfy())

        gameStateDelegate.sockets.delete(socket)
    })

    socket.on("data", d => {
        const data = d.toString()
        console.log(data)

        let command = parseIncomeDataIntoCommand(data)
        gameState.processCommand(command)
    })

});

server.on("connection", (socket) => {
    console.log("Alguem se conectou")
    let command = new Command(CommandType.connection, "",currentConnections == 0 ? Player.playerOne : Player.playerTwo)
    socket.write(command.stringfy())
    currentConnections++
})

server.listen(4000, () => {
    console.log("Server listening on port" + 4000)
})

let parseIncomeDataIntoCommand = (data) => {
    let bitsOfData = data.split("?")

    let commandType = bitsOfData[0].split(":")[1]
    let value = bitsOfData[1].split(":")[1]
    let player = bitsOfData[2].split(":")[1]

    let command = new Command(commandType, value, player)

    console.log(`Recebeu comando de ${command.type} com valor de ${command.value} de ${command.player}`)

    return command
}