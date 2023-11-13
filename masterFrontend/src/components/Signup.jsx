import { useContext, useState } from 'react';
import TaskContext from '../TaskContext';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    signup(email, password, name);
  };

  return (
    <div style={{height:"100vh"}}>
 <div className="text-center mt-5">
 <h1 style={{fonFamily: 'Caveat',
fontFamily: 'Foldit'}}>Task Master</h1>
      <p style={{fontFamily: 'Caveat' ,fontSize:"xx-large"}}> Your Daily Task Partner</p>
 </div>
     <div className="d-flex justify-content-center">
     <div className="border  rounded p-2 m-5 " style={{ width: '25rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <div className='text-center' style={{marginTop:"-2rem "}}><img width="100px" style={{borderRadius:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiaEbB4CHlWQNXTCa6EO4FeYfvmK2U1kcggBoscy-71-fDV8dy69xCADf8nXeE1tywQAQ&usqp=CAU"/></div>
            <h2 className='text-center' style={{fontFamily: 'Cantora One' }}>Signup Now</h2>
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control text-center"
              id="exampleInputName1"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control text-center"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your email"
              required
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control text-center"
              id="exampleInputPassword1"
              placeholder="Enter Your password"
              required
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <div className='text-center'>
          <Link to="/">Already have an account, Login?</Link>
          </div>

         <div className="d-flex justify-content-center">
         <button type="submit" className="btn btn-primary">
            Submit
          </button>
         </div>
          <br />
        </form>
      </div>
     </div>
    </div>
  );
}
