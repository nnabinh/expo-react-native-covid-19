import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import chunk from 'lodash/chunk';
import { updateTodayData } from './actions';
import { ApplicationState } from '../store';

export function Dashboard() {
  const dispatch = useDispatch();
  const prefectures = useSelector(
    (state: ApplicationState) => state.dashboard.prefectures
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#252A3B' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.content}>
          Updated at: {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
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
                  chartConfig={{
                    backgroundGradientFrom: '#252A3B',
                    backgroundGradientTo: '#252A3B',
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(109, 218, 204, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  yAxisLabel=""
                  yAxisSuffix=""
                  fromZero
                />
              </View>
            )}
            keyExtractor={(item) => item[0].en}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const CHART_PADDING = 16;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 32,
    color: 'white',
  },
  content: {
    fontSize: 16,
    paddingHorizontal: 32,
    marginTop: 12,
    marginBottom: 25,
    color: 'grey',
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
