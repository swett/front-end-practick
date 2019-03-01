import React from 'react';
import firebase from '../../firebase';
import {Grid, Form, Segment, Button, Header, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import md5 from 'md5';

class Register extends React.Component {

 state = {
     username: "",
     email: "",
     password: "",
     passwordConfirmation: "",
     errors: [],
     loading: false,
     usersRef: firebase.database().ref('users')
 };
    isFormValid = () => {

        let errors = [];
        let error;



        if(this.isFormEmpty(this.state)){
          error = { message: 'Fill in all fields' };
          this.setState({ errors: errors.concat(error) });
          return false;
        } else if (!this.isPasswordValid(this.state)){
             error = {message: 'Password is invalid'};
             this.setState({ errors: errors.concat(error) });
             return false;
        
        } else {
            //form valid
            return true;
        }
    }

        isFormEmpty =({username, email, password, passwordConfirmation})=> {
            return !username.length || !email.length || !password.length ||
            !passwordConfirmation.length;
        }

        isPasswordValid = ({ password, passwordConfirmation}) => {
            if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
            } else if (password !== passwordConfirmation){
                return false;
            } else {
                return true;
            }
        }

        displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmint = event => {

        event.preventDefault();
        if(this.isFormValid()){

        this.setState({ errors: [], loading: true});
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(createdUser => {
            console.log(createdUser);
            createdUser.user.updateProfile({
                displayName: this.state.username,
                photoURL: 'http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon'

            })
            .then( () => {
                this.saveUser(createdUser).then(() => {
                    
                });
            } )
           .catch( err => {
               console.error(err);
               this.setState({ errors: this.state.errors.concat(err), loading: false});
           })
        })

        .catch(err => {
            console.error(err);
            this.setState({errors: this.state.errors.concat(err), loading: false });
        })


    }
};

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL

        });
    }






    handleInputError = (errors, inputName) => {
        return errors.some(error => 
      error.message.toLowerCase().includes(inputName)
        ) 
        ? "error"
        : ""

    }








    render() {

        const { username, 
            email, 
            password, 
            passwordConfirmation, 
            errors,
            loading
        
        
        } = this.state;

        return (
           <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: 450}}>
            <Header as="h1" inverted color="grey" textAlign="center">
                       Register for Stalkers
            </Header>
            <Form  onSubmit={this.handleSubmint} size="large" className="form-input">
            <Segment stacked>
            <Form.Input  fluid name="username" 
            icon="user" 
            iconPosition="left" 
            placeholder="Username" 
            onChange={this.handleChange} 
            value={username}
            type="text"/>
            

            <Form.Input 
             fluid 
             name="email" 
             icon="mail" 
             iconPosition="left" 
             placeholder="Email Address"
             onChange={this.handleChange}
             value={email} 
             className={this.handleInputError(errors, "email")}
             type="email"/>


<Form.Input  
            fluid 
            name="password" 
            icon="lock"
            iconPosition="left" 
            placeholder="Password" 
            onChange={this.handleChange}
            value={password} 
            className={this.handleInputError(errors, "password")}
            type="password"/>
            
            <Form.Input 
             fluid 
            name="passwordConfirmation" 
            icon="repeat" 
            iconPosition="left" 
            placeholder="Password Confirnation" 
            onChange={this.handleChange} 
            value={passwordConfirmation}
            className={this.handleInputError(errors, "password")  }
            type="password"/>
            
            <Button   disabled={loading}  className={ loading ? 'loading' : ''} 
            color='grey'
            fluid 
            size="large">
            Submint</Button>
            </Segment>

            </Form>
            {errors.length > 0 && (
                <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
                </Message>
            )}
                <Message>Allready a user?<Link to="/login">login</Link></Message>
            </Grid.Column>
           </Grid>
        )
    } 
}

export default Register;