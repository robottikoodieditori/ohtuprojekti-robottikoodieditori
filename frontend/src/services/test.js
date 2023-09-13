const { parser } = require("./parser")

const input = "string(1)"
const parsed = parser.parse(input)

parsed.iter().forEach(({ type, from, to }) => {
    console.log(`Token: ${type.name} (${input.slice(from, to)})`)
})
