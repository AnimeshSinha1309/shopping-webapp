/* single place storage of all user data related stuff
so that it gets fetched exactly once every time the page loads */

import { getLoggedInUserName, getCurrentUserObj } from "../utils/getLoggedInUser";
import { USER_TYPE } from "./settings";

const currentUserObj = getCurrentUserObj(),
    currentUser = getLoggedInUserName(),
    currentUserType = currentUserObj ? currentUserObj.usertype : undefined,
    isVendor = currentUserType === USER_TYPE.vendor,
    isCustomer = currentUserType === USER_TYPE.customer;


export {
    currentUser, currentUserObj, currentUserType, isVendor, isCustomer,
};
