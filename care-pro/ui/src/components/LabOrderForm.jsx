import { useState } from "react";
import { axios } from "../lib/axios";

const LabOrderForm = () => {
  const [values, setValues] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    labTest: "",
    sampleType: "",
    location: "",
  });

  const [success, setSuccess] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("https://localhost:7252/api/LabOrder", values)
      .then(() => {
        setSuccess(true);
        setValues({
          id: 0,
          firstName: "",
          lastName: "",
          labTest: "",
          sampleType: "",
          location: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {success ? (
        <div className="container">
          <h2>Lab order created</h2>
          <br />
        </div>
      ) : (
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="form">
              <h1>Create Lab order</h1>
              <input
                type="number"
                name="id"
                value={values.id}
                onChange={onChange}
                className="form-control"
                placeholder="id"
              />
              <br />
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={onChange}
                className="form-control"
                placeholder="first name"
              />
              <br />

              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={onChange}
                className="form-control"
                placeholder="last name"
              />

              <br />

              <input
                type="text"
                name="labTest"
                value={values.labTest}
                onChange={onChange}
                className="form-control"
                placeholder="lab test"
              />

              <br />

              <input
                type="text"
                name="sampleType"
                value={values.sampleType}
                onChange={onChange}
                className="form-control"
                placeholder="sample type"
              />

              <br />

              <input
                type="text"
                name="location"
                value={values.location}
                onChange={onChange}
                className="form-control"
                placeholder="location"
              />

              <br />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LabOrderForm;
