import * as $ from 'jquery'

function createAnalytics():object {
    let counter:number=0
    let isDestroy:boolean=false
    const listener = () => counter++

    document.addEventListener('click',listener)
    $(document).on('click',listener)
    return{
        destroy(){
          $(document).off("click",listener)
        },
        getClick(){
            if(isDestroy){
               return 'Analytics is azaza'
            }
           return counter
        }
    }
}
window['analytics']=createAnalytics()