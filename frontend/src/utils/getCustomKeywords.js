function getCustomKeywords(textContent) {
    
    let keywords = [];
    const substrings = textContent.split('\n')

    substrings.forEach(substring => {
        const newString = substring.split(' ')
        if (newString.length > 1) {
            if (newString[0] === 'miten' || newString[0] === 'to') {
                keywords.push({label:newString[1], type:'keyword'})
                console.log(`Registered ${newString[1]} as keyword`)
            }
        }
    })


    return keywords
}

export default getCustomKeywords