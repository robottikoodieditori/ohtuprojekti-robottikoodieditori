from random import randint
import re
import os

class MockCompiler:
    def __init__(self):
        self.all_errors = []

    @staticmethod
    def compile(code: str, output_file: str):
        errors = []
        # pylint: disable=anomalous-backslash-in-string
        wordlist = re.split('\s|\n', code)
        wordlist = list(filter(lambda x: x != "", wordlist))
        print(wordlist)
        # pylint: disable=consider-using-enumerate
        for i in range(len(wordlist)):
            if randint(1, 10) > 6:
                summa = 0
                for j in range(i):
                    summa += len(wordlist[j])
                errors.append({"message": "errorroror", "start": summa,
                               "end": summa + len(wordlist[i])})
        path = os.getcwd()
        path = os.path.join(path,"javafiles" , output_file)
        # pylint: disable=unspecified-encoding
        with open(path, "w") as file:
            print(hash(code), file=file)
        return errors
    
    @staticmethod
    def compile2(code: str, output_file: str):
        errors = []
        wordlist = code.split('\n')
        for i, v in enumerate(wordlist):
            error_start = None

            for m_i, m_v in enumerate(v):
                if not error_start:
                    if m_v == m_v.upper() and m_v != ' ':
                        error_start = m_i+1
                else:
                    if m_v == ' ' or m_i == len(v) - 1:
                        errors.append({"line":i+1, "message":"errorror",
                                       "start":error_start, "end": m_i})
                        error_start = None
            
            if error_start:
                errors.append({"line":i+1, "message":"errorror",
                               "start":error_start, "end":m_i})
                error_start = None

        print(errors)

        return errors