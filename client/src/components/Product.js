import React from "react";
import "../App.css";
import {Component} from 'react';

export class Product extends Component{

  constructor(props) {
    super(props);
    this.state = {data:this.props.data
   };
  }
  // handles the delete of product
  handleDelete=(id,data)=>{
      console.log(data);
    fetch("http://localhost:3001/deleteData", {
        method: 'delete',
        mode: 'cors',
        headers: {
          'accept': 'application/json', 
          'content-type': 'application/json'
        },
        body: JSON.stringify({id:id})
      })  
      .then(res => {
        const updatedDeletedData= data.filter(function(data){
                    return data._id!==id;
                })
        this.props.changeData(updatedDeletedData);
      })
      
      console.log("aa");
  }
  // update api to be added 
  onUpdateData=(id)=>{
    fetch("http://localhost:3001/updateData", {
        method: 'put',
        mode: 'cors',
        headers: {
          'accept': 'application/json', 
          'content-type': 'application/json'
        },
        body: JSON.stringify({id:id,name:this.name.value,description:this.description.value})
      })
      .then(res => res.json())  
      .then(data => {
        console.log(data);
        
      })
  }
  render(){
    
    return (
      <main>
        <div>
            <ul className="product-list">
        {this.props.data.map((product,id) => 
            <li key={product._id}>
                <span className="name">Name: </span>
                <input 
                    className="product-name"
                    placeholder="add product name"
                    name='name' 
                    value={product._source.name}
                     
                />
                <span className="description">Description: </span>
                <input className="des-txt"
                    placeholder="add product description"
                    name='name' 
                    value={product._source.description}
                     
                />
                <button className="delete"onClick={()=>this.handleDelete(product._id,this.props.data)}>Delete</button>
                <hr></hr>
            </li>
            )
        }
        </ul>
        </div>
      </main>
    );

  }

}

// export default Product;