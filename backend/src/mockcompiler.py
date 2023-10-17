from random import randint
import re
import os
from flask import session


class MockCompiler:
    def __init__(self):
        self.all_errors = []

    @staticmethod
    def compile(code: str, output_file: str):
        errors = []
        # pylint: disable=anomalous-backslash-in-string
        wordlist = re.split("\s|\n", code)
        wordlist = list(filter(lambda x: x != "", wordlist))
        print(wordlist)
        # pylint: disable=consider-using-enumerate
        for i in range(len(wordlist)):
            if randint(1, 10) > 6:
                summa = 0
                for j in range(i):
                    summa += len(wordlist[j])
                errors.append(
                    {
                        "message": "errorroror",
                        "start": summa,
                        "end": summa + len(wordlist[i]),
                    }
                )

        if session.get("username", 0) == "":
            name = "Tuntematon"
        else:
            name = session.get("username", 0)

        path = os.getcwd()
        path = os.path.join(path, "javafiles", name)
        if not os.path.exists(path):
            os.makedirs(path)

        path = os.path.join(path, output_file)

        # pylint: disable=unspecified-encoding
        with open(path, "w") as file:
            print(hash(code), file=file)
        return errors

    @staticmethod
    def create_error_list(lines_of_logo):
        errors = []
        pattern = r"(?:\s|^)([^\s]*[A-Z][^\s]*)(?=\s|$)"

        for line_number, line in enumerate(lines_of_logo):
            matches = re.finditer(pattern, line)

            for match in matches:
                errors.append(
                    {
                        "line": line_number + 1,
                        "message": "errorror",
                        "start": match.start(1) + 1,
                        "end": match.end(1),
                    }
                )

        return errors

    @staticmethod
    def compile2(code: str, output_file: str):
        errors = MockCompiler.create_error_list(code.split("\n"))

        username = session.get("username", 0) or "Tuntematon"

        path = os.getcwd()
        path = os.path.join(path, "javafiles", username)

        if not os.path.exists(path):
            os.makedirs(path)

        path = os.path.join(path, output_file)

        with open(path, "w") as f:
            f.write(code)

        print(errors)

        return errors
