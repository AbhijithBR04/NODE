// let p= new Promise((resolve,reject)=>{
//     a=1+2
//     if(a==2){
//         resolve("sucesss")
//     }else{
//         reject("failed")
//     }
// })

// p.then((msg)=>{
//     console.log("the result is",msg)
// }).catch((msg)=>{
//     console.log("the result is",msg)
// })


// async function myfun(){
//     try{
//         let a=1+2
//         if (a==2){
//             console.log("success")
//         }else{
//             throw "failed"
//         }
//     }catch(error){
//         console.log("the result is",error)
//     }
// }

// myfun()


// async function fun1(req, res){
//     let response = await request.get('http://localhost:3000');
//       if (response.err) { console.log('error');}
//       else { console.log('fetched response');
//   }}

//   fun1()




const runRestaurant = async (customerId) => { 
      if(!!!customerId) throw new Error("Invalid CustomerId!") 
    try { 
        const customer = await meetCustomer(customerId); 
        const order = await getOrder(customer.customerId); 
        await notifyWaiter(order.customerId); 
        await serveCustomer(order.customerId); 
      } catch (err) { 
        console.log("Error: ", err.message); 
      } 
    } 
    runRestaurant(1) 
      .then(() => console.log(`Order of customer fulfilled...`)) 
      .catch((error) => console.log(error)) 