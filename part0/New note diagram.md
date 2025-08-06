SequenceDiagram
    participant browser
    participant server
    
    browser ->> server HTTP Post https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server ->> browser get https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    Note right of browser:the server access the form data and create a new objects and add in user submitted data.  

    Note right of browser: the browser restarts to the notes page

    Browser ->> server HTTP get https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server ->> browser the style sheet
    deactivate server

    Browser ->> server HTTP get https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server ->> browser the JavaScript code
    deactivate server

    Browser ->> server HTTP get https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server ->> browser raw data of the notes with new data from user
    deactivate server

