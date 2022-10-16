async function start() {
    return 'async is worked';
}

start().then((res)=>{
    console.log(res)
})

class Util {
    static id=Date.now()
}
var unused=42
console.log('Util.id',Util.id)

import ('lodash').then(res=>{
    console.log('lodash',res.random(0,42,true) )
})