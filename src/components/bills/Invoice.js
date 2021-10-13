import {Button} from 'react-bootstrap'
import { Preview, print } from 'react-html2pdf';
import ComponentPrint from './ComponentPrint'

const Invoice = () => {
    
      
        return (
          <div>              
                <Preview id={'jsx-template'} >
                    <ComponentPrint/>
                </Preview>
                <Button className = 'd-grid gap-2 col-1 mx-auto' variant="success" onClick={()=>print('invoice', 'jsx-template')}>Download</Button>
               
          </div>
        );
    }

export default Invoice