import React, { Component, ViewStyle } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window') 

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
      <View style={[s.container, {
        width: width,
        height: height
      }]}>
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
  container: {
    
  },

  slide: {
    
  },

  instructions: {
    
  },
})
