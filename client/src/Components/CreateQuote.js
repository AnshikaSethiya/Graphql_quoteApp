import { useMutation } from "@apollo/client";
import { useState } from "react";
import React from "react";
import { CREATE_QUOTE } from "../graphqlOperations/Mutations";


const CreateQuote = () => {
  const [quote, setQuote] = useState("");
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
  });

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

  if (data) {
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    });
  };

  return (
    <div className="container my-container">

      {error && <div className="red card-panel">{error.message}</div>}
      {data && <div className="green card-panel">{data.quote}</div>}

      <form onSubmit={handleSubmit} className="col s12">
        <textarea
          style={{ marginTop: "3rem" }}
          rows={3}
          className="materialize-textarea"
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn green">create</button>
      </form>
    </div>
  );
};

export default CreateQuote;
