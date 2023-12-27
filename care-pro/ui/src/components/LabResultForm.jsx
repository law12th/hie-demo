import { useState, useEffect } from "react";

const LabResultForm = () => {
  const [labResults, setLabResults] = useState({
    Results: 0,
  });
  const [webSocketReady, setWebSocketReady] = useState(false);
  const [websocket] = useState(new WebSocket("wss://localhost:7252/ws"));

  useEffect(() => {
    websocket.onopen = () => {
      console.log("websocket connected");
      setWebSocketReady(true);
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      const updatedLabResult = {
        ...labResults,
        Results: message.Results,
      };

      setLabResults(updatedLabResult);
    };

    websocket.onerror = () => {
      console.log("websocket failed to connect");
      setWebSocketReady(false);
    };

    websocket.onclose = () => {
      console.log("websocket closed");
    };
  }, [labResults, websocket]);

  return (
    <>
      {webSocketReady ? (
        <div className="container">
          <h1>Lab Results</h1>
          <input
            type="number"
            disabled
            name="results"
            value={labResults.Results}
            className="form-control"
            placeholder="results"
          />
          <br />
        </div>
      ) : (
        <h1>could not connect to server retrying...</h1>
      )}
    </>
  );
};

export default LabResultForm;
