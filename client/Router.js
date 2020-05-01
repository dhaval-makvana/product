import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
const ListingPage = lazy(() => import('./pages/listingPage'));
const DetailsPage = lazy(() => import('./pages/detailsPage'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<div>...loading</div>}>
          <Route exact path='/' component={ListingPage} />
          <Route exact path='/product/:id' component={DetailsPage} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
