'use restrict'

// imagine two timeouts are two requests to a webserver
// both request triggered when it comes
// (or the nodejs event loop processed code without stopping)
// This works perfectly for a webserver


setTimeout(()=> {
    console.log('Done 1')
}, 3000)


setTimeout(()=> {
    console.log('Done 2')
}, 3000)

