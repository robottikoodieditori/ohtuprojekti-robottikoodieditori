import os, csv

DIRNAME = os.path.dirname(__file__)
KEYWORD_DIRNAME = os.path.join(DIRNAME, '..', 'frontend', 'src', 'static')
LANG_DIRNAME = os.path.join(DIRNAME, '..', 'frontend', 'src', 'utils')

BASE_STRING_FI= '''export function autoComplete_fi(customWords) {
    return (context) => {
        let word = context.matchBefore(/\w*/)
        if (word.from == word.to && !context.explicit)
            return null
        let options = [
TO_REPLACE
        ]

        options = customWords.length > 0 ? options.concat(customWords) : options

        return {
            from: word.from,
            options
        }
    }
}
'''

BASE_STRING_EN= '''export function autoComplete_en(customWords) {
    return (context) => {
        let word = context.matchBefore(/\w*/)
        if (word.from == word.to && !context.explicit)
            return null
        let options = [
TO_REPLACE
        ]

        options = customWords.length > 0 ? options.concat(customWords) : options

        return {
            from: word.from,
            options
        }
    }
}
'''

def read_file(filename):
    with open(filename, 'r') as file:
        keywords = list(csv.reader(file, delimiter=','))
    return keywords[0]

def parse_keywords(keywords):
    keyword_string = ''
    for keyword in keywords:
        keyword_string += f'            {{label: "{keyword}", type: "keyword"}},\n'
    return keyword_string

def write_lang_file(parsed_keywords_fi, file_name_fi, parsed_keywords_en, file_name_en):
    with open(os.path.join(LANG_DIRNAME, file_name_fi), 'w') as file:
        file.write(BASE_STRING_FI.replace('TO_REPLACE', parsed_keywords_fi))

    with open(os.path.join(LANG_DIRNAME, file_name_en), 'w') as file:
        file.write(BASE_STRING_EN.replace('TO_REPLACE', parsed_keywords_en))


def main():
    finnish_words = os.path.join(KEYWORD_DIRNAME, 'keywords_finnish.txt')
    english_words = os.path.join(KEYWORD_DIRNAME, 'keywords_english.txt')
    keywords_finnish = read_file(finnish_words)
    keywords_english = read_file(english_words)
    parsed_keywords_english = parse_keywords(keywords_english)
    parsed_keywords_finnish = parse_keywords(keywords_finnish)
    write_lang_file(parsed_keywords_finnish, 'autocomplete_finnish.js', parsed_keywords_english, 'autocomplete_english.js')

    


if __name__ == '__main__':
    main()