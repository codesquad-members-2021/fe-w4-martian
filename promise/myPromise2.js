class MyPromise2 {
    constructor(){
<<<<<<< HEAD
        this.cbList=[];
    }

    then(cb){
=======

    }

    then(){
>>>>>>> 4deec2e851297e0a52e9a58aa1b486be643973c7

    }
}

const p = new MyPromise2((resolve,reject)=>{
    setTimeout(()=>{
        resolve('completed')}
    ,1000)
    
});

p.then((res)=> console.log(res));
