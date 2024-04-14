exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
        headers: { 'Allow': 'POST' }
      };
    }
  
    const data = JSON.parse(event.body);
    const name = data.name || 'World';
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${name}!` })
    };
  };
  