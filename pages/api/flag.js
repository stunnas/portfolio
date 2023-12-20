export default async function handler(req, res) {
    const { countryCode } = req.query;
  
    // Make sure to validate inputs here, and handle cases where countryCode is not provided
  
    try {
      const imageUrl = `https://flagsapi.com/${countryCode}/shiny/64.png`;
      const flagResponse = await fetch(imageUrl);
  
      if (flagResponse.ok) {
        // Forward the image content-type and status code
        res.status(flagResponse.status);
        res.setHeader('Content-Type', flagResponse.headers.get('Content-Type'));
  
        const imageBuffer = await flagResponse.buffer();
        res.send(imageBuffer);
      } else {
        // Forward not found or other errors as you see fit
        res.status(flagResponse.status).send('Flag not found');
      }
    } catch (error) {
      console.error('Failed to fetch flag image:', error);
      res.status(500).send('Internal server error');
    }
  }