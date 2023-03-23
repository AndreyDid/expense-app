import React from "react";
import UserLoader from "../components/ui/hoc/userLoader";
import UserPage from "../components/page/userPage/userPage";
const User = () => {
    return (
        <UserLoader>
            <UserPage />
        </UserLoader>
    );
};
export default User;
