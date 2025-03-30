import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import PollCard from "../../components/PollCards/PollCard";
import InfiniteScroll from "react-infinite-scroll-component";
import CREATE_ICON from "../../assets/images/create.png";
import EmptyCard from "../../components/cards/EmptyCard";

const PAGE_SIZE = 10;

const Bookmarks = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [bookmarkedPolls, setBookmarkedPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.GET_BOOKMARKED);

      // Debugging
      // console.log("API Response:", response.data); 
      
      const polls = response.data?.bookmarkedPolls ?? []; // Ensure it defaults to an empty array

      if (polls.length > 0) {
        setBookmarkedPolls((prevPolls) => [...prevPolls, ...polls]);
        setHasMore(polls.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again later!", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePolls = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Fetch data when page changes (pagination)
  useEffect(() => {
    fetchAllPolls();
  }, [page]);

  return (
    <DashboardLayout activeMenu="BookMarks">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Bookmarked Polls</h2>

        {bookmarkedPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={CREATE_ICON}
            message="You have not voted on any polls yet! Start exploring and share your opinion by voting on Polls now!"
            btnText="Explore"
            onClick={() => navigate("/dashboard")}
          />
        )}

        {/*infinite scroll pagination*/}
        <InfiniteScroll
          dataLength={bookmarkedPolls.length}
          next={loadMorePolls}
          hasMore={hasMore}
          loader={<h4 className="info-text">Loading...</h4>}
          endMessgae={<p className="info-text">No more polls to display.</p>}
        >
          {bookmarkedPolls.map((poll) => (
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
          ))}
        </InfiniteScroll>
      </div>
    </DashboardLayout>
  );
};

export default Bookmarks;
