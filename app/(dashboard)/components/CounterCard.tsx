"use client"
import React from 'react';
import { Card } from 'react-bootstrap';

export default function CounterCard({counts, totalCount, width, fontSize, variant}) {
  return (
    <Card style={{ width: width }} bg={variant} text="black">
      <Card.Header style={{ fontSize: fontSize, fontWeight: 'bold', textAlign: 'center' }}>
        {`${counts}/${totalCount}`}
      </Card.Header>
    </Card>
  );
}
