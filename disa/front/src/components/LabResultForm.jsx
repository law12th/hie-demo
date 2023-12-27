import { useState } from "react";
import { axios } from "../lib/axios";

const LabResultForm = () => {
  const [values, setValues] = useState({
    id: 0,
    results: 0,
  });

  const [success, setSuccess] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("https://localhost:7095/api/LabResult", values)
      .then(() => {
        setSuccess(true);
        setValues({
          id: 0,
          results: 0,
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
          <h2>Lab results sent</h2>
          <br />
        </div>
      ) : (
        <div className="container">
          <form onSubmit={onSubmit}>
            <h1>Send Lab Results</h1>
            <input
              type="number"
              name="id"
              onChange={onChange}
              value={values.id}
              className="form-control"
              placeholder="id"
            />
            <br />
            <input
              type="number"
              name="results"
              onChange={onChange}
              value={values.results}
              className="form-control"
              placeholder="results"
            />
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

export default LabResultForm;
