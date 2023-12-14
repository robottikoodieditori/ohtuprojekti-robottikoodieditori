# Maintaining project and running in production

This document aims to provide clarity on how to upkeep this application.

## Logo
In the event of any changes related to the Logo programming language, a script has been created to assist in keeping syntax highlighting and keywords up to date.
The forked parser should also be kept up to date, or a new forked version of the parser can be specified to be used in:

```
/backend/pyproject.toml
```
by replacing the current git repository from dependencies.

Within the directory:

```
/frontend/src/static
```

several files exist containing necessary information for all of these features. In `en.js` and `fin.js`, you will find translations for both languages. Every piece of text, except for Logo keywords, displayed in the application can be modified here. When developing or modifying the application, ensure to add translations following the existing format in both `en.js` and `fin.js`, as both are in use depending on the language.

In the same directory, a file named `tooltips.json` is located. This file contains documentation for Logo keywords at the time of writing this document, in both Finnish and English, formatted in markdown. You can add or modify the documentation if necessary, following this JSON structure. If keywords are added, the two txt files, `keywords_english.txt` and `keywords_finnish.txt`, should also be modified. These files are in CSV format and only contain the names of Logo keywords, necessary for updating syntax highlighting.

When the mentioned `.txt` files are modified, a script named:

```
/scripts/update_prepare_keywords.sh
```

should be run. This script updates the grammar for the parser used by the editor.

## Building frontend
When using this application, the frontend should be built, and the build should be moved to `/backend`. This can be accomplished by running the following command:
```
npm run build && cp -r build ../backend
```

In the directory:

```
/frontend
```

## Running in production
Now, only the server for the backend needs to be running. To actually run the application in production, navigate to:

```
/backend
```

And run the following command:

```
poetry run invoke gunicorn
```

The application is now live and served at the root route "/".

## Broken things
There are several problems with scaling due to bugs in css classes and the css base has gotten bloated and have several instances of similar classes defined, all are in use however.

Logo to Java compiler is currently inconsistent when it comes to finding errors, meaning it usually finds only the first error in the file when trying to compile. Further info can be found [here](https://github.com/theJSZ/logomotion_).
