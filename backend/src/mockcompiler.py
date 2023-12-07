import re
import os
import uselogomotion


class MockCompiler:
    def __init__(self):
        self.all_errors = []

    @staticmethod
    def compile(code: str, output_file: str):
        path = os.getcwd()
        if path.endswith("src"):
            path = os.path.join(path, "..")
        path = os.path.join(path, "logomotion_gradle", "src", "main", "java", "logo")
        path += "/"
        print(path)
        errors, errors_with_raw_pos = uselogomotion.main(code, path)

        """if not os.path.exists(path):
            os.makedirs(path)

        path = os.path.join(path, output_file)

        with open(path, "w", encoding="utf-8") as file:
            file.write(code)"""

        return {"errors": errors, "raw_errors": errors_with_raw_pos}
