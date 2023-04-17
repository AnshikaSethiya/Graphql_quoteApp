import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_PROFILE } from "../graphqlOperations/Queries";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate()
  const { loading, error, data } = useQuery(GET_MY_PROFILE);


  if(!localStorage.getItem("token")){
    navigate("/login")
    return <h1>unauthorized</h1>
}
console.log("profile data: ", data)

  if (loading) {
    return (
      <div className="preloader-wrapper big active my-container">
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
    console.log(error);
  }

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.user.quotes.map((quo) => {
        return (
          <blockquote>
            <h6>{quo.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Profile;
