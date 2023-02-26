import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import HistoryOperations from "./layouts/historyOperations";
import Login from "./layouts/login";
import AppLoader from "./components/ui/hoc/appLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./layouts/logOut";
import CreateIncome from "./components/page/createIncome";
import CreateExpenses from "./components/page/createExpenses";
import EditUser from "./components/page/editPage";
import editOperation from "./components/page/editOperation/editOperation";
import ProtectedRoute from "./components/common/protectedRoute";
import User from "./layouts/user";
import editAccount from "./components/page/editAccount";
import UserLoader from "./components/ui/hoc/userLoader";
import CreateAccount from "./components/page/createAccount";

function App() {
    return (
        <>
            <AppLoader>
                <NavBar />
                <div className="container">
                    <Switch>
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <Route
                            path="/user/historyOperations/:operationsId?/edit"
                            component={editOperation}
                        />
                        <UserLoader>
                            <ProtectedRoute>
                                <Route
                                    path="/user/account/:accountId?/edit"
                                    component={editAccount}
                                />
                                <Route
                                    path="/user/historyOperations/:operationsId?"
                                    component={HistoryOperations}
                                />
                                <Route
                                    path="/user/:userId?/createIncome"
                                    component={CreateIncome}
                                />
                                <Route
                                    path="/user/:userId?/createExpenses"
                                    component={CreateExpenses}
                                />
                                <Route
                                    path="/user/:userId?/createAccount"
                                    component={CreateAccount}
                                />
                                <Route
                                    path="/user/:userId?/edit"
                                    component={EditUser}
                                />
                                <Route path="/" exact component={User} />
                            </ProtectedRoute>
                        </UserLoader>
                    </Switch>
                </div>
            </AppLoader>
            <ToastContainer />
        </>
    );
}

export default App;
