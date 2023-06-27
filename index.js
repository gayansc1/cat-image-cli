const { join } = require('path');
const mergeImg = require('merge-img');
const argv = require('minimist')(process.argv.slice(2));
const config = require('config');
const imgBase = config.get('imageBasepath');
const { mergeAndSaveImage } = require('./services/image.service');
const {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

// File out Path
const fileOut = join(process.cwd(), `/cat-card.jpg`);

if(validateInputs(greeting, who, width, height, size)){
  const firstReq = genarateRequest(imgBase, greeting, width, height, color, size); // First Request
  const secondReq = genarateRequest(imgBase, who, width, height, color, size);  //Second Request
  if(firstReq && secondReq ){
    const result =  mergeAndSaveImage(firstReq,secondReq,width, fileOut);
  }
}else{
  console.log("invalid inputs. Please Enter correct inputs and retry");
}



function sanitizeInput(input) {
  // Sanitize the input by removing leading and trailing whitespace
  const sanitizedInput = input.trim();
  // Return the sanitized input
  return sanitizedInput;
}

// Create the request body
function genarateRequest(imgBase, greetingText, width, height,color, size){
  const requestBody = {
    url: `${imgBase}${greetingText}?width=${width}&height=${height}&color=${color}&s=${size}`,
    encoding: "binary",
}
  return requestBody;
}

//Validate Number Input
function validateNumInput(input){
  return (typeof input === 'number' && !isNaN(input)) ;
 
}

//Validate String Input
function sanitizeAndValidateStrInput(input){
  const sanitizedInput = sanitizeInput(input);
  return (typeof sanitizedInput === 'string' || typeof sanitizedInput === 'number');
}


function validateInputs(greeting, who, width, height, size){
    if(!sanitizeAndValidateStrInput(greeting) || !sanitizeAndValidateStrInput(who)){
      console.log('greeting and who should be a text');
      return false;
    }
    if(!validateNumInput(width) || !validateNumInput(height) || !validateNumInput(size)){
      console.log('Width, Height, Size must be a number');
      return false;
    }
   
    return true;
}
