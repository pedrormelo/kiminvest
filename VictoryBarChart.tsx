import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';

const data = [
  { month: 'Jan', sales: 20 },
  { month: 'Feb', sales: 45 },
  { month: 'Mar', sales: 28 },
  { month: 'Apr', sales: 80 },
  { month: 'May', sales: 99 },
  { month: 'Jun', sales: 43 },
];

export default function VictoryBarChart() {
  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={350}
        height={250}
        domainPadding={20}
      >
        <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} />
        <VictoryAxis />
        <VictoryBar
          data={data}
          x="month"
          y="sales"
          style={{
            data: { fill: "#2563eb" }
          }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
