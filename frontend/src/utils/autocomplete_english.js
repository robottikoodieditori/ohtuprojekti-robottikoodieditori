export function autoComplete_en(customWords) {
    return (context) => {
        let word = context.matchBefore(/\w*/)
        if (word.from == word.to && !context.explicit)
            return null
        let options = [
            {label: "show", type: "keyword"},
            {label: "forward", type: "keyword"},
            {label: "fd", type: "keyword"},
            {label: "backward", type: "keyword"},
            {label: "bk", type: "keyword"},
            {label: "left", type: "keyword"},
            {label: "lt", type: "keyword"},
            {label: "right", type: "keyword"},
            {label: "rt", type: "keyword"},
            {label: "if", type: "keyword"},
            {label: "ifelse", type: "keyword"},
            {label: "make", type: "keyword"},
            {label: "to", type: "keyword"},
            {label: "end", type: "keyword"},
            {label: "repeat", type: "keyword"},
            {label: "for", type: "keyword"},
            {label: "output", type: "keyword"},
        ]

        options = customWords.length > 0 ? options.concat(customWords) : options

        return {
            from: word.from,
            options
        }
    }
}
