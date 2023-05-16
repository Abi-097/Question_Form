import {React,useState} from "react";
import { Card,Button } from "semantic-ui-react";
import image from '../../Components/Images/light-bulb-clip-art.png';
import { useNavigate } from "react-router-dom";


export default function PgTwo(){
  const navigation = useNavigate();
    const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };


    return(
        <div className="Main">
<form onSubmit={handleSubmit} className="ui form attached fluid segment RegSize" >
<Card.Header className="cardHeader">Register Form</Card.Header>
<br/><br/>
<img src={image} alt="nepal" width="200rem" height="180rem"></img>
          <br/><br/> 

    <div class="field">
      <label>Student ID</label>
      <input class="ui error input" placeholder="Student ID" type="text" value={studentId}
          onChange={(event) => setStudentId(event.target.value)}
          required/>
    </div>
    <div class="field">
      <label>Full Name</label>
      <input class="ui error input" placeholder="Name" type="text" value={name}
          onChange={(event) => setName(event.target.value)}
          required/>
    </div>
  <div class="inline field">
  </div>
  <Card.Content extra>
          <div className='ui two buttons'>
          <Button color='teal' type="submit" onClick={()=> {navigation("/page3")}} >Submit/Next</Button>  
          </div>
        </Card.Content>
</form>
        </div>

    )

    
}



