import os, csv

DIRNAME = os.path.dirname(__file__)
KEYWORD_DIRNAME = os.path.join(DIRNAME, 'docs')
LANG_DIRNAME = os.path.join(DIRNAME, 'frontend', 'src', 'services')
print(os.listdir(LANG_DIRNAME))

BASE_STRING = f"""@top Program {{ Keyword }}

Keyword {{ ( whitespace? | end) (TO_REPLACE) }}

@tokens {{
  whitespace {{ " " }}
  end {{ "\n" }}
}}
"""


def read_file(filename):
    with open(filename, 'r') as file:
        keywords = list(csv.reader(file, delimiter=','))
    return keywords[0]

def parse_keywords(keywords):
    keyword_string = ''
    keyword_string += f'"{keywords.pop(0)}"'
    for keyword in keywords:
        print(keyword_string)
        keyword_string += f' | "{keyword}"'
    return keyword_string

def write_lang_file(parsed_keywords):
    with open(os.path.join(LANG_DIRNAME, 'lang.grammar'), 'w') as file:
        file.write(BASE_STRING.replace('TO_REPLACE', parsed_keywords))

def main():
    finnish_words = os.path.join(KEYWORD_DIRNAME, 'keywords_finnish.txt')
    keywords = read_file(finnish_words)
    parsed_keywords = parse_keywords(keywords)
    write_lang_file(parsed_keywords)
    


if __name__ == '__main__':
    main()