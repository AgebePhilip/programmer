import React, { PureComponent } from 'react'
import {
  View, FlatList, TouchableOpacity, StyleSheet,
  Dimensions
} from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators'
import { Container, Text } from 'native-base'
import { CardStyleInterpolators } from 'react-navigation-stack'
import Spinner from 'react-native-loading-spinner-overlay'
import RNRestart from 'react-native-restart'
import Button from '../common/Button'
import { connect } from 'react-redux'
import { appTextStyle } from '../common/Theme.style'
import { SET_CURRENCY_ID, getCurrency, SET_CURRENCY, CLEAR_CURRENCY } from '../redux/actions/actions'
import { createSelector } from 'reselect'
const WIDTH = Dimensions.get('window').width

class currencyScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerStyle,
      headerTitleAlign: 'center',
      headerTintColor: iconColor,
      headerStyle: {
        backgroundColor: colorProps,
        elevation: 0,
        borderBottomWidth: 0,
        shadowOpacity: 0
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: appTextStyle.largeSize + 6
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }
  }

  async componentDidMount () {
    this.props.getCurrencyCall()
    this.props.navigation.setParams({
      headerTitle: this.props.language['Select Currency'],
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      currency: {},
      selectedCurrency: this.props.selectedCurrency,
      selectedItem: ''
    }
  }

  /// //////////////////////////////////////////
  updateCurrency (item) {
    this.props.setCurrencyIdFun(item.name,
      item.decimals,
      item.symbol,
      item.position,
      item.code)
    this.props.setSelectedCurrency(item.name)
  }

  render () {
    return this.props.currency.length === 0 ? (
      <View
        style={[styles.container, {
          backgroundColor: this.props.themeStyle.primaryBackgroundColor
        }]}>
        <UIActivityIndicator
          size={27}
          color={this.props.themeStyle.primary}
        />
      </View>
    ) : (
      <Container style={{ backgroundColor: this.props.themeStyle.secondryBackgroundColor }}>
        <View style={{ backgroundColor: this.props.themeStyle.secondryBackgroundColor }}>
          <Spinner visible={this.state.spinnerTemp} />
          <FlatList
            style={{
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
              margin: 10,
              borderRadius: appTextStyle.customRadius - 8
            }} data={this.props.currency}
            horizontal={false}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <View
                style={[styles.listContainer, {
                  borderBottomColor: this.props.themeStyle.secondryBackgroundColor,
                  backgroundColor: this.state.selectedCurrency === item.item.name
                    ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor
                }]}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      selectedCurrency: item.item.name,
                      selectedItem: item.item
                    })
                  }}
                  style={styles.touchableView}>

                  <Text
                    style={[styles.nameStyle, {
                      fontSize: appTextStyle.largeSize,
                      color: this.state.selectedCurrency === item.item.name
                        ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                    }]}>
                    {item.item.name}
                  </Text>

                  <Text
                    style={[styles.nameStyle, {
                      fontSize: appTextStyle.largeSize,
                      color: this.state.selectedCurrency === item.item.name
                        ? this.props.themeStyle.textTintColor : this.props.themeStyle.textColor
                    }]}>
                    {item.item.title
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={{
          position: 'absolute',
          bottom: 15,
          width: WIDTH,
          alignSelf: 'center'
        }}>
          <Button onPress={() => {
            if (this.state.selectedItem !== '') {
              this.setState({ spinnerTemp: true }, () =>
                this.updateCurrency(this.state.selectedItem)
              )
            }
          }}
          borderRadius={true}
          disable={true} themeStyle={this.props.themeStyle}
          navigation={this.props.navigation}
          title={this.props.language.Select}
          ></Button>
        </View>
      </Container>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  getCurrencyCall: () => {
    dispatch(async dispatch => {
      await getCurrency(dispatch)
    })
  },
  setCurrencyIdFun: (value,
    currencyDecimals,
    currencySymbol,
    currencyPos,
    currencyCode) => {
    dispatch({
      type: SET_CURRENCY_ID,
      value: value,
      currencyDecimals: currencyDecimals,
      currencySymbol: currencySymbol,
      currencyPos: currencyPos,
      currencyCode: value
    })
  },
  setSelectedCurrency: (data) => {
    dispatch(dispatch => {
      dispatch({
        type: SET_CURRENCY,
        payload: data
      })
      setTimeout(() => {
        RNRestart.Restart()
      }, 2000)
    })
  }
})
/// ///////////////////////////////////////////////
const getTheme = (state) => state.appConfig.themeStyle
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const getSelectedCurrencyArray = (state) => state.currencyData.selectedCurrency
const getCurrencysArray = (state) => state.currencyData.currency
const getSettings = (state) => state.settingsCall.settings
const getLanguage = (state) => state.appConfig.languageJson
const getSelectedCurrencyArrayFun = createSelector(
  [getSelectedCurrencyArray],
  (getSelectedCurrencyArray) => {
    return getSelectedCurrencyArray
  }
)

const getCurrencysArrayFun = createSelector(
  [getCurrencysArray],
  (getCurrencysArray) => {
    return getCurrencysArray
  }
)
const getSettingsFun = createSelector(
  [getSettings],
  (getSettings) => {
    return getSettings
  }
)
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  currency: getCurrencysArrayFun(state),
  selectedCurrency: getSelectedCurrencyArrayFun(state),
  settings: getSettingsFun(state),
  language: getLanguageFun(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(currencyScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  listContainer: {
    marginTop: 0,
    paddingVertical: 11,
    borderBottomWidth: 1
  },
  touchableView: {
    flexDirection: 'row', alignItems: 'center', padding: 0
  },
  nameStyle: {
    marginHorizontal: 5,
    fontFamily: appTextStyle.fontFamily
  }
})
