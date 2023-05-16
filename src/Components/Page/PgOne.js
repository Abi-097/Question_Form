import React from "react";
import { Card,Button,Icon } from "semantic-ui-react"
import "./Main.css"
import image from '../../Components/Images/question-job.png';
import { useNavigate } from 'react-router-dom';


 export default function PgOne(){
  const navigate = useNavigate();
  

    return(
        <div className="Main">  
        
          <Card className="Card">
        <Card.Content>
          <Card.Header className="cardHeader">Question Form</Card.Header>
          <img src={image} alt="nepal"width="100%" height="150rem" ></img>
          <br/><br/><br/>
          <Card.Description className="cardDescription">
          This small quiz is used to categorize students and send them to the Super class. There will be a total of 20 questions. We assign 5 points to each question. So, 75 points is the pass limit to join Super class. 
          <br/>  15 x 5 = 75 points.  <br/>
        “Education is one thing no one can take away from you.” —Elin Nordegren <br/>
       
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button animated onClick={()=> {navigate("/page2")}}>
      <Button.Content visible >Get Started</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
          </div>
        </Card.Content>
      </Card>

        </div>
      
    )
    }

