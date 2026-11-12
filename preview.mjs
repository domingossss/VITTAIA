import http from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4'};
http.createServer(async(req,res)=>{try{let p=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(p!==root&&!p.startsWith(root+sep)){res.writeHead(403).end();return}if(p===root)p=resolve(root,'index.html');const info=await stat(p);res.setHeader('Content-Type',types[extname(p)]||'application/octet-stream');res.setHeader('Accept-Ranges','bytes');const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),info.size-1):info.size-1;if(start>=info.size||end<start){res.writeHead(416,{'Content-Range':`bytes */${info.size}`}).end();return}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${info.size}`,'Content-Length':end-start+1});createReadStream(p,{start,end}).pipe(res)}else{res.setHeader('Content-Length',info.size);createReadStream(p).pipe(res)}}catch{res.writeHead(404).end('Not found')}}).listen(5173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:5173'));
