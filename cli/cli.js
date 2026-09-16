const readline = require('readline')

const MemoryStore = require('../src/store')
const CommandHandler = require('../src/commands')

const store = new MemoryStore()
const commands = new CommandHandler()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'myredus> '
})

console.log('MyRedis started.')
console.log('Type HELP for available commands.')
console.log('Type EXIT to quit.')

rl.prompt()

rl.on('line', (line) => {
    const input = line.trim()

    if(!input){
        rl.input()
        return
    }

    if(input.toUpperCase() === "EXIT"){
        rl.close()
        return
    }

    if(input.toUpperCase() === "HELP"){
        console.log(`
            Available commands: 

            SET key value
            GET key
            DEL key
            EXISTS key
            KEYS
            DBSIZE
            EXIT
            `)

            rl.prompt()
            return
    }

    try {
        const parts = input.match(/(?:[^\s"]+|"[^"]*")+/g) || []

        const command = parts[0]

        const args = parts.slice(1).map(arg => {
            if(arg.startswith('"') && arg.endswith('"')){
                return arg.slice(1, -1)
            }

            return arg
        })

        const result = commands.execute(command, arg)

        if(Array.isArray(result)){
            console.log(result)
        }
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
    }

    rl.prompt
})

rl.on('close', () => {
    console.log('MyRedis stopped....')
    process.exit(0)
})