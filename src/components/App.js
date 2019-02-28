import React from 'react';
import { Grid, GridColumn} from 'semantic-ui-react';
import './App.css';
import {connect} from 'react-redux';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

const App = ({ currentUser }) => (
  <Grid columns="equal" className="apps" style={{background: '#eee'}}>
  
  <ColorPanel />
  
    
    <SidePanel  currentUser={currentUser}/>
    <GridColumn style={{marginRight: 1}}></GridColumn>
    
    <Grid.Column width={7} style={{marginRight:100}} >
    <Messages />
    </Grid.Column>
    <Grid.Column width={4}>
    <MetaPanel />
    </Grid.Column>
    
  </Grid>
)
const mapStateToProps = state => ({

  currentUser: state.user.currentUser
})


export default connect(mapStateToProps)(App);
