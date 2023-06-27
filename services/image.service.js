const { writeFile } = require("fs").promises;
const mergeImg = require("merge-img");
const request = require('request');

// Merge two images
const mergeImages = (firstBody, secondBody, width) => {
  return mergeImg([
    { src: new Buffer(firstBody, 'binary'), x: 0, y: 0 },
    { src: new Buffer(secondBody, 'binary'), x: width, y: 0 }
  ]);
};

//Save new image to a file
const saveImageToFile = (buffer, outputPath) => {
  return writeFile(outputPath, buffer, 'binary');
};


//Handle merge images and save to file
const mergeAndSaveImage = async (firstReq, secondReq, width, outputPath) => {
  try {
    const firstBody = await getRequestData(firstReq);
    const secondBody = await getRequestData(secondReq);
  
    console.log('Received response with status: ' + firstBody.statusCode);
    console.log('Received response with status: ' + secondBody.statusCode);
  
    const img = await mergeImages(firstBody.body, secondBody.body, width);
    const buffer = await getImageBuffer(img);
  
    await saveImageToFile(buffer, outputPath);
  
    console.log("The file was saved!");
  } catch (err) {
    console.error(err);
  }
};

//Geting body for images
const getRequestData = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve({ statusCode: res.statusCode, body });
      }
    });
  });
};

const getImageBuffer = (img) => {
  return new Promise((resolve, reject) => {
    img.getBuffer('image/jpeg', (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};

module.exports = {
  mergeAndSaveImage
};
