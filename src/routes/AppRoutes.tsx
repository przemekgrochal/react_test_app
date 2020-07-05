import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import TopBar from "../screens/_shared/TopBar";
import TopBar from "../layouts/TopBar";
import UsersList from "../components/UsersList";
import UsersEdit from "../components/UsersEdit";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Footer from "../layouts/Footer";

export default function AppRoutes() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={(props: any) => (
                            <>
                                <TopBar />
                                <UsersList {...props} />
                                <Footer />
                            </>
                        )}
                    />

                    <Route
                        exact
                        path="/user"
                        component={(props: any) => (
                            <>
                                <TopBar />
                                <UsersEdit {...props} />
                                <Footer />
                            </>
                        )}
                    />

                    <Route
                        exact
                        path="/user/:id"
                        component={(props: any) => (
                            <>
                                <TopBar />
                                <UsersEdit {...props} />
                                <Footer />
                            </>
                        )}
                    />

                    <Route>
                        <ErrorPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
