import React, { Component, ViewStyle, TextStyle } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, StatusBar, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window') 
const px = PixelRatio.get()

interface ProfileProps {
  name: string
  birthday: string
  picture: string
}

export default class Profile extends Component<ProfileProps, void> {
  render() {
    const { name, birthday, picture } = this.props

    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" />

        <View style={s.infos}>
          <View style={s.people}>
            <Text style={s.name}>Jean Pierre</Text>
            <Text style={s.name}>, 24</Text>
          </View>

          <Text style={s.job}>Caissier chez Auchan</Text>

          <View style={s.tagList}>
            <View style={s.tag}>
              <Text style={s.tagName}>{"Queen Club".toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View>
          <Overlay />

          <Image
            source={require('../../assets/images/antoine.jpg')}
            style={s.image}
          />
        </View>
      </View>
    )
  }
}

class Overlay extends Component<void, void> {
  render() {
    return (
      <View style={s.overlay} />
    )
  }
}

interface Style {
  container: ViewStyle
  overlay: ViewStyle
  image: ViewStyle
  infos: ViewStyle
  people: ViewStyle
  name: TextStyle
  job: TextStyle
  tagList: ViewStyle
  tag: ViewStyle
  tagName: TextStyle
  buttons: ViewStyle
  button: VieWStyle
  buttonFirst: ViewStyle
  acceptedButton: ViewStyle
  rejectedButton: ViewStyle
}

const s = StyleSheet.create<Style>({
  // Global
  container: {
    position: 'relative',
  },

  // Image + overlay
  overlay: {
    position: 'absolute',

    backgroundColor: 'rgb(0, 0, 0)',

    opacity: 0.5,
    zIndex: 10,

    top: 0,
    left: 0,

    width: width,
    height: height,
  },

  image: {
    width: width,
    height: height,
  },

  // User infos (name, age, job title, tag list)
  infos: {
    position: 'absolute',

    paddingTop: 200 / px,

    flex: 1,

    width: width,
    height: height,

    zIndex: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },

  people: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  name: {
    backgroundColor: 'transparent',

    fontFamily: 'Futura-Bold',
    fontSize: 40 / px,
    color: '#FFFFFF',

    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 6,
  },

  job: {
    marginTop: 10 / px,

    backgroundColor: 'transparent',

    fontFamily: 'Futura-Book',
    fontSize: 32 / px,
    lineHeight: 42 / px,
    color: '#FFFFFF',
  },

  tagList: {
    marginTop: 68 / px,
  },

  tag: {
    paddingTop: 12,
    paddingLeft: 20,
    paddingBottom: 12,
    paddingRight: 20,

    backgroundColor: '#FFFFFF',

    borderRadius: 70 / px,
  },

  tagName: {
    fontFamily: 'Futura-Bold',
    fontSize: 20 / px,
    textAlign: 'center',
    lineHeight: 26 / px,
    color: '#000000',
  },
})
