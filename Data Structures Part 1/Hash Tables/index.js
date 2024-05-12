
class CharFinder {

    findFirstNonRepeatedChar(string) {
        let chars = {}
        for (let i = 0; i < string.length; i++) {
            if (string[i] === " ") continue
    
            if (string[i] in chars) {
                chars[string[i]] += 1
            }
            else {
                chars[string[i]] = 1
            }
        }

        for (let key in chars) {
            if (chars[key] === 1) {
                return key
            }
        }
    }

    findFirstRepeatedChar(string) {
        let chars = new Set()

        for (let i = 0; i < string.length; i++) {
            if (chars.has(string[i])) {
                return string[i]
            }
            chars.add(string[i])
        }
    }
}

let chFinder = new CharFinder()
// console.log(chFinder.findFirstNonRepeatedChar("a green apple"))
// console.log(chFinder.findFirstRepeatedChar("a green apple"))

class HashExample {
    #arraySize = 0;

    constructor(size) {
        this.#arraySize = size
    }

    hash(key) {
        let index = 0;

        if (typeof key === "number") {
            index = this.#hashInteger(key)
        }
        if (typeof key === "string") {
            index = this.#hashString(key)
        }
        return index
    }

    #hashInteger(key) {
        let hashValue = key % this.#arraySize
        return hashValue;
    }

    #hashString(key) {
        let hashValue = 0; 
        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i)
        }
        hashValue %= this.#arraySize
        return hashValue
    }
}

let hash = new HashExample(100)
console.log(hash.hash("123456-A"))

