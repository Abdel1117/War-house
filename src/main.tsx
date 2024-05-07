import ReactDOM from 'react-dom/client'
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import App from './App.tsx'
import store from "./app/store.ts";
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
            <Provider store={store}>
                  <App />
            </Provider>
      </BrowserRouter>

)
