import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store'; // Adjust the path based on your file structure
import { ToastContainer } from 'react-toastify';
import PageRoute from './PageRoute';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <PageRoute />
    </Provider>
  // </React.StrictMode>,
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
