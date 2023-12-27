import { useEffect, useState } from "react";

const LabOrderForm = () => {
  const [labOrders, setLabOrders] = useState({
    FirstName: "",
    Id: 0,
    LabTest: "",
    LastName: "",
    Location: "",
    SampleType: "",
  });
  const [webSocketReady, setWebSocketReady] = useState(false);
  const [websocket] = useState(new WebSocket("wss://localhost:7095/ws"));

  useEffect(() => {
    websocket.onopen = () => {
      console.log("websocket connected");
      setWebSocketReady(true);
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      const updateLabOrder = {
        ...labOrders,
        FirstName: message.FirstName,
        Id: message.Id,
        LabTest: message.LabTest,
        LastName: message.LastName,
        Location: message.Location,
        SampleType: message.SampleType,
      };

      setLabOrders(updateLabOrder);
    };

    websocket.onerror = () => {
      console.log("websocket failed to connect");
      setWebSocketReady(false);
    };

    websocket.onclose = () => {
      console.log("websocket closed");
    };
  }, [labOrders, websocket]);

  return (
    <>
      {webSocketReady ? (
        <div className="container">
          <div className="form">
            <h1>Lab orders</h1>
            <input
              type="text"
              name="firstName"
              disabled
              value={labOrders.FirstName}
              className="form-control"
              placeholder="first name"
            />
            <br />

            <input
              type="text"
              name="lastName"
              disabled
              value={labOrders.LastName}
              className="form-control"
              placeholder="last name"
            />

            <br />

            <input
              type="text"
              name="labTest"
              value={labOrders.LabTest}
              disabled
              className="form-control"
              placeholder="lab test"
            />

            <br />

            <input
              type="text"
              name="sampleType"
              value={labOrders.SampleType}
              className="form-control"
              disabled
              placeholder="sample type"
            />

            <br />

            <input
              type="text"
              name="location"
              value={labOrders.Location}
              disabled
              className="form-control"
              placeholder="location"
            />

            <br />
          </div>
          <br />
        </div>
      ) : (
        <h1>could not connect to server retrying...</h1>
      )}
    </>
  );
};

export default LabOrderForm;
