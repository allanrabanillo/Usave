
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 2.0,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 140,
    bottom: 0,
  },
  input: {
    paddingLeft: 16,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: '#FBFAFA',
  },
  btn: {
    marginTop: 40,
    width: 150,
    alignSelf: 'center',
    backgroundColor: '#250f59',
  },
    welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
},
});
