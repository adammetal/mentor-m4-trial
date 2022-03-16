import { useEffect, useState } from "react";
import LoadingMask from "./LoadingMask";

const url = "https://demoapi.com/api/series/newsletter";

const createSubscription = async (email) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return response.json();
};

const Subscription = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (subscribed === true) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [subscribed]);

  const handleEmailChange = (e) => {
    const {
      target: { value },
    } = e;

    if (value.includes("@") && value.includes(".")) {
      setValidEmail(true);
    }

    setEmail(value);
  };

  const handleSubscribe = async () => {
    if (!validEmail) {
      return;
    }

    setLoading(true);

    await createSubscription(email);
    setLoading(false);
    setSubscribed(true);
  };

  if (!show) {
    return null;
  }

  if (subscribed) {
    return <h1>Subscribed</h1>;
  }

  return (
    <div>
      <h1>Subscribe to our newsletter</h1>
      {loading ? (
        <LoadingMask />
      ) : (
        <form onSubmit={handleSubscribe}>
          <input type="email" value={email} onChange={handleEmailChange} />
          <button type="submit" disabled={!validEmail}>
            subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default Subscription;
