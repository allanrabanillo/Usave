
import React, { Component } from 'react';
import { Image,Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';

import { setUser } from '../../actions/user';
import styles from './styles';

const {
  replaceAt,
} = actions;



const Server_login = 'http://192.168.2.82/usave/login.php';


const background = require('../../../images/shadow.png');
//hello comment
//boom comment
class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      acc_no: '',
      acc_code: '',

    };
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.acc_no);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }


trylogin() {
    this.setState({animating: true});

    fetch(Server_login + '?acc_no=' + this.state.acc_no + '&acc_code=' + this.state.acc_code)
      .then((response) => response.json())
      .then((responseData) => {
        const emessage = responseData.emessage;
        this.setState({id: emessage});
        if (emessage === '0') {
         
          Alert.alert("Login-in failed",'Your Account No or Account Code is incorrect');
          
        }
        
        else {
           this.passall() 
        }
        
      })

      .done();  
    

  }

  passall(){

    this.replaceRoute('home');
  }


  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" />
                  <Input placeholder="EMAIL" onChangeText={acc_no => this.setState({ acc_no })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText={acc_code => this.setState({ acc_code })}
                  />
                </InputGroup>
                <Button style={styles.btn} onPress={() => this.trylogin()}>
                  Login
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
