import React, { Component, ViewStyle, TextStyle } from 'react'
import { StyleSheet, Navigator, Image, Text, View, Animated, PanResponder, Dimensions, PixelRatio, TouchableOpacity, AsyncStorage } from 'react-native'
import clamp from 'clamp'
import { usersList, User } from './services/DilemService'
import Profile from './components/Profile'
import fb from './test/profile'

const { width, height } = Dimensions.get('window')
const px = PixelRatio.get()
const SWIPE_THRESHOLD = 120

interface Props {
  navigator: React.NavigatorStatic
}

interface State {
  pan?: any
  enter?: any
  token: string
  person: Array<User>
  currentPerson?: number
}

export default class ProfilesList extends Component<Props, State> {
  state = {
    pan: new Animated.ValueXY(),
    enter: new Animated.Value(0.5),
    person: [],
    token: '',
    currentPerson: 0,
  }

  _goToNextPerson = () => {
    const { person } = this.state

    const newId = this.state.currentPerson + 1

    this.setState({
      person: this.state.person,
      currentPerson: ( newId >= person.length ) ? 0 : newId,
    })
  }

  componentDidMount() {
    this._animateEntrance()
  }

  _animateEntrance = () => {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start()
  }

  componentWillMount() {
    const { pan } = this.state

    AsyncStorage.getItem('user').then(JSON.parse).then(user => {
      usersList(user.token).then(data => {
        console.log('componentWillMount.usersList', data)
        this.setState({
          person: data,
          token: user.token
        } as any)
      })
    })
    
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        pan.setOffset({x: pan.x._value, y: pan.y._value})
        pan.setValue({x: 0, y: 0})
      },

      onPanResponderMove: Animated.event([
        null, {dx: pan.x, dy: pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        pan.flattenOffset()
        let velocity: any

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5)
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1
        }

        if (Math.abs(pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState)
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState = () => {
    this.state.pan.setValue({x: 0, y: 0})
    this.state.enter.setValue(0)
    this._goToNextPerson()
    this._animateEntrance()
  }

  render() {
    console.log('render', this.state)


    const { pan, enter, currentPerson } = this.state

    const [translateX, translateY] = [pan.x, pan.y]

    const rotate = (pan.x as any).interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]})
    const opacity = (pan.x as any).interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    const scale = enter

    const animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity}

    const acceptedScale = (pan.x as any).interpolate({inputRange: [0, 150], outputRange: [0.8, 1], extrapolate: 'clamp'})
    const animatedAcceptedStyles = {transform: [{scale: acceptedScale}]}

    const rejectedScale = (pan.x as any).interpolate({inputRange: [-150, 0], outputRange: [1, 0.8], extrapolate: 'clamp'})
    const animatedRejectedStyles = {transform: [{scale: rejectedScale}]}

    if (this.state.person.length === 0) {
      return <View>
        <Text>No match</Text>
      </View>
    }

    return (
      <View style={s.container}>
        <Animated.View style={animatedCardStyles} {...this._panResponder.panHandlers}>
             <Profile token={this.state.token} data={this.state.person[currentPerson]} />
           </Animated.View>

        <View style={s.buttons}>
          <Animated.View>
            <TouchableOpacity style={[s.button, s.buttonFirst, s.rejectedButton, animatedRejectedStyles]} activeOpacity={0.8}>
              <Image source={require('../assets/images/cross.png')} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View>
            <TouchableOpacity style={[s.button, s.acceptedButton, animatedAcceptedStyles]} activeOpacity={0.8}>
              <Image source={require('../assets/images/like.png')} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    )
  }
}

interface Style {
  container: ViewStyle
  buttons: ViewStyle
  button: ViewStyle
  buttonFirst: ViewStyle
  rejectedButton: ViewStyle
  acceptedButton: ViewStyle
}

const s = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    height: 160 / px,
    width: 160 / px,

    borderRadius: 160 / px,

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
