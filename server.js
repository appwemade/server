
// http://localhost:3000/fileWrite/123/
// http://localhost:3000/fileRead/123/
// http://localhost:3000/fileDelete/123/

async function ᶠᶠappServer(){
    var ᵛᵒthrough = {};
    globalThis.process.on('uncaughtException', await ᶠᶠappServer__errorUncaught);
    var ᵛᵒhttp = require('http');
    var ᵛᵒserver = ᵛᵒhttp.createServer(await ᶠᶠappServer__request.bind(0, ᵛᵒthrough));
        ᵛᵒserver.listen(80); // http://localhost:3000/
};


async function ᶠᶠappServer__errorUncaught(ᵛᵒerror){
    globalThis.console.log(ᵛᵒerror);
};


async function ᶠᶠappServer__request(ᵛᵒthrough, ᵛᵒrequest, ᵛᵒresponse){
    ᵛᵒobject = {};
    ᵛᵒobject.ⁱᵒrequest = ᵛᵒrequest;
    ᵛᵒobject.ⁱᵒresponse = ᵛᵒresponse;
    ᵛᵒobject.ⁱᵒrequest.ⁱᵃbody = [];
    ᵛᵒobject.ⁱᵒrequest.on('data', await ᶠᶠappServer__requestPrepare.bind('', ᵛᵒobject));
    ᵛᵒobject.ⁱᵒrequest.on('end', await ᶠᶠappServer__requestReady.bind('', ᵛᵒobject, ᵛᵒthrough));
};


async function ᶠᶠappServer__requestPrepare(ᵛᵒrequest, ᵛˢchunk){
    ᵛᵒrequest.ⁱᵒrequest.ⁱᵃbody.push(ᵛˢchunk);
};


async function ᶠᶠappServer__requestReady(ᵛᵒrequest, ᵛᵒthrough){

    var ᵛˢbody = ᵛᵒrequest.ⁱᵒrequest.ⁱᵃbody.join('') || '{}';
    ᵛᵒrequest.ⁱᵒpost = globalThis.JSON.parse(ᵛˢbody);

    ᶠᶠappServer__requestReady2(ᵛᵒrequest, ᶠᶠappServer__response, ᶠᶠappServer__requestError, ᵛᵒthrough);
};

async function ᶠᶠappServer__requestReady2(a, b, c, d){
    try {await b(a, d);} 
    catch(e){await c(a, e);};
};


async function ᶠᶠappServer__requestError(ᵛᵒrequest, ᵛᵒerror){
    globalThis.console.log(ᵛᵒerror); 
    ᵛᵒrequest.ⁱᵒresponse.writeHead(500);
    ᵛᵒrequest.ⁱᵒresponse.end('500');
};


async function ᶠᶠappServer__response(ᵛᵒrequest, ᵛᵒthrough){
    // headers
        ᵛᵒrequest.ⁱᵒresponse.setHeader('Content-Type', 'application/json; charset=utf-8');
        ᵛᵒrequest.ⁱᵒresponse.setHeader('Access-Control-Allow-Credentials', 'true');
        ᵛᵒrequest.ⁱᵒresponse.setHeader('Access-Control-Allow-Origin', '*'); 


    //    var ᵛˢurl = ᵛᵒrequest.ⁱᵒrequest.url;
    //    var ᵛᵃurl = ᵛˢurl.split('/');
    //    console.log(ᵛᵃurl);


    await ᶠᶠappServer__uri1(ᵛᵒrequest);
    await ᶠᶠappServer__uri2(ᵛᵒrequest);
    await ᶠᶠappServer__uri3(ᵛᵒrequest);


    if(!ᵛᵒrequest?.ⁱᵒresponse?.finished ) return ᵛᵒrequest.ⁱᵒresponse.end('{"status":123}');
};



async function ᶠᶠappServer__uri1(ᵛᵒrequest){
    if( ᵛᵒrequest?.ⁱᵒresponse?.finished ) return;
    var ᵛˢurl = ᵛᵒrequest.ⁱᵒrequest.url;
    var ᵛᵃurl = ᵛˢurl.split('/');
    if(ᵛᵃurl?.[1] !== 'fileWrite' ) return;

    var ᵛˢtext = 'hello ' + Date.now();
    var ᵛᵛfs = require('fs');
        ᵛᵛfs.writeFileSync('./test.txt', ᵛˢtext);

    return ᵛᵒrequest.ⁱᵒresponse.end('{"uri":"fileWrite"}');
};


async function ᶠᶠappServer__uri2(ᵛᵒrequest){
    if( ᵛᵒrequest?.ⁱᵒresponse?.finished ) return;
    var ᵛˢurl = ᵛᵒrequest.ⁱᵒrequest.url;
    var ᵛᵃurl = ᵛˢurl.split('/');
    if(ᵛᵃurl?.[1] !== 'fileRead' ) return;

    var ᵛˢtext = '';
    var ᵛᵛfs = require('fs');
    var ᵛˡfile = ᵛᵛfs.existsSync('./test.txt');
    if( ᵛˡfile ) ᵛˢtext = ᵛᵛfs.readFileSync('./test.txt', 'utf8');

    return ᵛᵒrequest.ⁱᵒresponse.end('{"text":"'+ᵛˢtext+'"}');
};


async function ᶠᶠappServer__uri3(ᵛᵒrequest){
    if( ᵛᵒrequest?.ⁱᵒresponse?.finished ) return;
    var ᵛˢurl = ᵛᵒrequest.ⁱᵒrequest.url;
    var ᵛᵃurl = ᵛˢurl.split('/');
    if(ᵛᵃurl?.[1] !== 'fileDelete' ) return;

    var ᵛᵛfs = require('fs');
    var ᵛˡfile = ᵛᵛfs.existsSync('./test.txt');
    if( ᵛˡfile ) ᵛᵛfs.unlinkSync('./test.txt');

    return ᵛᵒrequest.ⁱᵒresponse.end('{"uri":"fileDelete"}');
};




ᶠᶠappServer();














