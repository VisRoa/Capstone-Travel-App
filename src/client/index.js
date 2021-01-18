
import { handleSubmit } from './js/formHandler'
import { DynamicUI } from "./js/formHandler.js";
import {removeTrip} from './js/formHandler.js'
import { checkInput } from "./js/formHandler.js";



import './styles/base.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/resets.scss'

// export functions to be used in other files , babel allow us to export/import these files
export {handleSubmit};
export { removeTrip };
export { DynamicUI };
export { checkInput}
 // instead of having JS code in index.html I wrote it here with this .js file and to reach the submit class from index.html
   

   // this function removed to the formhandlr file
   
const submit = document.querySelector('.submit');

document.addEventListener('DOMContentLoaded' , () => {
      //event listeners here
   submit.addEventListener('click', event => {
   handleSubmit(event);
         
   
   })
});
   

   
   
