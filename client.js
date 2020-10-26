const net = require("net")
const readline = require("readline")

const client = new net.Socket()

client.connect(4000, "127.0.0.1", () => {
    console.log("conectou")

    client.write(JSON.stringify({
        nome: "Paulo",
        idade: 20
    }))

    client.on("data", d => {
        const data = JSON.parse(d)
        console.log(data)
    })
})