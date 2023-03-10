import React from 'react'
import { View, TouchableOpacity, Text, Platform, I18nManager, StyleSheet } from 'react-native'
import ImageLoad from '../RnImagePlaceH'
import { appTextStyle } from '../Theme.style'
import Stars from 'react-native-stars'
import Timer from '../Timer'
import { Icon } from 'native-base'
import Counter from '../CounterTwo'
export default CardOne = ({ props, widthPic, t, s, btnWidth }) => (
  <View
    style={[styles.container, {
      backgroundColor: props.backgroundColor
    }]}>
    {/* /// ///////////////////////////////////////////////////// 2nd */}
    <View
      style={{
        backgroundColor: props.backgroundColor,
        borderRadius: appTextStyle.customRadius - 7

      }}>
      {t.newMethod3(props, t) === 1 ? (
        t.props.recentViewedProducts && props.recent ? (
          <TouchableOpacity
            style={[styles.removeStyle, {
              shadowColor: props.themeStyle.textColor,
              width: btnWidth
            }]}
            onPress={() => t.removeRecent(props, t)}>
            <View
              style={[styles.removeView, {
                backgroundColor: props.backgroundColor,
                width: btnWidth
              }]}>
              <Text
                style={{
                  color: props.themeStyle.textColor,
                  fontSize: appTextStyle.mediumSize,
                  fontWeight: '500',
                  fontFamily: appTextStyle.fontFamily
                }}>
                {t.props.language.Remove}
              </Text>
            </View>
          </TouchableOpacity>
        ) : props.removeButton ? (
          <TouchableOpacity
            style={[styles.removeBtn2, {
              width: btnWidth,
              shadowColor: props.themeStyle.textColor
            }]}
            onPress={() => t.removeWishlist(props, t)}>
            <View
              style={[styles.removebtnView, {
                backgroundColor: props.backgroundColor,
                width: btnWidth
              }]}>
              <Text
                style={{
                  color: props.themeStyle.textColor,
                  fontSize: appTextStyle.mediumSize,
                  fontWeight: '500',
                  fontFamily: appTextStyle.fontFamily
                }}>
                {t.props.language.Remove}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null
      ) : null}
      <View
        style={{
          backgroundColor: props.backgroundColor,
          borderRadius: appTextStyle.customRadius - 7

        }}>
        <TouchableOpacity
          style={{
            flex: 2,
            borderRadius: appTextStyle.customRadius - 7
          }}
          onPress={() =>
            props.navigation.push('ProductDetails', {
              objectArray: props.objectArray //
            })
          }>
          <ImageLoad
            key={props.objectArray.id}
            style={{
              height: widthPic,
              width: widthPic,
              backgroundColor:
                props.backgroundColor,
              borderRadius: appTextStyle.customRadius - 7,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            }}
            source={{ uri: props.objectArray.images[0].src }}>
          </ImageLoad>

          {props.objectArray.on_sale ? (
            <View
              style={[styles.tagsView, {
                backgroundColor: props.themeStyle.primary,
                borderColor: props.themeStyle.primary
              }]}>
              <Text style={{
                color: props.themeStyle.textTintColor,
                fontSize: appTextStyle.smallSize - 2,
                fontFamily: appTextStyle.fontFamily
              }}>
                {t.props.language['On Sale']}
              </Text>
            </View>
          ) : null}
          {props.objectArray.featured ? (
            <View
              style={[styles.tagsView, {
                backgroundColor: props.themeStyle.primary,
                top: !props.objectArray.featured ? 32 : 10,
                borderWidth: 0
              }]}>
              <Text style={{
                color: props.themeStyle.textTintColor,
                fontFamily: appTextStyle.fontFamily,
                fontSize: appTextStyle.smallSize - 2
              }}>
                {t.props.language.Featured}
              </Text>
            </View>
          ) : null}

        </TouchableOpacity>

        <View style={{
          backgroundColor: props.backgroundColor,
          borderRadius: appTextStyle.customRadius - 7

        }}>

          <View style={styles.starView}>
            <Stars
              disabled
              default={parseFloat(props.objectArray.average_rating)}
              count={5}
              starSize={10}
              half
              fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
              emptyStar={
                <Icon
                  name={'star-outline'}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name={'star-half'} style={[styles.myStarStyle]} />
              }
            />

          </View>
          <Text
            style={[styles.titleText, {
              color: props.themeStyle.cardTextColor,
              width: widthPic * 0.8,
              textAlign: 'left',
              paddingLeft: 7,
              paddingTop: props.objectArray.product_type === 'simple' ? 3 : 7
            }]}
            numberOfLines={1}>
            {props.objectArray.name}
          </Text>
          {props.objectArray.product_type === 'simple'
            ? <View style={{ padding: 8, paddingTop: 0 }}>
              <Counter
                minimumValue={1}
                initialValue={t.state.quantityNumber}
                width={30}
                height={3}
                containerWidth={widthPic * 0.6}
                onDecrement={value => {
                  t.quantityMinus(value)
                }
                }
                onIncrement={value => {
                  t.quantityPlus(value)
                }
                }
              />
            </View>
            : null }
          {
            props.objectArray.product_type === 'simple'
              ? props.objectArray.product_price !== undefined ? (
                <View style={{ flexDirection: 'row', paddingLeft: 8 }}>

                  {props.objectArray.product_price > 0
                    ? t.priceFun(
                      appTextStyle.mediumSize,
                      props.objectArray.product_price,
                      'none'
                    )
                    : null}

                  {props.objectArray.product_discount_price > 0
                    ? t.priceFun(
                      appTextStyle.mediumSize,
                      props.objectArray.product_discount_price,
                      'line-through'
                    )
                    : null}

                </View>
              ) : null

              : props.objectArray.product_type === 'variable'
                ? <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 6 }}>

                  {t.priceFun(
                    appTextStyle.mediumSize,
                    props.objectArray.product_combination[0].price,
                    'none'
                  )
                  }
                  <Text style={{
                    paddingRight: 7,
                    color: props.themeStyle.primary,
                    fontFamily: appTextStyle.fontFamily
                  }}>{'-'}</Text>
                  {t.priceFun(
                    appTextStyle.mediumSize,
                    props.objectArray.product_combination[props.objectArray.product_combination.length - 1].price,
                    'none'
                  )
                  }
                </View> : null
          }

        </View>

        {props.removeButton ? (
          <TouchableOpacity
            style={[styles.removeWishlistStyle, {
              shadowColor: props.themeStyle.textColor,
              width: btnWidth
            }]}
            onPress={() => t.removeWishlist(props, t)}>
            <View
              style={[styles.removeWishlistStyle2, {
                width: btnWidth,
                backgroundColor: props.backgroundColor
              }]}>
              <Text
                style={{
                  color: props.themeStyle.textColor,
                  fontSize: appTextStyle.mediumSize,
                  fontWeight: '500',
                  fontFamily: appTextStyle.fontFamily
                }}>
                {t.props.language.Remove}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {t.props.recentViewedProducts && props.recent ? (
          <TouchableOpacity
            style={[styles.recentProductView, {
              shadowColor: props.themeStyle.textColor,
              width: btnWidth
            }]}
            onPress={() => t.removeRecent(props, t)}>
            <View
              style={[styles.removeRecentView, {
                width: btnWidth,
                backgroundColor: props.backgroundColor
              }]}>
              <Text
                style={{
                  color: props.themeStyle.textColor,
                  fontSize: appTextStyle.mediumSize,
                  fontWeight: '500',
                  fontFamily: appTextStyle.fontFamily
                }}>
                {t.props.language.Remove}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
    {t.props.dataName === 'Flash' ? (
      <Timer
        props={t.props}
        widthPic={widthPic}
        t={t}
        text={null}
        objectArray={props.objectArray}
        s={s}
        btnWidth={btnWidth}></Timer>
    ) : null}
  </View>
)

const styles = StyleSheet.create({
  container: {
    margin: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 2,
    paddingBottom: 6,
    borderRadius: appTextStyle.customRadius - 7
  },
  removeStyle: {
    position: 'absolute',
    bottom: 4,
    left: 5
  },
  removeView: {
    alignItems: 'center',
    height: Platform.OS === 'android' ? 30 : 28,
    justifyContent: 'center'
  },
  myStarStyle: {
    color: '#FCA800',
    backgroundColor: 'transparent',
    fontSize: 14
  },
  myEmptyStarStyle: {
    color: '#cccccc'
  },
  removeBtn2: {
    position: 'absolute',
    bottom: 4,
    left: 5
  },
  removebtnView: {
    alignItems: 'center',
    height: Platform.OS === 'android' ? 30 : 28,
    justifyContent: 'center'
  },
  discountView: {
    borderRadius: appTextStyle.customRadius - 4,
    padding: 1,
    height: 27,
    width: 27,
    alignItems: 'center',
    justifyContent: 'center'
  },
  starView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 5,
    paddingBottom: 0
  },
  removeWishlistStyle2: {
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0
  },
  titleText: {
    fontSize: appTextStyle.mediumSize,
    fontFamily: appTextStyle.fontFamily,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    margin: 0,
    padding: 5,
    paddingTop: 3,
    paddingLeft: 5,
    paddingBottom: 6,
    marginBottom: 0,
    fontWeight: '400'
  },
  removeWishlistStyle: {
    margin: 5,
    marginBottom: 3,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  tagsView: {
    zIndex: 6,
    padding: 2,
    paddingHorizontal: 3,
    borderRadius: appTextStyle.customRadius - 15,
    right: 4,
    top: 10,
    position: 'absolute'
  },
  recentProductView: {
    margin: 5,
    marginBottom: 3,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  removeRecentView: {
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0
  }
})
