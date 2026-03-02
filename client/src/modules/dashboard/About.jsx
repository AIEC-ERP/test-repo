import React from 'react'
import { useNavigate } from 'react-router-dom'
const About = () => {
    const navigate = useNavigate();
    const handledashnav = (e) =>{
        e.preventDefault();
        navigate("/dashboard");
    }
  return (
    <>
    <div>About</div>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eveniet tempora similique aliquid natus ea dolor exercitationem, illo debitis laborum?
    <div>
    <button type='button' onClick={(e)=>{handledashnav(e)}}>dashboard</button>
    </div>
    </>
  )
}

export default About