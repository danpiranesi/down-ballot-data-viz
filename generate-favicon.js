const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateFavicon() {
  try {
    console.log('Starting favicon generation...');
    
    // Create necessary directories
    await fs.mkdir(path.resolve(__dirname, 'public/favicon'), { recursive: true });
    
    // Source image
    const sourceImage = path.resolve(__dirname, 'public/Example_Image.png');
    
    // Generate favicon.ico (16x16 and 32x32)
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.resolve(__dirname, 'public/favicon.ico'));
    console.log('Generated favicon.ico');
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(sourceImage)
      .resize(180, 180)
      .toFile(path.resolve(__dirname, 'public/apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');
    
    // Generate various sizes for different devices
    const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 512];
    
    for (const size of sizes) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.resolve(__dirname, `public/favicon/favicon-${size}x${size}.png`));
      console.log(`Generated favicon-${size}x${size}.png`);
    }
    
    console.log('Favicon generation complete!');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicon(); 