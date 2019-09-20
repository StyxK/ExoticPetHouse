import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Logger from 'redux-logger'
import { persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducer'


const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = createStore(
    persistedReducer,applyMiddleware(thunk,Logger)
)

export const persistor = persistStore(store)
