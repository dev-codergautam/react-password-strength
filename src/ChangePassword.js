import React, { useState } from "react";

const ChangePassword = () => {
  const [strengthProgress, setStrengthProgress] = useState("");
  const [strengthColor, setStrengthColor] = useState("danger");
  const [strength, setStrength] = useState("");
  const [validationCheck, setValidationCheck] = useState(null);

  let passwordInstructions = [
    {
      isChecked: validationCheck?.length ? true : false,
      instructions: "New password must contain atleast 8 character.",
    },
    {
      isChecked: validationCheck?.hasUpperCase ? true : false,
      instructions: "New password must contain atleast 1 capital letter.",
    },
    {
      isChecked: validationCheck?.hasLowerCase ? true : false,
      instructions: "New password must contain atleast 1 small letter.",
    },
    {
      isChecked: validationCheck?.hasDigit ? true : false,
      instructions: "New password must contain atleast 1 number.",
    },
    {
      isChecked: validationCheck?.hasSpecialChar ? true : false,
      instructions: "New password must contain atleast 1 special character.",
    },
  ];

  const checkPasswordStrength = (passwordValue) => {
    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthChecks.length = passwordValue.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    setValidationCheck(strengthChecks);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);

    let strength =
      verifiedList.length === 5
        ? "Strong"
        : verifiedList.length >= 3
        ? "Medium"
        : "Weak";
    setStrength(strength);

    setStrengthColor(
      verifiedList.length === 5
        ? "success"
        : verifiedList.length >= 3
        ? "warning"
        : "danger"
    );

    setStrengthProgress(`${(verifiedList.length / 5) * 100}`);
  };

  const cancelPasswordUpdate = () => {
    setStrengthProgress("");
    setStrengthColor("#f8222f");
    setValidationCheck(null);
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="row flex-row-reverse">
                <div className="col-md-7 col-12 mb-3">
                  <h6 className="mt-3">Instructions:</h6>
                  <ul style={{ listStyle: "none" }} className="text-left">
                    {Array.isArray(passwordInstructions) &&
                      passwordInstructions.length > 0 &&
                      passwordInstructions.map((item, index) => (
                        <li className="pb-2" key={index}>
                          {item.isChecked ? (
                            <i className="fas fa-check-circle text-success mr-2"></i>
                          ) : (
                            <i className="fas fa-times-circle text-danger mr-2"></i>
                          )}
                          {item.instructions}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="col-md-5 col-12  mb-3">
                  <form>
                    <div className="form-group">
                      <label htmlFor="password">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="form-control"
                        onChange={(e) => {
                          checkPasswordStrength(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      {parseInt(strengthProgress) > 0 && (
                        <div className="row no-gutters">
                          <div className="col-10 pb-3">
                            <div className="progress">
                              <div
                                className={`progress-bar bg-${strengthColor}`}
                                role="progressbar"
                                style={{ width: `${strengthProgress}%` }}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                          <div className="col-lg-2">{strength}</div>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <div className="col-12 d-flex justify-content-end">
                        <button
                          className="btn btn-secondary mr-2"
                          onClick={cancelPasswordUpdate}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary"
                          disabled={strengthProgress !== "100" ? true : false}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePassword;
