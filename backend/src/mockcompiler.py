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
                        "message": "error",
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
        errors_with_raw_pos = []
        pattern = r"(?:\s|^)([^\s]*[A-Z][^\s]*)(?=\s|$)"
        split_logo = lines_of_logo.split('\n')

        for line_number, line in enumerate(split_logo):
            matches = re.finditer(pattern, line)

            for match in matches:
                errors.append(
                    {
                        "line": line_number + 1,
                        "message": "error",
                        "start": match.start(1) + 1,
                        "end": match.end(1),
                    }
                )

        # lines_of_logo = lines_of_logo.replace('\n', '')
        matches = re.finditer(pattern, lines_of_logo)

        for match in matches:
            errors_with_raw_pos.append(
                {
                    "message": "error",
                    "start": match.start(1),
                    "end": match.end(1)
                }
            )

        return {'errors': errors, 'raw_errors': errors_with_raw_pos}

    @staticmethod
    def compile2(code: str, output_file: str):
        errors = MockCompiler.create_error_list(code)

        username = session.get("username", 0) or "Tuntematon"

        path = os.getcwd()
        path = os.path.join(path, "javafiles", username)

        if not os.path.exists(path):
            os.makedirs(path)

        path = os.path.join(path, output_file)

        with open(path, "w", encoding="utf-8") as file:
            file.write(code)

        print(errors)

        return errors
