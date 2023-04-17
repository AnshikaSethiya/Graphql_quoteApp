import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_QUOTES } from "../graphqlOperations/Queries";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) {
    return (
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue spinner">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log(error.message);
  }

  if(data && data.quotes.length == 0){
    return <h3 className="center-align">No Quotes Available</h3>
  }

  // console.log(data)

  return (
    <div className="container">
      {data && data.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
            <Link to={`/profile/${quote.by._id}`}><p className="right-align">~{quote.by.firstName}</p></Link>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Home;
