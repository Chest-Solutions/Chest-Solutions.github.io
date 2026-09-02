import sharp from 'sharp';
const [f,X,Y,W,H,CW,CH]=process.argv.slice(2);
const {data,info}=await sharp(f).extract({left:+X,top:+Y,width:+W,height:+H}).resize(+CW,+CH,{kernel:'nearest'}).raw().toBuffer({resolveWithObject:true});
const C=info.channels,ramp=' .:-=+*#%@';let out='';
for(let y=0;y<info.height;y++){let l='';for(let x=0;x<info.width;x++){const i=(y*info.width+x)*C;l+=ramp[Math.min(9,Math.floor((data[i]*.299+data[i+1]*.587+data[i+2]*.114)/255*10))];}out+=l+'\n';}
console.log(out);
