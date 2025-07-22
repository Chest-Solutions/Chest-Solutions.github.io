
# header-footerify

**header-footerify** is a lightweight JavaScript library designed to automate the insertion of header and footer content into your web pages. By loading header and footer content from external HTML files, this library helps you maintain a clean and modular structure in your projects, making updates easier and more efficient.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Easy Integration**: Quickly integrate the library into your existing projects with minimal setup.
- **External Content Loading**: Load header and footer content from external HTML files.
- **DOM Manipulation**: Automatically inserts the content into designated `<header>` and `<footer>` elements.
- **Lightweight**: Minimal impact on page load times.

## Installation

You can install `header-footerify` via npm:

```bash
npm install header-footerify
```

Or you can directly include the `headerFooter.js` file in your project by downloading or cloning the repository:

```bash
git clone https://github.com/burhanuddinhamzabhai/header-footerify.git
```

Include the script in your HTML file:

```html
<script src="path/to/headerFooter.js"></script>
```

## Usage

1. **Prepare Header and Footer HTML Files**

   Create separate `header.html` and `footer.html` files containing your desired header and footer content.

2. **Include Header and Footer Elements**

   In your HTML files, include `<header>` and `<footer>` elements where the content should be inserted:

   ```html
   <header></header>
   <footer></footer>
   ```

3. **Use the Library**

   Use the `insertHeaderFooter()` function to load the content from your external HTML files:

   ```javascript
   insertHeaderFooter('path/to/header.html', 'path/to/footer.html');
   ```

### Example

Here’s a simple example of how to use `header-footerify` in a web page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Page</title>
</head>
<body>
    <!-- Header placeholder -->
    <header></header>

    <!-- Main content -->
    <main>
        <h1>Welcome to My Website</h1>
        <p>This is a simple example of using the header-footerify.</p>
    </main>

    <!-- Footer placeholder -->
    <footer></footer>

    <!-- Include the library -->
    <script src="dist/headerFooter.js"></script>
    <script>
        // Insert header and footer content
        insertHeaderFooter('header.html', 'footer.html');
    </script>
</body>
</html>
```

## Contributing

We welcome contributions to improve `header-footerify`. If you have any suggestions or find a bug, please open an issue or submit a pull request.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
