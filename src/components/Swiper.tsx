import React, { Component, PropTypes} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window') 

interface State {
  width: number,
  height: number
}

interface SwiperProps {
  style: any
}

type Props = SwiperProps


export default class Swiper extends React.Component<Props, State> {

    renderScrollView = (pages: any) => {
        return (
          <ScrollView ref='scrollView'
            horizontal pagingEnabled>
            {pages}
          </ScrollView>
        )
    }

    render() {
        const props = this.props
        const state = this.state
        const children: any = props.children

        const pageStyle = [{width: width, height: height}, styles.slide]
        const pagesFromChildes = Object.keys(children)


        let pages = pagesFromChildes.map((page, i) => {
           return <View style={pageStyle} key={i}>{children[page]}</View>
        })

        return (
          <View style={[styles.container, {
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

const styles = StyleSheet.create<Style>({
  container: {
    
  },
  slide: {
    
  },
  instructions: {
    
  },
})
