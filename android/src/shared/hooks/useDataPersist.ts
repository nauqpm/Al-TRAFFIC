import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export enum DataPersistKeys {
  USER = 'USER',
}

export function useDataPersist() {
  const setPersistData = useCallback(<T,>(key: DataPersistKeys, data: T): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const jsonData = JSON.stringify(data);
      AsyncStorage.setItem(key, jsonData)
        .then(() => resolve(true))
        .catch(err => reject(err));
    });
  }, []);

  const getPersistData = useCallback(<T,>(key: DataPersistKeys): Promise<T> => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then(res => resolve(res ? JSON.parse(res) : undefined))
        .catch(err => reject(err));
    });
  }, []);

  const removePersistData = useCallback((key: DataPersistKeys): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(key)
        .then(() => resolve(true))
        .catch(err => reject(err));
    });
  }, []);

  const removeAllPersistData = useCallback(async () => {
    return Promise.all(Object.values(DataPersistKeys).map(value => AsyncStorage.removeItem(value)));
  }, []);

  return { setPersistData, getPersistData, removePersistData, removeAllPersistData };
}
