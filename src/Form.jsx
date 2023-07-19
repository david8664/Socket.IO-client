// import React, { useState } from 'react';
// import { socket } from './socket';

// function Form() {
//   const [value, setValue] = useState('');


//   function onSubmit(event) {
//     event.preventDefault();

//     socket.emit('mountain', value, ()=> {
//         console.log ('printed apple')
//     })
   
//   }

//   return (
//     <form onSubmit={ onSubmit }>
//       <input onChange={ (e) => setValue (e.target.value) } />

//       <button type="submit">Submit</button>
//     </form>
    
//   );
  
// }
// export default Form
