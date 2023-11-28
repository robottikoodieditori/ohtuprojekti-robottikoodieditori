import re
import os
import uselogomotion


class MockCompiler:
    def __init__(self):
        self.all_errors = []

    @staticmethod
    def create_error_list(lines_of_logo):
        errors = []
        errors_with_raw_pos = []
        pattern = r"(?:\s|^)([^\s]*[A-Z][^\s]*)(?=\s|$)"
        split_logo = lines_of_logo.split("\n")

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
                {"message": "error", "start": match.start(1), "end": match.end(1)}
            )

        return {"errors": errors, "raw_errors": errors_with_raw_pos}

    @staticmethod
    def compile2(code: str, output_file: str):
        path = os.getcwd()
        if path.endswith('src'):
            path = os.path.join(path, '..')
        path = os.path.join(path, "logomotion_gradle", "src", "main", "java", "logo")
        path += "/"
        print(path)
        # errors = MockCompiler.create_error_list(code)
        errors, errors_with_raw_pos = uselogomotion.main(code, path)
        # errors_with_raw_pos = errors

        print(f"errors: {errors}")


        '''if not os.path.exists(path):
            os.makedirs(path)

        path = os.path.join(path, output_file)

        with open(path, "w", encoding="utf-8") as file:
            file.write(code)'''

        print("ERRORS:")
        print(errors)
        return {"errors": errors, "raw_errors": errors_with_raw_pos}
