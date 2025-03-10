import React from "react";

const Wrapper = (Component) => () => {
  return (
    <div className="content">
      <Component />
    </div>
  );
};

export default Wrapper;
