
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
console.log(chFinder.findFirstNonRepeatedChar("a green apple"))
console.log(chFinder.findFirstRepeatedChar("a green apple"))

