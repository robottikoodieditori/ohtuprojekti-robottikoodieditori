class FileService:
    def __init__(self, db):
        self.db = db

    def save_file(self, filename, content, user_id):
        query = 'SELECT COUNT(*) FROM logofiles WHERE user_id = ? AND filename = ?'
        file_exists = self.db.get_entry_from_db(query, (user_id, filename))
        if  file_exists[0] == 0:
            query = '''INSERT INTO logofiles (filename, content, created, last_updated, user_id)
             VALUES (?, ?, DateTime("now", "localtime"), DateTime("now", "localtime"), ?)'''
            result = self.db.insert_entry(query, (filename, content, user_id))
        else:
            query = '''UPDATE logofiles SET content = ?, last_updated = DateTime("now", "localtime")
             WHERE filename = ? AND user_id = ?'''
            result = self.db.insert_entry(query, (content, filename, user_id))

        return result

    def get_user_files(self, user_id):
        query = '''SELECT l.filename, l.content, l.last_updated, l.created, u.name
         FROM logofiles l, users u WHERE u.id=? AND l.user_id=u.id'''
        file_list = self.db.get_list_from_db(query, (user_id,))
        file_list = [{'filename': row[0],
                      'textContent': row[1],
                      'created': row[2],
                      'last_updated': row[3],
                      'name': row[4]} for row in file_list]

        return file_list
