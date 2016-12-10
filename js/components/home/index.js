
import React, { Component } from 'react';
import { TouchableOpacity,Alert,ListView,View,Text } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Thumbnail ,Footer,FooterTab,Card,CardItem } from 'native-base';


import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';




const Server_getaccountinfo = 'http://192.168.2.82/usave/accountinfo.php';
const server_plans = 'http://192.168.2.82/usave/plan.php';


const {
  reset,
  pushRoute,
} = actions;


class Home extends Component {

  
  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true,
      tab: 'Home',
      bal: '',
      salary: '',
      dataSource: ds.cloneWithRows([
            'row 1', 'row2'
         ])

    };

    this.getAccountinfo();

    fetch(server_plans + '?acc_no=' + this.props.name)
      .then((response) => response.json())
      .then((responseData) => {
        
        for (var i = 0; i < responseData.length; i++)
          {
              this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseData)});
          }         
           
        })
        .done();  
  }

  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      tab: 'Plans'
    });
    this.getplans();
   
  }

  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false,
      tab: 'Profile'
    });
  }

  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      tab: 'Settings'
    });
  }

  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true,
      tab: 'Home'

    });
    this.getAccountinfo();
     Alert.alert("boom",this.state.bal +" " + this.state.salary);
  }


  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }



  // render value

    renderContent() {

    const { tab } = this.state
    let content
    switch(tab) {
      case 'Home':
         content = <View style={styles.homeContainer}>
                      <Text style={styles.bal}>Balance: {this.state.bal}</Text>
                      <Text>Salary: {this.state.salary}</Text>
                    </View>

        break
      case 'Plans':
        content =  <View>
       
       <View style={{}}>
      <View style={{margin:10,flex:1, }}>
       <Button style={{}} rounded> Add new Plan </Button>
      </View>
      <View style = {{backgroundColor: 'blue',padding:2,marginBottom:0}}>
      </View>
      </View>
           <ListView
            style = {styles.listContainer}
            dataSource = {this.state.dataSource}
            renderRow = {this.renderRow}
         />
         </View>
        break
      case 'Profile':
        content = <Text>This is the content Profile</Text>
        break
      case 'Settings':
        content = <Text>This is the content Settings</Text>
        break
    }

    return content

  }

   renderTitle() {
    const { tab } = this.state
    let title
    switch(tab) {
      case 'Home':
         title = <Title>Home</Title>
        break
      case 'Plans':
        title = <Title>Plans</Title>
        break
      case 'Profile':
        title =  <Title>Profile</Title>
        break
      case 'Settings':
        title = <Title>Settings</Title>

        break
    }

    return title

  }

  //render plans
  renderRow(row) {
  return (
      
      <Content style={{}}>
      <Card>
      <CardItem>
      <Text style={{color:'black',marginLeft:10,marginRight:10,fontSize:20}}>{row.p_name}</Text>
      <Text style={{color:'black',marginLeft:10,marginRight:10}}>Alloted: {row.p_money_alot}</Text>
      <Text style={{color:'black',marginLeft:10,marginRight:10}}>Goal: {row.p_total}</Text>
      <Text style={{color:'black',marginLeft:10,marginRight:10}}>Saved: {row.p_saved}</Text>
      <Text style={{color:'black',marginLeft:10,marginRight:10}}>Percent: {row.percent}</Text>
      <Text style={{color:'black',marginLeft:10,marginRight:10}}>Remaining Amount: {row.kulang}</Text>
      <Text style={{color:'black',marginLeft:10,marginRight:10}}>Remaining Month: {row.p_month}</Text>
      </CardItem>
      </Card>
      </Content>
      
    
  );
}

  // Account info
  getAccountinfo(){

    fetch(Server_getaccountinfo + '?acc_no=' + this.props.name)
      .then((response) => response.json())
      .then((responseData) => {
        const emessage = responseData.emessage;
        this.setState({bal: responseData.balance});
        this.setState({salary: responseData.salary});

         })
        .done();  
   

  }
  // Plans
  getplans(){

    fetch(server_plans + '?acc_no=' + this.props.name)
      .then((response) => response.json())
      .then((responseData) => {
        
        for (var i = 0; i < responseData.length; i++)
          {
              this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseData)});
          }         
           
        })
        .done();  


         
  }





  render() {
    return (
 

      <Container theme={myTheme} style={styles.container}>
         <Header>
          <Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
            <Icon name="ios-power" />
          </Button>

          {this.renderTitle()}

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
         
          {this.renderContent()}
          
          </Content>

        <Footer >
          <FooterTab>
          <Button active={this.state.tab4} onPress={() => this.toggleTab4()} >
                Home
              <Icon name="ios-home-outline" />
            </Button>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()} >
                Plans
              <Icon name="ios-clipboard-outline" />
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()} >
                Profile
              <Icon name="ios-person-outline" />
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()} >
                Settings
              <Icon name="ios-paper-outline" />
            </Button>
            
          </FooterTab>
        </Footer>
      </Container>

    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);
