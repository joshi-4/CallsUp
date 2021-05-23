import React from 'react';
import { Title, Card, Paragraph } from 'react-native-paper';
import { Text } from 'react-native';

const ContactCard = () => {
    return (
        <Card>
            <Card.Title
                title="John Hamm"
                subtitle="+91-9873472343"
                right={() => <Text style={{ margin: 10 }}>3w2d</Text>}
            >

            </Card.Title>
        </Card>
    )
}

export default ContactCard;