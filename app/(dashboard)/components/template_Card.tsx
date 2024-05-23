"use client"
import { Card } from "react-bootstrap";

export default function template_Card (title,width,fontsize,variant){
  return(<Card style={{ width: width}} bg={variant} text="black" >
    <Card.Header style={{ fontSize: fontsize, fontWeight: 'bold', textAlign: 'center'}}>
      {title}
    </Card.Header>
  </Card>);
}
