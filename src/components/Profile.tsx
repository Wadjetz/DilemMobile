import React, { Component, ViewStyle, TextStyle } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Dimensions, StatusBar, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window') 
const px = PixelRatio.get()

interface ProfileProps {
  data: {
    name: string
    birthday: string
    picture: string
    gender: string
  }
  token: string
}

export default class Profile extends Component<ProfileProps, void> {
  render() {
    const {
      data: {
        name,
        birthday,
        picture,
        gender,
      },
    } = this.props

    const birthdayYear = new Date(birthday).getFullYear()
    const currentYear = new Date(Date.now()).getFullYear()
    const age = currentYear - birthdayYear

    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" />

        <View style={s.infos}>
          <View style={s.people}>
            <Text style={s.name}>{name}</Text>
            <Text style={s.name}>, {age}</Text>
          </View>

          <Text style={s.job}>{gender}</Text>

          <View style={s.tagList}>
            <View style={s.tag}>
              <Text style={s.tagName}>{"Queen Club".toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View style={s.detail}>
          <View style={s.header}>
            <Text style={s.headerName}>Jean Pierre</Text>
            <Text style={s.headerActive}>Actif, il y a 30 minutes</Text>
          </View>

          <View style={s.stats}>
            <View style={[s.statsBlock, s.statsBlockFirst]}>
              <Text style={s.statsText}>24 ans</Text>
            </View>

            <View style={s.statsBlock}>
              <Text style={s.statsText}>4 amis</Text>
            </View>
          </View>

          <View>
            <Image style={s.map} source={require('../../assets/images/map.png')} />
          </View>

          <View style={s.detailProfile}>
            <View style={s.descriptionBlock}>
              <Text style={s.label}>{"Description".toUpperCase()}</Text>
              <Text style={s.detailDescription}>Coquine, entreprenante, je ne souhaite pas me remettre en couple de suite. Je cherche des relations légères et sans prise de tête. J’ai quelques fantasmes à réaliser, tu veux participer ?</Text>
            </View>

            <View style={s.lineSeparator} />

            <View>
              <Text style={s.label}>{"Intérêts".toUpperCase()}</Text>

              <View style={s.interestsList}>
                <View style={s.tagDetail}>
                  <Text style={s.tagNameDetail}>BUZZFEED</Text>
                </View>

                <View style={s.tagDetail}>
                  <Text style={s.tagNameDetail}>BUZZFEED</Text>
                </View>

                <View style={s.tagDetail}>
                  <Text style={s.tagNameDetail}>BUZZFEED</Text>
                </View>
              </View>
            </View>

            <View style={s.lineSeparator} />

            <View>
              <Text style={s.label}>{"Goûts en commun".toUpperCase()}</Text>

              <ScrollView style={s.listView} horizontal>
                <View style={s.likeCard}>
                  <Image source={require('../../assets/images/batman.jpg')} />
                </View>

                <View style={s.likeCard}>
                  <Image source={require('../../assets/images/jamiexx.jpg')} />
                </View>

                <View style={s.likeCard}>
                  <Image source={require('../../assets/images/netflix.jpg')} />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>

        <View>
          <Overlay />

          <Image
            source={{uri: picture + '?token=' + this.props.token}}
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

  // Detail profile
  detail: {
    position: 'absolute',

    backgroundColor: '#FFFFFF',

    zIndex: 100,

    opacity: 0,
  },

  header: {
    height: 420 / px,

    paddingLeft: 80 / px,
    paddingBottom: 80 / px,

    justifyContent: 'flex-end',
  },

  headerName: {
    fontFamily: 'Futura-Bold',
    fontSize: 40 / px,
    color: '#323232',
    lineHeight: 60 / px,
  },

  headerActive: {
    fontFamily: 'Futura-Book',
    fontSize: 28 / px,
    color: '#999999',
  },

  stats: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EFEFEF',

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  statsBlock: {
    width: width / 2,
    height: 160 / px,

    paddingLeft: 80 / px,

    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  statsBlockFirst: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#EFEFEF',
  },

  statsText: {
    fontFamily: 'Futura-Book',
    fontSize: 32 / px,
    color: '#333333',
    lineHeight: 48 / px,
  },

  map: {
    width: width,
    height: 620 / px,
  },

  detailProfile: {
    paddingLeft: 40 / px,
    paddingRight: 40 / px,
  },

  descriptionBlock: {
    marginTop: -40 / px,
  },

  lineSeparator: {
    backgroundColor: '#EFEFEF',

    marginTop: 60 / px,
    marginBottom: 60 / px,

    width: width - (80 / px),
    height: StyleSheet.hairlineWidth,
  },

  label: {
    marginBottom: 10 / px,

    fontFamily: 'Futura-Bold',
    fontSize: 22 / px,
    color: '#999999',
    letterSpacing: 1 / px,
  },

  detailDescription: {
    fontFamily: 'Futura-Book',
    fontSize: 32 / px,
    color: '#333333',
    lineHeight: 48 / px,
  },

  interestsList: {
    marginTop: 40 / px,

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  tagDetail: {
    paddingTop: 12,
    paddingLeft: 20,
    paddingBottom: 12,
    paddingRight: 20,

    marginRight: 20 / px,

    backgroundColor: '#33A1FD',

    borderRadius: 70 / px,
  },

  tagNameDetail: {
    fontFamily: 'Futura-Bold',
    fontSize: 20 / px,
    textAlign: 'center',
    lineHeight: 26 / px,
    color: '#FFFFFF',
  },

  listView: {
    marginLeft: -40 / px,

    paddingTop: 40 / px,
    paddingLeft: 40 / px,
    paddingBottom: 40 / px,
  },

  likeCard: {
    width: 200 / px,
    height: 270 / px,

    marginRight: 40 / px,

    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      height: 2 / px,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20 / px,
  },
})
