import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../commons/Layout";
import CustomInputField from "../../customs/CustomInputField";
import PageTitle from "../../customs/PageTitle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomLoader from "../../customs/CustomLoader";
import { createUser } from "../../actions/createUser";
import moment from "moment";
import GeneralModal from "../../customs/GeneralModal";

function CreateUser() {

  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    isError: false,
    message: "",
  });

  const dispatch = useDispatch();

  return (
    <Layout>
      <div className="w-4/5 mt-24 mx-auto">
        <PageTitle title="Create User" />

        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            dateOfBirth: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          // . . .
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setIsLoading(true);
            dispatch(
              createUser({
                firstName: values.firstname,
                lastName: values.lastname,
                email: values.email,
                password: values.password,
                dateOfBirth: values.dateOfBirth,
                phoneNumber: values.phoneNumber,
              })
            )
              .then((response) => {
                if (!response.error) {
                  setResponseMessage({
                    isError: false,
                    message: response.data.message,
                  });
                  resetForm();
                } else {
                  setResponseMessage({
                    isError: true,
                    message: response.data.message,
                  });
                }
              })
              .catch((err) => {
                setResponseMessage({
                  isError: true,
                  message: err?.error ?? "Something went wrong",
                });
                console.log(err);
              })
              .finally(() => {
                setShowInfo(true);
                setIsLoading(false);
                setSubmitting(false);
              });
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstname) {
              errors.firstname = "Required";
            }
            if (!values.lastname) {
              errors.lastname = "Required";
            }
            if (!values.phoneNumber) {
              errors.phoneNumber = "Required";
            } else if (
              !/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4,6})$/i.test(
                values.phoneNumber
              )
            ) {
              errors.phoneNumber = "Invalid phone number";
            }

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (!/\^*[A-Z]/i.test(values.password)) {
              errors.password = "Password should contain an uppercase";
            } else if (!/\^*[a-z]/.test(values.password)) {
              errors.password = "Password should contain a lowercase";
            } else if (!/\^*[0-9]/i.test(values.password)) {
              errors.password = "Password should contain a number";
            } else if (values.password.length < 8) {
              errors.password = "Password should be at least 8 characters";
            }

            if (!values.dateOfBirth) {
              errors.dateOfBirth = "Required";
            }
            if (
              moment(values.dateOfBirth, "DD-MM-YYYY").isAfter(
                moment(new Date())
              )
            ) {
              errors.dateOfBirth = "Date should not be later than today";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            }

            if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Passwords must match";
            }
            return errors;
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomInputField
                label="First name"
                placeholder="Please enter first name"
                type="text"
                name="firstname"
              />

              <CustomInputField
                label="Last name"
                placeholder="Please enter last name"
                type="text"
                name="lastname"
              />
              <CustomInputField
                label="Email"
                placeholder="Please enter email"
                type="email"
                name="email"
              />
              <CustomInputField
                label="Phone number"
                placeholder="Please enter phone number"
                type="text"
                name="phoneNumber"
              />
              <CustomInputField
                label="Date of birth"
                placeholder="Please enter date of birth"
                type="date"
                name="dateOfBirth"
              />
              <CustomInputField
                label="Password"
                placeholder="Please enter password"
                type="password"
                name="password"
              />
              <CustomInputField
                label="Confirm Password"
                placeholder="Please enter confirm password"
                type="password"
                name="confirmPassword"
              />

              <div className="flex w-1/2 justify-between mx-auto">
                <div className="1/4"></div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`py-1 px-2 w-3/4 bg-white-500 text-blue border rounded-sm hover:text-white hover:bg-blue-500`}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Modals */}
      <GeneralModal
        isOpen={showInfo}
        showCloseButton={true}
        onClose={() => setShowInfo(false)}
        widthClass="w-1/4"
      >
        <div className="p-3">
          {!responseMessage?.isError ? (
            <p className="my-4 text-green-400 font-semibold">
              {responseMessage?.message}
            </p>
          ) : Array.isArray(responseMessage.message) ? (
            <>
              {responseMessage.message?.map((message) => {
                return (
                  <>
                    <p className="my-4 text-red-400 font-semibold">
                      {message?.errorMessage}
                    </p>
                  </>
                );
              })}
            </>
          ) : (
            <p className="my-4 text-red-400 font-semibold">
              {responseMessage?.message}
            </p>
          )}
          <button
            className="border py-1 px-2 hover:text-white hover:bg-blue-300 text-blue-300 bg-white"
            onClick={() => setShowInfo(false)}
          >
            OK
          </button>
        </div>
      </GeneralModal>
      <CustomLoader
        isLoading={isLoading}
        message="Creating user"
        transparent={true}
      />
    </Layout>
  );
}

export default CreateUser;
