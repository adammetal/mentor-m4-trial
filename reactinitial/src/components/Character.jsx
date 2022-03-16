import { useState } from "react";

const Character = (props) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <button onClick={handleClick}>
        {show ? "Show less" : "Show more"}
      </button>
      {show && <p>{props.details}</p>}
    </div>
  );
};

export default Character;
