
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#d0d0d0',
  },
  row: {
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
    fontSize: 25,
    color: 'white',
   },
  amount: {
    marginLeft: 15,
    fontSize: 20,
    color: 'white',
  },

  plan: {
    flex: 2,
    backgroundColor: 'white',

  }
});
