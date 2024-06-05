const INCOMING_HEADER = "X-Header"
const INCOMING_UA = "user-agent"
const INCOMING_IP = "cf-connecting-ip"

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  request = event.request;
    
    const path = request.url.replace(WORKER_ENDPOINT, "");
    const sliverUrl = SLIVER_ENDPOINT + path;
    const ligoloUrl = LIGOLO_ENDPOINT + path;
    const filesUrl = FILES_ENDPOINT + path;
    const headerValue = request.headers.get(INCOMING_HEADER);
    const uaValue = request.headers.get(INCOMING_UA);
    const ipValue = request.headers.get(INCOMING_IP);
    
    if (headerValue === SLIVER_HEADER) {
      request = new Request(sliverUrl, request);
      const modifiedHeaders = new Headers(request.headers);
      modifiedHeaders.set("CF-Access-Client-Id", SERVICE_CF_ID);
      modifiedHeaders.set("CF-Access-Client-Secret", SERVICE_CF_SECRET);
      request = new Request(request, {
        body: request.body,
        headers: modifiedHeaders,
        method: request.method
      });
        const resp = await fetch(request);
        return resp  
  }
    else if (uaValue === LIGOLO_HEADER) {
      request = new Request(ligoloUrl, request);
      const modifiedHeaders = new Headers(request.headers);
      modifiedHeaders.set("CF-Access-Client-Id", SERVICE_CF_ID);
      modifiedHeaders.set("CF-Access-Client-Secret", SERVICE_CF_SECRET);
      request = new Request(request, {
        body: request.body,
        headers: modifiedHeaders,
        method: request.method
      });
        const resp = await fetch(request);
        return resp  
  }
    else if (ipValue === CUSTOM_IP) {
      request = new Request(filesUrl, request);
      const modifiedHeaders = new Headers(request.headers);
      modifiedHeaders.set("CF-Access-Client-Id", SERVICE_CF_ID);
      modifiedHeaders.set("CF-Access-Client-Secret", SERVICE_CF_SECRET);
      request = new Request(request, {
        body: request.body,
        headers: modifiedHeaders,
        method: request.method
      });
        const resp = await fetch(request);
        return resp  
  }  
    else {
    // If the header doesn't match, provide some benign response
    return new Response(JSON.stringify(
        {
          "Error" : "Authentication Failure."       
        }, null, 2), 
        {
          status: 401,
          headers: {
            "content-type": "application/json;charset=UTF-8"
          }
        }
    )
  } 
}
