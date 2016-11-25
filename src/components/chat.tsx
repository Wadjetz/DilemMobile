import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  ListView,
  TouchableHighlight,
  View
} from 'react-native'

interface Props { }

interface State {
  conversation: Message[]
  input: string
}

interface Message {
  id: number
  message: string
  image: string
  css: string
}

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class chat extends React.Component<Props, State> {

  render() {
    this.state = {
      conversation: [
        {
          'id': 1,
          'image': 'https://facebook.github.io/react/img/logo_og.png',
          'message': 'Salut ça va ? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'css': ''
        },
        {
          'id': 2,
          'image': 'https://www.parkingsdeparis.com/include/images/bg-paris.jpg',
          'message': 'Oui et toi ?',
          'css': 'reverse'
        },
        {
          'id': 1,
          'image': 'https://facebook.github.io/react/img/logo_og.png',
          'message': 'Niquel',
          'css': ''
        },
        {
          'id': 2,
          'image': 'https://www.parkingsdeparis.com/include/images/bg-paris.jpg',
          'message': 'Oui et toi ?',
          'css': 'reverse'
        },
        {
          'id': 1,
          'image': 'https://facebook.github.io/react/img/logo_og.png',
          'message': 'Niquel',
          'css': ''
        },
        {
          'id': 2,
          'image': 'https://www.parkingsdeparis.com/include/images/bg-paris.jpg',
          'message': 'Oui et toi ?',
          'css': 'reverse'
        },
        {
          'id': 1,
          'image': 'https://facebook.github.io/react/img/logo_og.png',
          'message': 'Niquel',
          'css': ''
        },
        {
          'id': 2,
          'image': 'https://www.parkingsdeparis.com/include/images/bg-paris.jpg',
          'message': 'Oui et toi ?',
          'css': 'reverse'
        },
        {
          'id': 1,
          'image': 'https://facebook.github.io/react/img/logo_og.png',
          'message': 'Niquel',
          'css': ''
        },
        {
          'id': 2,
          'image': 'https://www.parkingsdeparis.com/include/images/bg-paris.jpg',
          'message': 'Oui et toi ?',
          'css': 'reverse'
        },
        {
          'id': 1,
          'image': 'https://facebook.github.io/react/img/logo_og.png',
          'message': 'Niquel',
          'css': ''
        },
        {
          'id': 2,
          'image': 'https://www.parkingsdeparis.com/include/images/bg-paris.jpg',
          'message': 'Oui et toi ?',
          'css': 'reverse'
        },
        {
          'id': 1,
          'image': 'https://facebook.github.io/react/img/logo_og.png',
          'message': 'Niquel',
          'css': ''
        }
      ],
      input: ''
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <ListView
            horizontal={false}
            scrollEnabled = {false}
            showsHorizontalScrollIndicator = {false}
            dataSource={ds.cloneWithRows(this.state.conversation)}
            pageSize = {5}
            renderRow={(rowData) =>this.conversationRender(rowData)}
            style={styles.listScroll} />
        </ScrollView>
        <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={this.state.input}
          onChangeText={(input) => {
            this.setState({ conversation: this.state.conversation, input });
            console.log(input);
          }}
          placeholder='Votre message'
        />
        <TouchableHighlight>
          <Text style={styles.button}>Envoyer</Text>
        </TouchableHighlight>
        </View>
      </View>
    );
  }

  conversationRender(x: Message){
    return(
      <View style={[styles.message, x.css ? { flexDirection: 'row-reverse' } : null]}>
        <Image source={{uri: x.image }} style={styles.image} />
        <View style={[styles.contentMsg, x.css ? { backgroundColor: '#1abc9c', marginRight: 0 } : null ]}>
          <Text style={[styles.textMsg, x.css ? { color: '#FFF' } : null ]}>{x.message}</Text>
        </View>
      </View>
    )
  }

}

interface Style {
  container: React.ViewStyle
  listScroll: React.ViewStyle
  message: React.ViewStyle
  image: React.ImageStyle
  contentMsg: React.ViewStyle
  textMsg: React.TextStyle
  form: React.ViewStyle
  input: React.ViewStyle
  button: React.TextStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1
  },
  listScroll: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 10
  },
  message: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin:10
  },
  contentMsg: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    marginRight: 70
  },
  textMsg: {
    color: '#555'
  },
  form: {
    flex: 0.06,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center'
  },
  input: {
    height: 35,
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#FFF',
    paddingLeft: 5
  },
  button: {
    color: '#888',
    marginLeft: 10
  }
})
