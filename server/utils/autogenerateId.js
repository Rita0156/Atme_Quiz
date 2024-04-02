
const { v4: uuidv4 } = require('uuid');

// Array to store generated UUIDs
let generatedUUIDs = [];

// Function to generate a unique UUID
function generateUniqueUUID() {
    let uuid;
    do {
        uuid = generateUUID();
    } while (generatedUUIDs.includes(uuid)); // Check if the generated UUID already exists
    generatedUUIDs.push(uuid); // Add the generated UUID to the list
    return uuid;
};

// Function to generate UUID
function generateUUID() {
    return uuidv4().replace(/-/g, '').toLowerCase(); 
};

// Function to generate JSON data with unique UUIDs
function generateJSONData(count) {
    const data = {};
    for (let i = 0; i < count; i++) {
        data[`item_${i}`] = generateUniqueUUID();
    }
    return data;
};

module.exports = {generateJSONData};
