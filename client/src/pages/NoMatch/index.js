import React from "react";

function NoMatch() {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        {" "}
        404 PAGE NOT FOUND{" "}
      </h1>
      <h4 style={{ textAlign: "center" }}>
        {" "}
        You may not be logged in! Login <a href="/login">here</a>
      </h4>
    </>
  );
}
export default NoMatch;
