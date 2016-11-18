import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'

const SCREEN_WIDTH = Dimensions.get('window').width

const colors = ['#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F']
const animations = ['fadeIn', 'shake', 'rubberBand', 'zoomOut']

class LocationSearchHeader extends Component {
  state = {
    text: '',
    expanded: false,
    animation: animations[0],
    top: 90,
    left: 25,
    width: SCREEN_WIDTH - 45,
    backgroundColor: 'green',
    height: 60,
    paddingTop: 0,
  }

  submitDestinationSearch = () => {
    const { onSubmitEditing } = this.props
    const { text } = this.state

    if (!text) return // Don't submit if empty

    onSubmitEditing(text)
    this.setState({text: ''})
  }

  nextAnimation = () => {
    const { animation } = this.state
    const nextIndex = (animations.indexOf(animation) + 1) % animations.length

    this.setState({animation: animations[nextIndex]})
  }

  render() {
    const { placeholder } = this.props
    const { text, expanded, animation } = this.state

    if(expanded == false) {
      return(
        <TouchableOpacity
          onPress={() => this.setState({
            top: (this.state.top) - 90,
            left: (this.state.left) - 25,
            width: (this.state.width) + 45,
            backgroundColor: 'red',
            height: 150,
            expanded: true,
            paddingTop: 50,
            })}>
          <Animatable.View
            transition={["top", "left", "width", "backgroundColor", "height", "paddingTop"]}
            style={
              [styles.singleSearchView,
                {
                  top: this.state.top,
                  left: this.state.left,
                  width: this.state.width,
                  backgroundColor: this.state.backgroundColor,
                  height: this.state.height,
                  paddingTop: this.state.paddingTop,
                }
              ]}>
            <View style={styles.singleSearchInnerView}>
              <View style={styles.blackBoxView}>
                <View style={styles.blackBox}></View>
              </View>
              <TextInput
                style={styles.destinationPlaceholder}
                placeholder={placeholder}
                value={text}
                onChangeText={(text) => this.setState({text})}
                onSubmitEditing={this.submitDestinationSearch}/>
            </View>
          </Animatable.View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.setState({
            top: (this.state.top) + 90,
            left: (this.state.left) + 25,
            width: (this.state.width) - 45,
            backgroundColor: 'green',
            height: 60,
            expanded: false,
            paddingTop: 0,
            })}>
          <Animatable.View
            transition={["top", "left", "width", "backgroundColor", "height", "paddingTop"]}
            style={
              [styles.singleSearchView,
                {
                  top: this.state.top,
                  left: this.state.left,
                  width: this.state.width,
                  backgroundColor: this.state.backgroundColor,
                  height: this.state.height,
                  paddingTop: this.state.paddingTop,
                }
              ]}>
            <View style={styles.singleSearchInnerView}>
              <View style={styles.blackBoxView}>
                <View style={styles.blackBox}></View>
              </View>
              <TextInput
                style={styles.destinationPlaceholder}
                placeholder="My Location"
                value={text}
                onChangeText={(text) => this.setState({text})}
                onSubmitEditing={this.submitDestinationSearch}/>
            </View>
            <View style={styles.singleSearchInnerView}>
              <View style={styles.blackBoxView}>
                <View style={styles.blackBox}></View>
              </View>
              <TextInput
                style={styles.destinationPlaceholder}
                placeholder="Where to?"
                value={text}
                onChangeText={(text) => this.setState({text})}
                onSubmitEditing={this.submitDestinationSearch}/>
            </View>
          </Animatable.View>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  singleSearchView: {
    position: 'absolute',
    top: 90,
    left: 25,
    width: SCREEN_WIDTH - 45,
    backgroundColor: 'green',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  singleSearchInnerView: {
    flexDirection: 'row',
    height: 50,
  },
  blackBoxView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  blackBox: {
    height: 7,
    width: 7,
    backgroundColor: 'black',
  },
  destinationPlaceholder: {
    fontSize: 22,
    flex: 10,
  }
})

export default connect()(LocationSearchHeader)
