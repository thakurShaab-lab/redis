class  MemoryStore {
    constructor(parameters){
        this.store = new Map()
    }

    set(key, value){
        this.store.set(key, value)
        return "OK!"
    }

    get(key){
        return this.store.get(key) ?? null
    }

    del(key){
        return this.store.delete(key) ? 1 : 0
    }

    exists(key){
        return this.store.has(key) ? 1 : 0
    }

    keys(){
        return [...this,store.keys()]
    }

    size(){
        return this.store.size
    }
}

module.exports = MemoryStore