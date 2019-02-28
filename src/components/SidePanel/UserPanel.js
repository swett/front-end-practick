import React from 'react';
import firebase from '../../firebase';

import {Grid, GridColumn, GridRow, Header, HeaderContent, Dropdown, Image} from 'semantic-ui-react';

class UserPanel extends React.Component {
        state = {
            user: this.props.currentUser

        }
       


    dropdownOptions = () => [
        {   
            key: 'user',
            text: (<span>
                Signed in as <strong>{this.state.user.displayName}</strong>
            </span>),
            disabled: true
        },
        {   key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {   key: 'signout',
            text: <span onClick={this.handleSigout}>Sign Out</span>
        }
    ]

    handleSigout = () => {
        firebase
        .auth()
        .signOut()
        .then(() => console.log('signed out!'))



    };


    render() {
        
        const {user} = this.state;

    
    return (
        <Grid style={{ background: '#4c3c4c'}}>
           <GridColumn>
               <GridRow style={{ padding: '1.2em', margin: 0}}>
                
                {/*App Header*/}
                <Header inverted floated="left" as="h2"> 
                <HeaderContent>StalkerChat</HeaderContent>
                </Header>

               </GridRow>
               


               {/*User Dropdown*/ }
               <Header style={{ padding:'0.25em'}} as="h4" inverted>
               <Dropdown trigger={
                   <span>
                       <Image  src={user.photoUrl} spaced="right" avatar/>
                   {user.displayName}
                   </span>
               } 
               
               options={this.dropdownOptions()}/>
               </Header>
               </GridColumn> 


        </Grid>

    );

}

}



export default UserPanel;