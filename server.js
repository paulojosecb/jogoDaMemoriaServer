const net = require("net")

const GameStateDelegate = require('./GameStateDelegate')
const GameState = require('./GameState')

const Command = require('./Command')
const CommandType = require('./CommandType')

const Commands = {
    connection: "connection"
}

var currentConnections = 0

var sc

const server = net.createServer((socket) => {

    sc = socket

    let gameStateDelegate = new GameStateDelegate(server, socket)
    let gameState = new GameState(gameStateDelegate)

    socket.on("end", () => {
        console.log("Alguem se desconectou")
    })

    socket.on("data", d => {
        console.log("Chegando data")
        const data = d.toString()
        console.log(data)

        let command = parseIncomeDataIntoCommand(data)
        gameState.processCommand(command)
    })

});

server.on("connection", (socket) => {
    console.log("Alguem se conectou")
    sc.write(`command: ${Commands.connection}?value: ${currentConnections}`)
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