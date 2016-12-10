
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  listItem: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    padding: 10,
    marginBottom:10,
   },
  bal: {
    fontSize: 30,
    backgroundColor: 'lightblue',
  },
  homeContainer: {
    flex: 2,
    alignItems: 'center',
  }
});
