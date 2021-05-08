import React, { Component } from 'react'
import { API_URL } from '../config'
import axios from 'axios';
import {Product} from './Product';
export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state={
       data:[]
    }
}

  changeData =(data)=>{
    this.setState({ data: data})
  }
  onSearch = event => {
    event.preventDefault()
    axios.get(`${API_URL}/search?q=` + this.query.value)
                .then(response =>this.setState({data:response.data}))
    
  }
  onPostData = event =>{
    event.preventDefault()
    fetch(`${API_URL}/postData`, {
        method: 'post',
        mode: 'cors',
        headers: {
          'accept': 'application/json', 
          'content-type': 'application/json'
        },
        body: JSON.stringify({name:this.name.value,description:this.description.value})
      })
      .then(res => res.json())  
      .then(data => {
        this.form.reset()
      })
  }

  render = () => {
    return (
      // A ref is put on the form so that it can be reset once the submission
      // process is complete.
      <div>
        <form 
            onSubmit={this.onSearch} 
            ref={form => this.form = form}
        >
            <div className="searchInput">
            <label htmlFor='query'>Search products on our website</label>
            <input 
                className="sinput"
                name='query' 
                ref={input => this.query = input}
                required 
            />
            
            
            </div>
            <div className="search-btn">
            
            <button type='submit' className='btn' >
                Search
            </button>
            </div>
        </form>

        <form 
        onSubmit={this.onPostData} 
        ref={form => this.form2 = form}
        >
        <div>
        <label>Post a data with name and description</label>
        <input 
            placeholder="add product name"
            name='name' 
            ref={input => this.name = input}
            required 
        />
        <input 
            placeholder="add product description"
            name='description' 
            ref={input => this.description = input}
            required 
        />
        
        </div>
        <div>
        
        <button className="submit-btn" type='submit' className='btn' >
            Post
        </button>
        </div>
        </form>
        <Product data={this.state.data} changeData={this.changeData}/>
      </div>
    )
  }
}


// fetch(`${API_URL}/search?`+new URLSearchParams({
    //     q:this.email.value
    // }), {
    //   method: 'get',
      
    //   headers: {
    //     aCcePt: 'application/json', 
    //     'content-type': 'application/json'
    //   }
    // })
    // .then(res => {
    //     console.log(res);
    // })  
    // .then(data => {
    //   console.log(data);
    //   // Everything has come back successfully, time to update the state to 
    //   // reenable the button and stop the <Spinner>. Also, show a toast with a 
    //   // message from the server to give the user feedback and reset the form 
    //   // so the user can start over if she chooses.
    //   this.setState({ sendingEmail: false})
    //   this.form.reset()
    // })
    // .catch(err => console.log(err))