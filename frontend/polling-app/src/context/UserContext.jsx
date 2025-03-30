import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, SetUser] = useState(null);

  //update user data
  const updateUser = (userData) => {
    SetUser(userData);
  };

  //clear user data
  const clearUser = () => {
    SetUser(null);
  };

  //update user stats
  const updateUserStats = (key, value) => {
    SetUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //update totalPollsVotes count locally
  const onUserVoted = () => {
    const totalPollsVotes = user.totalPollsVotes || 0;
    updateUserStats("totalPollsVotes", totalPollsVotes + 1);
  };

  //update totalPollsCreated count locally
  const onPollCreateorDelete = (type = "create") => {
    const totalPollsCreated = user.totalPollsCreated || 0;
    updateUserStats(
      "totalPollsCreated",
      type == "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
    );
  };

  const toggleBookmarkId = (id) => {
    const bookmarks = user.bookmarkedPolls || [];
    const index = bookmarks.indexOf(id);

    if (index === -1) {
      //add the id of user if not in the array
      SetUser((prev) => ({
        ...prev,
        bookmarkedPolls: [...bookmarks, id],
        totalPollsBookmarked: prev.totalPollsBookmarked + 1,
      }));
    } else {
      //remove the id if already exists
      SetUser((prev) => ({
        ...prev,
        bookmarkedPolls: bookmarks.filter((item) => item !== id),
        totalPollsBookmarked: prev.totalPollsBookmarked - 1,
      }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        onUserVoted,
        toggleBookmarkId,
        onPollCreateorDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
