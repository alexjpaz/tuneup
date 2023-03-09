import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const VowelChart = () => (
  <Card>
    <Card.Cover source={require('./assets/vowels.jpeg')} resizeMode={`contain`} />
  </Card>
);

export default VowelChart;