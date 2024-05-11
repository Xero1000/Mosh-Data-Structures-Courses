
function reverse(string) {
    let stack = []
    let reverseString = ""

    if (string === null) {
        throw new Error("Input can't be null")
    }

    for (let i = 0; i < string.length; i++) {
        stack.push(string[i])
    }

    while (stack.length > 0) {
        reverseString = reverseString + stack.pop()
    }

    return reverseString
}
console.log(reverse("abcd"))


function isBalanced(string) {
    let openBrackets = []

    for (let i = 0; i < string.length; i++) {
        if (isLeftBracket(string[i])) {
            openBrackets.push(string[i])
        }
        if (isRightBracket(string[i])) {
            if (openBrackets.length === 0) return false
            
            let top = openBrackets[openBrackets.length - 1]
            if (string[i] === ")" && top === "(") {
                openBrackets.pop()
            }
            else if (string[i] === "]" && top === "[") {
                openBrackets.pop() 
            }
            else if (string[i] === ">" && top === "<") {
                openBrackets.pop()
            }
            else if (string[i] === "}" && top === "{") {
                openBrackets.pop()
            }
            else {
                return false
            }
        }
    }

    if (openBrackets.length === 0)
        return true
    else
        return false
}

function isLeftBracket(bracket) {
    let leftBrackets = ["(", "[", "<", "{"]
    return leftBrackets.includes(bracket)
}

function isRightBracket(bracket) {
    let rightBrackets = [")", "]", ">", "}"]
    return rightBrackets.includes(bracket)
}

console.log(isBalanced("(([1] + <2>))[ab]{a}"))




