import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTodayData } from './actions';

export function Dashboard() {
  const dispatch = useDispatch();
  dispatch(updateTodayData());

  return (<View />);
}