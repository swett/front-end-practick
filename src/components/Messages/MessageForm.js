import React from 'react';
import {Segment, Button, Input} from 'semantic-ui-react';

class MessageForm extends React.Component {
    render() {
        return(
            <Segment className="message__form"
            style={{marginLeft: '0.1em'}}>
                <Input 
                fluid
                name="message"
                style={{marginBottom: '0.7em'}}
                label={<Button icon={'add'}/>}
                labelPosition="left"
                plaseholder="Write your message"
                />
                <Button.Group icon widths="3">
                <Button 
                    color="orange"
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"

                />

                <Button 
                    color="teal"
                    content="upload media"
                    labelPosition="right"
                    icon="cloud upload"
                />
                </Button.Group>
            </Segment>

        )
    }
}

export default MessageForm;