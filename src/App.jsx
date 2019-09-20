import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import FullScreenLoading from './components/FullScreenLoading';
import Layout from './pages/base/Layout';
import Routes from './Routes';
import * as accountSelectors from './services/account/selectors';
import { initializeSentry } from './utils/sentry';
import { initializeTabKeyFocus, registerMouseDownEvent, registerTabKeyUpEvent } from './utils/tabFocus';

const Login = React.lazy(() => import('./pages/login'));

function App(props) {
  const { needLogin } = props;

  React.useEffect(() => {
    initializeTabKeyFocus();
    initializeSentry();
    const body = document.querySelector('body');
    const disposeBag = [];
    disposeBag.push(registerTabKeyUpEvent(body));
    disposeBag.push(registerMouseDownEvent(body));
    return () => {
      disposeBag.forEach(callback => {
        callback();
      });
    };
  }, []);

  const routes = needLogin ? <Route component={Login} /> : <Route component={Routes} />;

  return (
    <ErrorBoundary>
      <Layout>
        <React.Suspense fallback={<FullScreenLoading />}>{routes}</React.Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

function mapStateToProps(state) {
  return {
    needLogin: accountSelectors.getNeedLogin(state),
  };
}

export default connect(mapStateToProps)(App);
