import React,{useState} from 'react';
import './App.css';

export default function App() {
  const [FormData, SetFormData] = useState({
    name:"",email:"",message:""
  });
  const [value, setValue] = useState(null);

  const handleChange = async(e)=>{
    SetFormData(prev =>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit =  async(e)=>{
    e.preventDefault();
    setValue(null)
    try {
    const response = await fetch("https://gemini-contact-backend-t3ix.vercel.app/api/contact",{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(FormData),
    });
    if(response.ok){
      setValue("Message Sent Successfully");
      SetFormData({name:"",email:"",message:""});
    }else{
      const data = await response.json();
      setValue(data.error || "Failed to sent message")
    }
  } catch (error) {
    setStatus('Error sending message.');
      console.error(error);
  }
 }
  return (
    <div id='contact-form' className='form-container'>
      <form onSubmit={handleSubmit} className='contact-form'>
        <h2>Contact Us</h2>
        <div>
          <h5>Name</h5>
          <input type='text' placeholder='Enter Your Name' name='name' value={FormData.name} onChange={handleChange} required/>

        </div>
        <div>
          <h5>Email</h5>
          <input type='email' placeholder='Enter Your Email' name='email' value={FormData.email} onChange={handleChange} required/>
          
        </div>
        <div>
          <h5>Message</h5>
          <input type='text' placeholder='Enter Your Message' name='message' value={FormData.message} onChange={handleChange} required/>
          
        </div>
        <button type='submit'>Send</button>

        {value && <p>{value}</p>}
      </form>
    </div>
  )
}