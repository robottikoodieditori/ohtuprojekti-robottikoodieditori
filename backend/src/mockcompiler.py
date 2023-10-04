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
        # pylint: disable=consider-using-enumerate
        for i in range(len(wordlist)):
            if randint(1, 10) > 6:
                summa = 0
                for j in range(i):
                    summa += len(wordlist[j])
                errors.append({"message": "errorroror", "start": sum,
                               "end": sum + len(wordlist[i])})
        path = os.getcwd()
        path = os.path.join(path,"javafiles" , output_file)
        # pylint: disable=unspecified-encoding
        with open(path, "w") as file:
            print(hash(code), file=file)
        return errors
