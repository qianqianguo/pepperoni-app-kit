import React, {PropTypes, Component} from 'react';
import * as theme from '../../utils/theme';
import Button from '../../components/Button';
import PageIndicator from '../../components/PageIndicator';
import {getRandomLocation} from '../../services/locationService';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  Platform,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

const cities = [
  {name: 'London', image: require('../../../assets/city-images/london.png')},
  {name: 'Berlin', image: require('../../../assets/city-images/berlin.png')},
  {name: 'Helsinki', image: require('../../../assets/city-images/helsinki.png')},
  {name: 'Tampere', image: require('../../../assets/city-images/tampere.png')},
  {name: 'Stockholm', image: require('../../../assets/city-images/stockholm.png')},
  {name: 'Munich', image: require('../../../assets/city-images/munich.png')}
];

class CityView extends Component {
  static displayName = 'CityView';

  static propTypes = {
    office: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    cityStateActions: PropTypes.shape({
	  selectOffice: PropTypes.func.isRequired
    }).isRequired,
    navigationStateActions: PropTypes.shape({
      pushRoute: PropTypes.func.isRequired
    }).isRequired
  };

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(cities)
    };
  }

  selectOffice = () => {
    this.props.cityStateActions.selectOffice(office);
    this.props.navigationStateActions.pushRoute({
      key: 'Location',
      title: place.name,
      place
    });
  };

  renderRow({name, image}, section, index) {
    return (
      <View style={styles.cityCard}>
        <Image
          resizeMode='contain'
          source={image}
          style={styles.image}
        />
        <Text style={[theme.fonts.h1, styles.title]}>
          {name}
        </Text>
        <PageIndicator
          pageCount={cities.length}
          selectedIndex={+index}
          style={styles.pageIndicator}
        />
        <Button
          text="What's for lunch?"
          action={() => this.selectOffice(name)}
          style={styles.actionButton}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.swiper}
          vertical={false}
          alwaysBounceVertical={false}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={true}
          loop={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  swiper: {
    flex: 1
  },
  cityCard: {
    flex: 1,
    overflow: 'hidden',
    width: window.width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  image: {
    ...Platform.select({
      android: {
        marginTop: 10,
        height: 200
      }
    })
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  title: {
    margin: 10
  },
  pageIndicator: {
    margin: 10
  },
  actionButton: {
    marginTop: 20
  }

});

export default CityView;
