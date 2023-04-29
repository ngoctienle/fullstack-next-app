import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import store from '~/store'

const persistor = persistStore(store)

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      <SessionProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers
