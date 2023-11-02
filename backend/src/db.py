import sqlite3


class DB:
    def __init__(self, db_path):
        self._db_path = db_path

    def insert_entry(self, query: str, values: tuple):
        """
        Insert custom entry into db

        Parameters:
            query: str: an sql insert query (IE. "INSERT INTO users (name, password) VALUES (?,?)") 
            values: tuple: tuple containing the values to be inputted into the entry

        Returns:
            msg: str: message containing status code (OK if succesful, FAIL else)
        """
        msg = ''
        try:
            with sqlite3.connect(self._db_path) as con:
                cur = con.cursor()
                cur.execute(query, values)
                con.commit()
                msg = 'OK'

        except Exception:
            con.rollback()
            msg = 'FAIL'

        finally:
            con.close()

        return msg

    def get_list_from_db(self, query: str):
        """
        Get a list of entries with custom query from db

        Parameters:
            query: str: an sql select query

        Returns:
            rows: a list of db entries
        """
        con = sqlite3.connect(self._db_path)
        cur = con.cursor()
        cur.execute(query)

        rows = cur.fetchall()
        con.close()

        return rows

    def get_entry_from_db(self, query: str, values: tuple):
        con = sqlite3.connect(self._db_path)
        cur = con.cursor()
        cur.execute(query, values)
        entry = cur.fetchone()
        con.close()

        return entry
