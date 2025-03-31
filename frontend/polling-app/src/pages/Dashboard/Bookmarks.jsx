import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import PollCard from "../../components/PollCards/PollCard";
import BOOKMARK_ICON from "../../assets/images/bookmark.png";
import EmptyCard from "../../components/cards/EmptyCard";
import { UserContext } from "../../context/UserContext";

const PAGE_SIZE = 10;

const Bookmarks = () => {
  useUserAuth();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [bookmarkedPolls, setBookmarkedPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.GET_BOOKMARKED);
      const polls = response.data?.bookmarkedPolls ?? [];

      setBookmarkedPolls(polls); // Directly set without appending to prevent duplicates
    } catch (error) {
      console.log("Something went wrong. Please try again later!", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page changes (pagination)
  useEffect(() => {
    fetchAllPolls();
  }, []);

  return (
    <DashboardLayout activeMenu="BookMarks">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Bookmarked Polls</h2>

        {bookmarkedPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={BOOKMARK_ICON}
            message="You have not bookmarked any polls yet! Start by bookmarking one!"
            btnText="Explore"
            onClick={() => navigate("/dashboard")}
          />
        )}

        {bookmarkedPolls.map((poll) => {
          if (
            !Array.isArray(user?.bookmarkedPolls) ||
            !user.bookmarkedPolls.includes(poll._id)
          )
            return null;

          return (
            <PollCard
              key={`dashboard_${poll._id}`}
              pollId={poll._id}
              question={poll.question}
              type={poll.type}
              options={poll.options}
              voters={poll.voters.length || 0}
              responses={poll.responses || []}
              creatorProfileImg={poll.creator.profileImageUrl || null}
              creatorName={poll.creator.fullname}
              creatorUsername={poll.creator.username}
              userHasVoted={poll.userHasVoted || false}
              isPollClosed={poll.closed || false}
              createdAt={poll.createdAt || false}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default Bookmarks;
