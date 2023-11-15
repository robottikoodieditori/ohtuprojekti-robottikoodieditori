import sqlite3

class DB:
    '''
    Class for handling communication with the database

    args:
        db_path (str): relative path to sqlite3 database
    '''
    def __init__(self, db_path):
        self._db_path = db_path

    def insert_entry(self, query: str, values: tuple) -> str:
        """
        Insert custom entry into database. Entry varies by parameters.

        args:
            query (str): an sql insert query (IE. "INSERT INTO users (name, password) VALUES (?,?)") 
            values (tuple): tuple containing the values to be inputted into the entry

        returns:
            msg (str): message containing status code (OK if succesful, FAIL else)
        """
        msg = ''
        try:
            with sqlite3.connect(self._db_path) as con:
                cur = con.cursor()
                cur.execute(query, values)
                con.commit()
                msg = 'OK'

        except sqlite3.Error:
            con.rollback()
            msg = 'FAIL'

        finally:
            con.close()

        return msg

    def get_list_from_db(self, query: str, values: tuple) -> object:
        """
        Get a list of entries with custom query from db

        Parameters:
            query (str): an sql select query
            values (tuple): values which replace ?-characters in query

        Returns:
            rows: a list of db entries
        """
        con = sqlite3.connect(self._db_path)
        cur = con.cursor()
        cur.execute(query, values)

        rows = cur.fetchall()
        con.close()

        return rows

    def get_entry_from_db(self, query: str, values: tuple) -> list:
        '''
        Method which fetches a single entry from database

        args:
            query (str): an sql select query
            values (tuple): values which replace ?-characters in query

        returns:
            entry (list): list containing all of wanted values of wanted entry
        '''
        con = sqlite3.connect(self._db_path)
        cur = con.cursor()
        cur.execute(query, values)
        entry = cur.fetchone()
        con.close()

        return entry
