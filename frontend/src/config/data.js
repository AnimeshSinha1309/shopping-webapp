/* single place storage of all user data related stuff
so that it gets fetched exactly once every time the page loads */

import { getLoggedInUserName, getCurrentUserObj } from "../utils/getLoggedInUser";

const currentUserObj = getCurrentUserObj(),
    currentUser = getLoggedInUserName();


export { currentUser, currentUserObj };
