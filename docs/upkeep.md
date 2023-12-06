# Maintaining project

This document will clarify on how the upkeep of this application can be done.

## Logo 
In case anything regarding Logo changes, a script has been created to help keep syntax highlighting and keywords up to date.


In

```
/frontend/src/static
```

Exists several files containing necessary information for all of these features. In en.js and fin.js are all translations for both languages. Every piece of text, except Logo keywords, shown on the application can be modified here. When creating or modifying the application, be sure to add translations following the way it is currently done. Both en.js and fin.js are to be modified, since obviously both are in use depending on the language.

In the same directory, a file by the name of tooltips.json is located. This file contains the documentation for Logo keywords in the time of writing this document, both in Finnish and English. This documentation is in markdown format. You can add or modify the documentations if necessary following this JSON structure. If keywords are added also the two txt-files, keywords_english.txt and keywords_finnish.txt are to be modified as well. These files are in CSV-format and only contain the names of Logo keywords and are needed for updating syntax highlighting.

When said .txt-files are modified, a script

```
/static/update_prepare_keywords.sh
```

Should be also be run. It updates the grammar for the parser which is in use by the editor.