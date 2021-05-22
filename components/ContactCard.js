import React from 'react';
import { Title, Card, Paragraph } from 'react-native-paper';

const ContactCard = () => {
    return (
        <Card>
            <Card.Content>
                <Title>John Hamm</Title>
                <Paragraph>+91-9871232323</Paragraph>
            </Card.Content>
        </Card>
    )
}

export default ContactCard;