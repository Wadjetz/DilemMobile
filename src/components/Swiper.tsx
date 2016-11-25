import React, { Component, ViewStyle } from 'react'
import { StyleSheet, View, Image, ScrollView, Dimensions, TouchableOpacity, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window') 
const px = PixelRatio.get()

interface State {
  width: number
  height: number
}

interface Props {
  style: ViewStyle
}

export default class Swiper extends React.Component<Props, State> {
  renderScrollView = (pages: any) => {
    return (
      <ScrollView ref="scrollView" horizontal pagingEnabled>
        {pages}
      </ScrollView>
    )
  }

  render() {
    const { children } = this.props

    const pageStyle = [{width: width, height: height}, s.slide]
    const pagesFromChildes = Object.keys(children)

    const pages = pagesFromChildes.map((page, i) => {
       return <View style={pageStyle} key={i}>{children[page]}</View>
    })

    return (
      <View style={s.container}>
        <View style={s.buttons}>
          <TouchableOpacity style={[s.button, s.buttonFirst, s.rejectedButton]} activeOpacity={0.8}>
            <Image source={require('../../assets/images/cross.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={[s.button, s.acceptedButton]} activeOpacity={0.8}>
            <Image source={require('../../assets/images/like.png')} />
          </TouchableOpacity>
        </View>

        {this.renderScrollView(pages)}
      </View>
    )
  }
}

interface Style {
  container: React.ViewStyle
  slide: React.TextStyle
  instructions: React.TextStyle
}

const s = StyleSheet.create<Style>({
  // Global
  container: {
    width: width,
    height: height,
  },

  // Buttons (like or nah)
  buttons: {
    position: 'absolute',

    zIndex: 20,

    width: width,

    bottom: 80 / px,

    flexDirection: 'row',
    flexWrap: 'wrap',    
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    height: 140 / px,
    width: 140 / px,

    borderRadius: 140 / px,

    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonFirst: {
    marginRight: 60 / px,
  },

  rejectedButton: {
    backgroundColor: 'rgba(198, 198, 198, 0.2)'
  },

  acceptedButton: {
    backgroundColor: '#FF005C',
  },
})
