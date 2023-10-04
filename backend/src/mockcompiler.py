from random import randint
import re
import os

class MockCompiler:
    def __init__(self):
        self.all_errors = []

    @staticmethod
    def compile(code: str, output_file: str):
        errors = []
        wordlist = re.split('\s|\n', code)
        wordlist = list(filter(lambda x: x != "", wordlist))
        for i in range(len(wordlist)):
            if randint(1, 10) > 6:
                sum = 0
                for j in range(i):
                    sum += len(wordlist[j])
                errors.append({"message": "errorroror", "start": sum, "end": sum + len(wordlist[i])})
        path = os.getcwd()
        path = os.path.join(path,"javafiles" , output_file)
        with open(path, "w") as f:
            print(hash(code), file=f)
        return errors