import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import AsyncStorage from '@react-native-community/async-storage'

const persistConfig = {
    key: 'root',
    storage,
    // blacklist : ['form','chat']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer, applyMiddleware(thunk, Logger)
)

export const persistor = persistStore(store)
