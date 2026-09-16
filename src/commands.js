class CommandHandler{
    constructor(store){
        this.store = store
    }

    execute(command, args){
        command = command.toUpperCase()

        switch (command) {
            case "SET":
                return this.set(args);

                case "GET":
                    return this.get(args);

                    case "DEL":
                        return this.del(args);

                        case "EXISTS":
                            return this.exists(args);

                            case "KEYS":
                                return this.keys(args);

                                case "DBSIZE":
                                    return this.dbsize(args);

                                    default: throw new Error(`Unknown command: ${command}`);
        }
    }

    set(args){
        if(args.length !== 2){
            throw new Error("SET requires key and value");
        }

        const [key, value] = args

        return this.store.set(key, value)
    }

    get(args){
        if(args.length !== 1){
            throw new Error("GET requires key")
        }

        return this.store.get(args[0])
    }

    del(args){
        if(args.length < 1){
            throw new Error("DEL requires at least one key")
        }

        let deleted = 0

        for(const key of args){
            deleted += this.store.del(key)
        }

        return deleted
    }

    exists(args){
        if(args.length !== 1){
            throw new Error("Exists requires key")
        }

        return this.store.exists(args[0])
    }

    keys(args){
        if(args.length !== 0){
            throw new Error("KEYS does not accept arguments")
        }

        return this.store.keys()
    }

    dbsize(args){
        if(args.length !== 0){
            throw new Error("DBSIZE does not accept arguments")
        }

        return this.store.size()
    }
}

module.exports = CommandHandler