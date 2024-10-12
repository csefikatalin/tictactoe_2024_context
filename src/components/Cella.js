import React, { useContext } from 'react'
import './Cella.css'
import { KattContext } from '../context/KattContext'

function Cella(props) {
  const {katt} =useContext(KattContext)

/*   function katt(){
    console.log("katt", props.index)
    props.katt(props.index)
  } */

  return (
    <div className='cella' onClick={()=>{katt(props.index)}}>
        {props.jel}
    </div>
  )
}

export default Cella