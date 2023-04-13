import { useState } from "react";
import React from "react";

const CreateQuote = () => {
  const [quote, setQuote] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(quote)
}

  return (
    <div className="container my-container">
      <form onSubmit={handleSubmit}>
        <input
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
