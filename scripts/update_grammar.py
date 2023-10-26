import os, csv

DIRNAME = os.path.dirname(__file__)
KEYWORD_DIRNAME = os.path.join(DIRNAME, '..', 'frontend', 'src', 'static')
LANG_DIRNAME = os.path.join(DIRNAME, '..', 'frontend', 'src', 'static')

BASE_STRING = f"""@precedence {{ times @left, plus @left }}
@top Program {{ expression* }}
expression {{ String | Keyword | Parameters}}
String {{ number |  name }}
Keyword {{ command !times String* ")" | !plus command}}
Parameters {{ "(" String ")"}}
@skip {{ space }}
@tokens {{
  space {{ @whitespace+ }}
  name {{ @asciiLetter+ }}
  number {{ @digit+ }}
  command {{ (TO_REPLACE) ((@eof | @whitespace) | "(")}}
  @precedence {{command, name}}
}}
@external propSource jsonHighlighting from "./highlight"
"""


def read_file(filename):
    with open(filename, 'r') as file:
        keywords = list(csv.reader(file, delimiter=','))
    return keywords[0]

def parse_keywords(keywords_finnish, keywords_english):
    keyword_string = ''
    keyword_string += f'"{keywords_finnish.pop(0)}"'
    for keyword_finnish in keywords_finnish:
        keyword_string += f' | "{keyword_finnish}"'

    for keyword_english in keywords_english:
        keyword_string += f' | "{keyword_english}"'
    return keyword_string

def write_lang_file(parsed_keywords):
    with open(os.path.join(LANG_DIRNAME, 'lang.grammar'), 'w') as file:
        file.write(BASE_STRING.replace('TO_REPLACE', parsed_keywords))

def main():
    finnish_words = os.path.join(KEYWORD_DIRNAME, 'keywords_finnish.txt')
    english_words = os.path.join(KEYWORD_DIRNAME, 'keywords_english.txt')
    keywords_finnish = read_file(finnish_words)
    keywords_english = read_file(english_words)
    parsed_keywords = parse_keywords(keywords_finnish, keywords_english)
    write_lang_file(parsed_keywords)
    


if __name__ == '__main__':
    main()