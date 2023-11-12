import React,{createContext,useReducer,useContext}from 'react'

const CartStateContext=createContext();

const CartDispatchContext=createContext();

const  reducer=(state,action)=>{

     if(action.type=== "ADD"){
           
            return [...state,{id:action.id,name:action.name,price:action.price,qty:action.qty,size:action.size}]
     }
    else if(action.type=== "REMOVE")
    {
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;
    }

     else if(action.type=== "DROP"){
            let empArray = []
            return empArray
     }
     else if(action.type==="UPDATE"){
            let arr = [...state]
           
            for (let i = 0; i < arr.length; i++) {
               // console.log(arr[i])
                if (arr[i].id === action.id && arr[i].size===action.size) {
                    // Modify the quantity and price
                    arr[i].qty = parseInt(action.qty) + arr[i].qty;
                    arr[i].price = parseInt(arr[i].qty*action.price) ;
                    break; // Exit the loop once the item is found and updated
                }
            }
            return arr;
        }

        else console.log("Here is the error in reducer")
    
}




export const CartProvider= ({children})=> {

    
const [state,dispatch]= useReducer(reducer,[])

  return (
   
    <CartDispatchContext.Provider value={dispatch}>
       <CartStateContext.Provider value={state}>
      
          {children}
        
       </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart =()=> useContext(CartStateContext)

export const useCartDispatch = ()=> useContext(CartDispatchContext)


