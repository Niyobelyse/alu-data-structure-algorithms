const fs = require('fs');
const path = require('path');

class UniqueInt {
    static processFile(inputFilePath, outputFilePath) {
        // Read the input file
        const inputData = fs.readFileSync(inputFilePath, 'utf8');
        const lines = inputData.split('\n');
        const uniqueIntegers = [];
        
        // Initialize a boolean array to track seen integers (from -1023 to 1023)
        const seenIntegers = new Array(2047).fill(false);

        for (let line of lines) {
            // Clean the line, remove leading/trailing whitespace
            line = line.trim();
            
            // Skip empty lines or lines with non-numeric data or multiple numbers
            if (!line || isNaN(line) || line.split(/\s+/).length > 1) continue;

            // Parse the integer value
            const num = parseInt(line, 10);

            // Check if the number is within the valid range and hasn't been seen before
            if (num >= -1023 && num <= 1023 && !seenIntegers[num + 1023]) {
                uniqueIntegers.push(num);
                seenIntegers[num + 1023] = true;
            }
        }

        // Sort the unique integers in ascending order
        uniqueIntegers.sort((a, b) => a - b);

        // Write the sorted unique integers to the output file
        const resultData = uniqueIntegers.join('\n') + '\n';
        fs.writeFileSync(outputFilePath, resultData, 'utf8');
    }
}

// Define paths for input and output directories
const inputDir = path.join(__dirname, '..', '..', 'sample_inputs');
const outputDir = path.join(__dirname, '..', '..', 'sample_results');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get all files in the input directory
const inputFiles = fs.readdirSync(inputDir);

// Process each input file
inputFiles.forEach(file => {
    if (file.endsWith('.txt')) {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, file.replace('.txt', '_result.txt'));
        UniqueInt.processFile(inputFilePath, outputFilePath);
        console.log(`Processed ${file}`);
    }
});

module.exports = UniqueInt;
