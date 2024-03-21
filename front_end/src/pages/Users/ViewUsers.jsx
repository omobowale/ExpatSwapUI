import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/getUsers";
import Layout from "../../commons/Layout";
import { PAGE_SIZE_OPTIONS } from "../../constants/texts";
import CustomPageSizeOptions from "../../customs/CustomPageSizeOptions";
import PageTitle from "../../customs/PageTitle";
import Pagination from "../../customs/Pagination";
import UserTableHeader from "../../customs/UserTableHeader";
import moment from "moment";

import DatePicker from "react-datepicker";
import GeneralModal from "../../customs/GeneralModal";
import CustomLoader from "../../customs/CustomLoader";
import { GENERIC_ERROR } from "../../constants/errors";

const tableHeaders = [
  "S/N",
  "First Name",
  "Last Name",
  "Email",
  "Date Of Birth",
  "Phone Number",
];

function ViewUsers() {
  const dispatch = useDispatch();

  const format = "DD-MM-YYYY";
  const requestFormat = "MM-DD-YYYY";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const [updated, setUpdated] = useState(0);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [showInfo, setShowInfo] = useState(false);

  const [responseMessage, setResponseMessage] = useState({
    isError: false,
    message: "",
  });

  const { usersData } = useSelector((state) => state.getUsers);

  console.log("users", usersData);

  const clearRecords = () => {
    setStartDate("");
    setEndDate("");
    setUpdated((prev) => ++prev);
  };

  const fetchRecords = () => {
    setIsLoading(true);
    let filterParams = `pageSize=${pageSize}&pageNumber=${currentPage}`;
    if (startDate) {
      filterParams += `&startDate=${moment(startDate)
        .format(requestFormat)
        .toString()}`;
    }
    if (endDate) {
      filterParams += `&endDate=${moment(endDate)
        .format(requestFormat)
        .toString()}`;
    }

    console.log("filterParams", filterParams);

    dispatch(getUsers(filterParams))
      .then((response) => {
        console.log("response here", response);
        if (response.error) {
          setResponseMessage({
            isError: true,
            message: response.error ?? GENERIC_ERROR,
          });
        }
      })
      .catch((err) => {
        setResponseMessage({
          isError: true,
          message: err.error ?? GENERIC_ERROR,
        });
      })
      .finally(() => {
        setShowInfo();
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRecords();
  }, [pageSize, currentPage, updated]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  return (
    <Layout>
      <div className="mt-24"></div>
      {/* Page title */}
      <PageTitle title="View Users" />
      {/* Table goes here */}
      <div className="flex gap-2 w-4/5 items-center mx-auto mb-1 justify-end">
        <label>Filter:</label>
        <DatePicker
          selectsStart
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          className="border py-1 px-2 mr-2"
          placeholderText="From"
          maxDate={new Date()}
        />
        <DatePicker
          selectsEnd
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          endDate={endDate}
          startDate={startDate}
          minDate={startDate}
          className="border py-1 px-2"
          placeholderText="To"
          maxDate={new Date()}
        />
        <button
          onClick={fetchRecords}
          className="border px-3 py-1 hover:bg-blue-600 hover:text-white text-blue-600 bg-white"
        >
          Filter
        </button>
        <button
          onClick={clearRecords}
          className="border px-3 py-1 hover:bg-gray-600 hover:text-white text-gray-600 bg-white"
        >
          Clear
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 mx-auto ">
        <table class="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <UserTableHeader headers={tableHeaders} />
          <tbody className="text-xs">
            {usersData &&
              usersData[0].users?.map((user, index) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td class="px-6 py-4">{user.firstName}</td>
                    <td class="px-6 py-4">{user.lastName}</td>
                    <td class="px-6 py-4">{user.email}</td>
                    <td class="px-6 py-4">
                      {moment(user.dateOfBirth).format(format)}
                    </td>
                    <td class="px-6 py-4">{user.phoneNumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {usersData && !usersData[0]?.metaData[0] && (
          <p className="my-5 font-semibold text-orange-500">No records found</p>
        )}

        {usersData && usersData[0]?.metaData[0] && (
          <CustomPageSizeOptions
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        )}

        {usersData && (
          <Pagination
            className="pagination-bar mb-4"
            currentPage={currentPage}
            totalCount={
              usersData ? usersData[0]?.metaData[0]?.totalRecords ?? 0 : 0
            }
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* Modal */}
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
        message="Fetching users"
        transparent={true}
      />
    </Layout>
  );
}

export default ViewUsers;
