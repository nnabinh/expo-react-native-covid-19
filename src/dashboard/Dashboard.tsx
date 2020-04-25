import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import chunk from 'lodash/chunk';
import { updateTodayData } from './actions';
import { ApplicationState } from '../store';

const chartConfig = {
  backgroundGradientFrom: '#252A3B',
  backgroundGradientTo: '#252A3B',
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(109, 218, 204, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '1',
    strokeWidth: '1',
    stroke: '#ffa726',
  },
};

export function Dashboard() {
  const dispatch = useDispatch();
  const prefectures = useSelector(
    (state: ApplicationState) => state.dashboard.prefectures
  );
  const dailyCases = useSelector(
    (state: ApplicationState) => state.dashboard.dailyCases
  );
  const updatedAt = useSelector(
    (state: ApplicationState) => state.dashboard.updatedAt
  );

  useEffect(() => {
    dispatch(updateTodayData());
  }, []);

  const sortedData = orderBy(
    prefectures,
    (prefecture) => prefecture.value,
    'desc'
  );
  const chunkData = chunk(sortedData, 5);
  const lastIncreaseAmount =
    dailyCases[dailyCases.length - 1].value -
    dailyCases[dailyCases.length - 2].value;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.time}>
          ({moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')})
        </Text>
        <ScrollView>
          <Text style={styles.header}>
            Daily cases in Japan
            <Text
              style={{
                paddingLeft: 20,
                paddingHorizontal: 32,
                width: '100%',
                textAlign: 'right',
                justifyContent: 'flex-end',
              }}
            >
              {' '}
              (+{lastIncreaseAmount})
            </Text>
          </Text>

          {!!dailyCases && (
            <View style={styles.chart}>
              <LineChart
                data={{
                  labels: [
                    moment(dailyCases[0].date).format('YYYY-MM-DD'),
                    moment(
                      dailyCases[Math.round((dailyCases.length * 2) / 4)].date
                    ).format('YYYY-MM-DD'),
                    moment(
                      dailyCases[Math.round((dailyCases.length * 3) / 4)].date
                    ).format('YYYY-MM-DD'),
                    moment(dailyCases.slice(-1)[0].date).format('YYYY-MM-DD'),
                  ],
                  datasets: [
                    {
                      data: dailyCases.map((item) => item.value),
                    },
                  ],
                }}
                width={Dimensions.get('window').width - CHART_PADDING * 2} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                verticalLabelRotation={5}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                fromZero
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          )}
          <Text style={styles.header}>By prefectures</Text>
          {!!prefectures.length && (
            <FlatList
              data={chunkData}
              renderItem={({ item }) => (
                <View style={styles.chart}>
                  <BarChart
                    data={{
                      labels: item.map((prefecture) => prefecture.en),
                      datasets: [
                        {
                          data: item.map((prefecture) => prefecture.value),
                        },
                        {
                          data: item.map((prefecture) => prefecture.value),
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width - CHART_PADDING * 2}
                    height={220}
                    chartConfig={chartConfig}
                    yAxisLabel=""
                    yAxisSuffix=""
                    fromZero
                    showBarTops
                  />
                </View>
              )}
              keyExtractor={(item) => item[0].en}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const CHART_PADDING = 16;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#252A3B',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingLeft: 32,
    color: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 32,
    color: 'grey',
    marginBottom: 25,
  },
  time: {
    fontSize: 16,
    color: 'white',
    marginTop: 12,
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  container: {
    flex: 1,
    backgroundColor: '#252A3B',
    paddingTop: 32,
  },
  chart: {
    paddingHorizontal: CHART_PADDING,
  },
});
