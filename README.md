- Library Management TDD Solution

Welcome to my solution for the Library Management Kata! This repository showcases the use of Test-Driven Development (TDD) to solve a programming problem, emphasizing small, incremental commits and clear, concise code.

- Table of Contents

--> [Problem Statement]
--> [Requirements]
--> [Solution]
--> [Features]
--> [Setup Instructions]
-> [Prerequisites]
-> [Clone the Repository]
-> [Import Project into VS code]
-> [Build the Project]
-> [Running Tests]
--> [Test Coverage]

--> Problem Statement

Create a simple library management system that allows users to perform basic operations such as adding books, borrowing books, returning books, viewing available books and remove books from library by librarian user.

--> Requirements

    - **Add Books**:
      - Users should be able to add new books to the library.
      - Each book should have a unique identifier (e.g., ISBN), title, author, and publication year.

    - **Borrow Books**:
      - Users should be able to borrow a book from the library.
      - The system should ensure that the book is available before allowing it to be borrowed.
      - If the book is not available, the system should raise an appropriate error.

    - **Return Books**:
      - Users should be able to return a borrowed book.
      - The system should update the availability of the book accordingly.

    - **View Available Books**:
      - Users should be able to view a list of all available books in the library.

For a detailed problem statement and requirements,

--> Solution

This project follows TDD principles to solve the kata problem. The Library Management System built using TypeScript offers a robust solution for managing books and users within a library. This system is designed to handle essential library functions, such as adding and removing books, registering users, and retrieving user and book information. The solution is built with small, incremental commits, ensuring that each feature is developed and tested in isolation, demonstrating effective TDD practices.

    - **key features**:
        Book Inventory Management
        TypeScript Integration
        Test-Driven Development (TDD)
        Error Handling

--> Features

-> User Management - **addUser**: - Adds a new user to the library's user catalog. - Validates that the user is not null. - Throws an exception if the user already exists.

    - **getUserByName**:
        - Retrieves a user from the library by their username.
        - Returns `null` if the user is not found.

-> Book Management - **addBook**: - Allows a user to add a book to the library's inventory. - Validates that the user is a librarian. - Ensures the book is not null. - Throws an exception if the user is unauthorized.

    - **getBookByISBN**:
        - Retrieves a book from the inventory using its ISBN.
        - Returns `null` if the book is not found.

-> Available Books - **viewAvailableBooks**: - Returns a list of all books currently available in the library. - Ensures the list is unmodifiable.

-> Borrowing Books - **borrowBook**: - Allows a user to borrow a book from the library. - Validates that the book is not already borrowed. - Ensures the book exists in the inventory. - Throws an exception if the book is already borrowed.

    - **getBorrowerNameByISBN**:
        - Retrieves the name of the user who borrowed a specific book.
        - Returns `null` if the book is not found.

    - **getBookByISBNFromBorrowedBook**:
        - Retrieves details of a borrowed book using its ISBN.
        - Returns `null` if the book is not found.

-> Returning Books - **returnBook**: - Allows a user to return a borrowed book to the library. - Validates that the book was borrowed by the same user. - Ensures the book is returned to the inventory.

--> Setup Instructions

    **Prerequisites**
        - Ensure Node.js is installed as it provides the runtime environment for TypeScript and JavaScript.
        - Knowledge of the TypeScript compiler (tsc) to transpile TypeScript code into JavaScript.
        - Install Jest for running unit tests
        - Familiarity with Git commands for version control (clone, commit, push, pull, branch, merge).

    **Clone the Repository**

        1. Open your terminal or command prompt.
        2. Run the following command to clone the repository:

            ```bash
            git clone https://github.com/Dhruvsavani47/library.git
            ```

        3. Navigate into the project directory:

            ```bash
            cd library
            ```

    **Import Project into VS code**

        1. Open VS Code: Launch the editor.
        2. Open Folder: Use the File menu to select and open your project folder.
        3. Install Extensions: Add necessary extensions for your project’s needs.
        4. Configure Project: Install dependencies and review configuration files.
        5. Run and Debug: Use the terminal and debug configurations to run your project.
        6. Version Control: Set up Git if needed and manage changes through the Source Control view.

    **Build the Project**

    **Running Tests**
        - Go to terminal and follow path of this main folder and type "npm test".

--> Test Coverage

The current test coverage of this project is 96%.
