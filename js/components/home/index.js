
import React, { Component } from 'react';
import { TouchableOpacity,Alert,ListView,View,Text } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Thumbnail ,Footer,FooterTab,Card,CardItem } from 'native-base';


import ProgressBarClassic from 'react-native-progress-bar-classic';



import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';



const delete_ = 'http://192.168.2.82/usave/delete.php';
const Server_getaccountinfo = 'http://192.168.2.82/usave/accountinfo.php';
const server_plans = 'http://192.168.2.82/usave/plan.php';
const server_newplans = 'http://192.168.2.82/usave/newplan.php';
const server_scatter = 'http://192.168.2.82/usave/scatter.php';


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
      pa_bal: '',
      pid: '',
      n_pid: '',
      n_palot: '',
      n_ptotal: '',
      n_pname: '',
      dataSource: ds.cloneWithRows([
            'row 1', 'row2'
         ])

    };
    

    this.getAccountinfo();

    
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
  }
  toggleTab5() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      tab: 'Add Plan'

    });
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
         content = <View>
                      <Card>
                       <CardItem style={{backgroundColor: '#9b7bb5'}}>   
                       <List> 
                       <ListItem iconLeft>  
                       <Icon name="ios-power" style={{ color: '#9b7bb5' }} />                 
                          <Text style={styles.bal}>Savings Account</Text>
                          <Text note style={styles.amount}>{this.state.bal}</Text>
                        </ListItem>
                        </List>
                      </CardItem>
                      <CardItem style={{backgroundColor: '#6bb3b5'}}> 
                      <List>    
                       <ListItem iconLeft>      
                       <Icon name="ios-power" style={{ color: '#6bb3b5' }} />             
                          <Text style={styles.bal}>Monthly Salary</Text>
                          <Text note style={styles.amount}>{this.state.pa_bal}</Text>
                        </ListItem>
                        </List>
                      </CardItem>
                      <CardItem style={{backgroundColor: '#81b64c'}}> 
                      <List>    
                       <ListItem iconLeft>    
                       <Icon name="ios-power" style={{ color: '#81b64c' }} />               
                          <Text style={styles.bal}>Unbudget Balance</Text>
                          <Text note style={styles.amount}>{this.state.salary}</Text>
                        </ListItem>
                        </List>
                        <Button block style={{ marginBottom: 20, marginRight: 50, marginLeft: 50}}>Distribute</Button>
                      </CardItem>
                      </Card>
                    </View>

        break
      case 'Plans':
        content =  <View>
       
       <View style={{}}>
    
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
      case 'Add Plan':
      content =
                  <View style={{margin: 20, backgroundColor: 'white'}}>
                     <List>
                        <ListItem style={{padding: 20}}>
                            <InputGroup >
                                <Input inlineLabel label="Plan Name" onChangeText={(e) => this.setState({n_pname:e})}/>
                            </InputGroup>
                        </ListItem>
                    
                        <ListItem style={{padding: 10}}>
                            <InputGroup>
                                <Icon name="ios-clipboard-outline" style={{ color: 'blue' }} />
                                <Input inlineLabel label="Money Allot" placeholder="Money Allot" onChangeText={(e) => this.setState({n_palot:e})} />
                            </InputGroup>
                        </ListItem>
                        <ListItem style={{padding: 10}}>
                            <InputGroup>
                                <Icon name="ios-clipboard-outline" style={{ color: 'blue' }} />
                                <Input inlineLabel label="Total Amount" placeholder="Total Amount" onChangeText={(e) => this.setState({n_ptotal:e})}/>
                            </InputGroup>
                        </ListItem>
                        <Button block style={{backgroundColor: '#250f59', marginTop: 130, marginBottom: 20, marginRight: 50, marginLeft: 50}} onPress={()=>this.toggleTab1()}>Cancel</Button>
                        <Button block style={{backgroundColor: '#250f59', marginBottom: 20, marginRight: 50, marginLeft: 50}} onPress={()=>this.newplan()}>Save</Button>
                    </List>
                  </View>
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
      case 'Add Plan':
        title = <Title>Add Plan</Title>
        break
    }

    return title

  }

  //delete plans
  deleteplant(e){



    fetch(delete_ + '?plan_id=' + this.state.pid )
      .then((response) => response.json())
      .then((responseData) => {
        const emessage = responseData.emessage;
        if (emessage === '0') {
         
          Alert.alert("Delete failed",'Deletion failed',[
        {text: 'Ok', onPress: () => this.toggleTab1()},
      
        ]);
          
        }
        
        else {
             Alert.alert("Delete successful",'Successfully deleted',[
        {text: 'Ok', onPress: () => this.toggleTab1()},
      
        ]);
             
        }
        
      })

      .done();  

  }

  //scatter.php
  startbudget(){

    fetch(server_scatter + '?acc_no=' + this.props.name + '&p_salary=' + this.state.salary)
      .then((response) => response.json())
      .then((responseData) => {
        const emessage = responseData.emessage;
         Alert.alert('','Distribution Successfully');


      })
      .done();

  }


  //new plan 
  newplan(){
    fetch(server_newplans + '?acc_no=' + this.props.name + '&pname=' + this.state.n_pname + '&pmoneyalot=' + this.state.n_palot + '&ptotal=' + this.state.n_ptotal)
      .then((response) => response.json())
      .then((responseData) => {
        const emessage = responseData.emessage;
        Alert.alert('','Plan Created Successfully');

         })
        .done();  
        

  }

  //render plans
  renderRow(row) {
  return (
      
      <Content style={{}}>
      
      <Card style={{marginLeft: 15, marginRight: 15, marginTop: 5 , marginBottom: 1}}>
      <View style={styles.plan}>
      <CardItem>
      
      <List>
      <ListItem iconLeft>
      <Icon name="ios-clipboard-outline" style={{ color: 'blue' }} />
      <Text style={{color:'black',marginLeft:10,marginRight:10,fontSize:30}}>{row.p_name}</Text>
      <TouchableOpacity onPress={() =>     
      fetch(delete_ + '?plan_id=' + row.pid )
      .then((response) => response.json())
      .then((responseData) => {
        const emessage = responseData.emessage;
        if (emessage === '0') {
         
          Alert.alert("Delete failed",'Deletion failed');
          
        }
        
        else {

             Alert.alert("Delete successful",'Successfully deleted');
        }
        
      })

      .done()} ><Text style={{color: 'red', fontSize: 25}}> x </Text></TouchableOpacity>
      </ListItem>
      </List>
     
      <List>
      <ListItem iconLeft>
      <Icon name="ios-power" style={{ color: '#FFF' }} />
      <Text style={{color:'black',marginRight:10,fontSize:20}}>Alloted:</Text>
      <Text note style={{color:'black',fontSize:20}}>{row.p_money_alot}%</Text>
      </ListItem>
      </List>

      <List>
      <ListItem iconLeft>
      <Icon name="ios-power" style={{ color: '#FFF' }} />
      <Text style={{color:'black',marginRight:10,fontSize:20}}>Goal:</Text>
      <Text note style={{color:'black',fontSize:20}}>{row.p_total}</Text>
      </ListItem>
      </List>

      <List>
      <ListItem iconLeft>
      <Icon name="ios-power" style={{ color: '#FFF' }} />
      <Text style={{color:'black',marginRight:10,fontSize:20}}>Saved:</Text>
      <Text note style={{color:'black',fontSize:20}}>{row.p_saved}</Text>
      </ListItem>
      </List>

      <List>
      <ListItem iconLeft>
      <Icon name="ios-power" style={{ color: '#FFF' }} />
      <Text style={{color:'black',marginRight:10,fontSize:20}}>Amount Left:</Text>
      <Text note style={{color:'black',fontSize:20}}>{row.kulang}</Text>
      </ListItem>
      </List>

      <List>
      <ListItem iconLeft>
      <Icon name="ios-power" style={{ color: '#FFF' }} />
      <Text style={{color:'black',marginRight:10,fontSize:20}}>Months Left:</Text>
      <Text note style={{color:'black',fontSize:20}}>{row.p_month}</Text>
      </ListItem>
      </List>
      <View style={{padding: 10}}>
      <ProgressBarClassic label="Label" progress={row.percent}/>
      </View>
      </CardItem>
      </View>
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
        this.setState({pa_bal: responseData.pa_balance});

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
          <Button transparent onPress={() => this.toggleTab5()}>
            <Text style={{fontSize:60}}>+</Text>
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
