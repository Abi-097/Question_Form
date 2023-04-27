import { Card,Button } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';




export default function PgFour(){
  const navigate = useNavigate();
    return(
      <div className="Main">
          
          <form className="ui form attached fluid segment RegSize">
<Card.Header className="cardHeader">Thank you for the Participation!, </Card.Header>
<br/><br/><br/><br/>
<Card.Header className="cardHeader">Will meetup with the another test</Card.Header>
<br/><br/>
<Button compact onClick={()=>{navigate("/home")}}>Home</Button>
</form>
         
        </div>
      
        
    )
}

