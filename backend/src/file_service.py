class FileService:
    def __init__(self, db):
        self.db = db

    def save_file(self, filename, content, id):
        query = 'INSERT INTO logofiles (filename, content, user_id) VALUES (?,?,?)'
        result = self.db.insert_entry(query, (filename, content, id))

        return result
