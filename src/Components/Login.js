import React, {Component} from 'react';
import firebase from '../Initializer/Firebase';


class Login extends Component {
  constructor(props){
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.state ={
      name:'',
      email:'',
      password: '',
    }
  }
    handleChange=(e)=>{
      this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit=(e)=>{
      e.preventDefault();
      console.log(this.state);
            
    }
    signIn(e) {
      e.preventDefault();
      firebase.fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        
      }).catch((error) => {
          console.log(error);
        });
    }
    
    signUp(e){
      console.log(this.state.email)
      e.preventDefault();
      firebase.fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>{
        
        firebase.fire.auth().currentUser.sendEmailVerification();
      })
      .catch((error) => {
        alert(error, 'Error')
        })
    }
    resetPassword(e){
      e.preventDefault();
      firebase.fire.auth().sendPasswordResetEmail(this.setState.email, this.setState.password = !this.setState.password).then((u) => {
        alert("El correo de verificación se ha enviado");
      }).catch(() => {
        alert("Error");
      });
    }

    
   render(){
    return (
      <div className = 'login'>
          <h1 className = 'titleWindowSign'>My Notes</h1>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input value={this.state.name} onChange={this.handleChange} type="text" name="name" className="form-login" placeholder="Enter Name" />
              </div>
              <div>
                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-login" placeholder="Enter Email" />
              </div>
              <div>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-login" placeholder="Password" />
              </div>
                <button className='buttonSign' type= 'submit' onClick={this.signIn}>Sign In</button>
                <button className='buttonSign' type= 'submit' onClick={this.signUp}>Sign Up </button>
                <button className='buttonSign' onClick={this.resetPassword}>Forgot Password</button>
           </form> 
      </div>
       );
   }
}

export default Login;
