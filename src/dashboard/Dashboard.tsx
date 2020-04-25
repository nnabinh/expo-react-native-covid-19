import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import { updateTodayData } from './actions';
import { ApplicationState } from '../store';

export function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state: ApplicationState) => state.dashboard.data);
  const updatedAt = useSelector(
    (state: ApplicationState) => state.dashboard.updatedAt
  );

  useEffect(() => {
    dispatch(updateTodayData());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.content}>
          Updated at: {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
        <View style={styles.chart}>
          <BarChart
            data={{
              labels: Object.keys(data).slice(0, 5),
              datasets: [
                {
                  data: Object.values(data)
                    .map((prefecture) => prefecture.length)
                    .slice(0, 5),
                },
              ],
            }}
            width={Dimensions.get('window').width - CHART_PADDING * 2}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(232, 22, 15, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(55, 77, 24, ${opacity})`,
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
          />
        </View>
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
    backgroundColor: 'white',
    paddingTop: 32,
  },
  chart: {
    paddingHorizontal: CHART_PADDING,
  },
});
