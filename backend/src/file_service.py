import subprocess, paramiko

class FileService:
    """
    Class for handling file-related operations. Communicates with the database.

    attr:
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
            query = """SELECT id FROM logofiles WHERE user_id=? AND filename=?"""
            file_id = self.database.get_entry_from_db(query, (user_id, filename))
            return {'result': result, 'action': 'save', 'file_id': file_id}

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
        Method which sets toggles visibility for logofiles entry with matching id

        Args:
            file_id (int)
        returns:
            result (str): "OK" if successful, else "FAIL"
        """
        get_query = "SELECT visible FROM logofiles WHERE id=?"
        visible = self.database.get_entry_from_db(get_query, (str(file_id),))
        visible = 1 if visible[0] == 0 else 0
        query = "UPDATE logofiles SET visible=? WHERE id=?"
        result = self.database.insert_entry(query, (str(visible), str(file_id)))

        return {'result':result, 'action': 'hide'}
    
    def get_all_files(self) -> list:
        """
        Fetches all files from database

        returns:
            file_list (list)
        """
        query = """
            SELECT f.id, f.filename, f.content, f.created, f.last_updated,
            f.visible, f.user_id, u.name FROM logofiles f, users u WHERE f.user_id=u.id
        """
        file_list = self.database.get_list_from_db(query, ())
        file_list = [
            {
                "id": row[0],
                "filename": row[1],
                "textContent": row[2],
                "created": str(row[3]),
                "last_updated": str(row[4]),
                "visible": row[5],
                "user_id": row[6],
                "username": row[7]
            }
            for row in file_list
        ]
        
        return file_list

    def delete_logo_file(self, file_id: int):
        """
        Method which deletes logofile from database

        Args:
            file_id (int)
        returns:
            result (str): "OK" if succesful, else "FAIL"
        """
        query = "DELETE FROM logofiles WHERE id=?"
        result = self.database.insert_entry(query, (str(file_id),))

        return {'result':result, 'action': 'delete'}


def send_to_robot() -> int:
    '''
    Executes a script which transfers a compiled Java file to the robot if robot is connected and
    its connection is configured

    returns:
        return_code (int): indicates the success of operation
    '''
    dir_path = 'logomotion_gradle'
    bash_command = f"cd {dir_path} && ./gradlew deploy"
    process = subprocess.Popen(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return_code = process.wait()
    return return_code

def remote_create_start_script() -> bool:
    '''
    Establishes an ssh connection to robot if connected via cable and configured,
    creates a bash script, grants execution rights for it, which when executed
    runs the compiled Java program

    returns:
        bool: True if succesful, False otherwise
    '''
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect('ev3dev.local', username='robot', password='maker')
    except paramiko.AuthenticationException:
        print('Authentication failed')
        return False

    script_content = '''
    #!/bin/bash
    java -jar template_project_gradle-2.6.0.jar
    exit $?
    '''

    script_filename = 'start.sh'

    with ssh.open_sftp() as stfp:
        with stfp.file(script_filename, 'w') as script_file:
            script_file.write(script_content)

    ssh.exec_command(f'chmod +x {script_filename}')
    ssh.close()
    return True

if __name__ == '__main__':
    remote_create_start_script()