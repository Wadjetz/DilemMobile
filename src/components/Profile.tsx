import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

interface ProfileProps {
    name: string,
    birthday: string,
    picture: string
}

export default class Profile extends Component<ProfileProps, void> {

    render() {
        const {name, birthday, picture} = this.props
        return(
          <View >
            <Image source={{uri:picture}}
                   style={{width: 400, height: 400}}/>
            <Text>{name}</Text>
            <Text></Text>
            <TouchableOpacity style={styles.button}>
               <Text>//ReactNativeSVG
               </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
               <Text>//ReactNativeSVG
               </Text>
            </TouchableOpacity>
          </View>
        )
    }
}


interface Style {
  container: React.ViewStyle
  profile: React.TextStyle
  button: React.ViewStyle
  acceptedButton: React.ViewStyle
  rejectedButton: React.ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
  },
  profile: {
  },
  button: {
    backgroundColor: '#FF005C',
    height: 30,
    width: 30,
    borderRadius: 30
  },
  acceptedButton: {

  },
  rejectedButton: {

  }
})
