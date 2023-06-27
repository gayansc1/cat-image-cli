# Image Merger
Recommended Node version : v16.17.0

This is a simple application that generates a cat card by merging two cat images with customizable text. 
It utilizes the "cataas" API to retrieve cat images and the "merge-img" library to merge the images together.

Installation
To use this application, you need to have Node.js installed on your machine. Follow these steps to get started:

1. Clone the repository or download the source code files.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install the required dependencies

command : npm install

This will install the required packages into the application.

Usage
Once you have installed the dependencies, you can run the app using the following command:

Command : node index.js --greeting "Hello" --who "You" --width 400 --height 500 --color "Pink" --size 100

The command-line arguments are optional and have default values as shown above. Here is a description of each argument:

--greeting: The text to be displayed on the first cat image. Default: "Hello".
--who: The text to be displayed on the second cat image. Default: "You".
--width: The width of the cat images and the resulting merged image. Default: 400.
--height: The height of the cat images and the resulting merged image. Default: 500.
--color: The color of the text on the cat images. Default: "Pink".
--size: The font size of the text on the cat images. Default: 100.

After running the app, it will make two API requests to retrieve the cat images with the specified text and parameters. 
The responses will be merged into a single image file named "cat-card.jpg" and saved in the current working directory.
