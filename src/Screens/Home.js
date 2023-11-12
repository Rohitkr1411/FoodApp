import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {
    const [search,setSearch]=useState('')
    const [foodCat,setfoodCat]=useState([]);
    const [foodItems,setfoodItems]=useState([]);

    const loadData= async()=>{
       
        let response= await fetch("http://localhost:8000/api/foodData",{
         method:"POST",
         headers:{
             'content-type':'application/json'
         },
       
        })

        response=await response.json();

        setfoodCat(response[1]);
        setfoodItems(response[0]);
        //console.log(response[0],response[1]);
    }

    useEffect(()=>{
     loadData()
    },[]);
     

    return (
        <div>
            <div> <Navbar /> </div>
            <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:'contain !important'}}>
            <div className="carousel-inner" id='carousel'>
                  
            <div className="carousel-caption"  style={{zIndex:"10"}}>
                <div className="d-flex justify-content-center">
                    <input className="bg-dark form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{color:"white"}} value={search} onChange={(e)=>{setSearch(e.target.name=e.target.value)}}/>
                </div>
            </div>

                <div className="carousel-item active">
                    <img src="https://source.unsplash.com/random/900×700/?burger" style={{filter:"brightness(30%)"}} className="d-block w-100 h-50" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900×700/?pizza" style={{filter:"brightness(30%)"}} className="d-block w-100 h-50" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900×700/?banana" style={{filter:"brightness(30%)"}} className="d-block w-100 h-50" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
            </div>
           <div className='m-2'>

            <div className='container'>
                {
            foodCat!=null ?
            foodCat.map((data)=>{
                return (
                    <div className='row mb-3'>
                <div key={data.id} className='fs-3 m-3'>
                     {data.CategoryName}
                     </div>
                     <hr />
                     {
                        foodItems.length !==0 ? 
                        (
                                foodItems.filter((item)=>(item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()) ))
                                  .map((filteredData) => {
                                    return(
                                    <div key={filteredData._id} className='col-12 col-md-6 col-lg-3'>
                                      <Card  
                                     foodItem={filteredData}
                                       //foodName={filteredData.name}
                                      options={filteredData.options[0]}
                                    //  imgsrc={filteredData.img}
                                      > </Card>
                                    </div>
                                    )
                        })
                        )
                        : <div>"No such data found"</div>
                     }
                     </div>
                )
            })
            : (<div>"-----"</div>)
              }
            </div>
            
           
           </div>
            <div> <Footer /> </div>
        </div>
    )
}



