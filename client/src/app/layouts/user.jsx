import React from "react";
import IncomesCard from "../components/ui/incomesCard";
import AccountsCard from "../components/ui/accountsCard";
import ExpensesCard from "../components/ui/expensesCard";
import UserLoader from "../components/ui/hoc/userLoader";

const UserPage = () => {
    return (
        <UserLoader>
            <div className="container">
                <div>
                    <div className="row gutters-sm justify-content-between">
                        <div className=" col-md-4 mt-4">
                            <IncomesCard />
                        </div>
                        <div className=" col-md-4 mt-4">
                            <AccountsCard />
                        </div>
                        <div className="col-md-4 mt-4">
                            <ExpensesCard />
                        </div>
                    </div>
                </div>
            </div>
        </UserLoader>
    );
};
export default UserPage;
