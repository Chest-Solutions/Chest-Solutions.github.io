import sharp from 'sharp';
const f=process.argv[2];
const {data,info}=await sharp(f).raw().toBuffer({resolveWithObject:true});
const {width:W,height:H,channels:C}=info;
const rows=new Array(H).fill(0);
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*C;const r=data[i],g=data[i+1],b=data[i+2];
 const mn=Math.min(r,g,b),mx=Math.max(r,g,b); if(mn>170&&mx-mn<25) rows[y]++;}
const s=await sharp(f).stats();
const m=s.channels.slice(0,3).map(c=>c.mean);
console.log(`${f}  ${W}x${H}  mean ${m.map(v=>v.toFixed(0)).join(',')}  (target 59,37,22)`);
console.log('  rows 0-19: '+rows.slice(0,20).join(','));
console.log('  rows H-20: '+rows.slice(H-20).join(','));
