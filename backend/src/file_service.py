class FileService:
    """
    Class for handling file-related operations. Communicates with the database.

    args:
        db (obj): an object for handling communications with the database
    """

    def __init__(self, database: object):
        self.database = database

    def save_file(self, filename: str, content: str, user_id: int) -> str:
        """
        Method which saves a file into db. Checks wheter a file with the same
        filename exists assigned to given user id, if exists, updates found entry's content

        args:
            filename (str)
            content (str)
            user_id (int)
        returns:
            result (str): success status
        """
        query = "SELECT COUNT(*) FROM logofiles WHERE user_id = ? AND filename = ?"
        file_exists = self.database.get_entry_from_db(query, (user_id, filename))
        if file_exists[0] == 0:
            query = """INSERT INTO logofiles (filename, content, created, last_updated, user_id)
             VALUES (?, ?, DateTime("now", "localtime"), DateTime("now", "localtime"), ?)"""
            result = self.database.insert_entry(query, (filename, content, user_id))
        else:
            query = """UPDATE logofiles SET content = ?, last_updated = DateTime("now", "localtime")
             WHERE filename = ? AND user_id = ?"""
            result = self.database.insert_entry(query, (content, filename, user_id))

        return {'result': result, 'action': 'save'}

    def get_user_files(self, user_id: int) -> list:
        """
        Method which fetches all files assigned to a single user from the database

        args:
            user_id (int)
        returns:
            file_list (list): list containing dict-objects housing file data
        """
        query = """SELECT l.filename, l.content, l.created, l.last_updated, u.name, l.id
         FROM logofiles l, users u WHERE u.id=? AND l.visible=1 AND l.user_id=u.id"""
        file_list = self.database.get_list_from_db(query, (user_id,))
        file_list = [
            {
                "filename": row[0],
                "textContent": row[1],
                "created": row[2],
                "last_updated": row[3],
                "name": row[4],
                "file_id": row[5],
            }
            for row in file_list
        ]

        return file_list

    def hide_logo_file(self, file_id: int):
        """
        Method which sets visible=0 for logofiles entry with matching id

        Args:
            file_id (int)
        returns:
            result (str): "OK" if successful, else "FAIL"
        """
        query = "UPDATE logofiles SET visible=0 WHERE id=?"
        result = self.database.insert_entry(query, (str(file_id)))

        return result
