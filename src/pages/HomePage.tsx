import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import moment from "moment";
import AppButton from "../components/AppButton";
import Layout from "../components/Layout";
import colors from "../config/colors";
import { monthWord, years } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { excelFileUpload } from "../redux/appReducerSlice";
import LoadingScreen from "./LoadingScreen";

function HomePage() {
  const [month, setMonth] = React.useState("");
  const [getyear, setGetYear] = React.useState("");
  const [fileData, setFileData] = useState<null | File>(null);
  const [sendStatsus, setSendStatsus] = useState({
    statusClass: "status",
    statusMsg: "",
  });

  const dispatch = useDispatch();
  const { loading, error, success_msg } = useSelector(
    (state: any) => state.appReducer
  );

  console.log(error, loading, success_msg);

  const year = years();

  const uploadFile = (e: any) => {
    const fileSelected = e.target.files ? e.target.files[0] : null;
    if (!fileSelected) return;
    setFileData(fileSelected);
  };

  const formData: any = new FormData();
  const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (getyear === "" || month === "") {
      alert("Please select month and year");
      return;
    }
    formData.append("month", month);
    formData.append("year", getyear);
    formData.append("file_name", fileData as File);

    const formValue = {
      month,
      year: getyear,
      file_name: fileData as File,
    };

    dispatch(excelFileUpload(formValue));
  };

  const today = new Date();

  return (
    <Layout>
      <div className="container mt-2">
      <LoadingScreen loading={loading} />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 upload-container">
            <h3 className="upload-title">
              Upload excel file{" "}
              <span style={{ color: colors.info, fontSize: "12px" }}>
                {moment(today.toISOString()).format("YYYY-MM-DD")}
              </span>
            </h3>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        value={getyear}
                        onChange={(e) => setGetYear(e.target.value)}
                      >
                        <option defaultValue={year[0]}>Select year</option>
                        {year.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="floatingSelect">Select a year</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="monthWord"
                        aria-label="Floating label select example"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <option defaultValue={monthWord[0].index}>
                          Select month
                        </option>
                        {monthWord.map((item, index) => (
                          <option key={index} value={item.index}>
                            {item.month}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="month">Select a month</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="picker-files">
              <div className="picker-box">
                <div className="picker-icon-holder">
                  <div className="">
                    <label htmlFor="file_path">
                      <IoCloudUploadOutline size={30} />
                    </label>
                  </div>
                  <p style={{ display: "none" }}>
                    <input
                      type="file"
                      className="form-control"
                      id="file_path"
                      name="file_path"
                      accept=".xls, .xlsx, .csv"
                      onChange={(e) => uploadFile(e)}
                    />
                  </p>
                </div>
              </div>
            </div>
            <p className={sendStatsus.statusClass}>{sendStatsus.statusMsg}</p>
            <div className="container text-center">
              <p className="text-center mt-2">
                {fileData?.name === undefined
                  ? " No file is picked yet"
                  : fileData?.name.substring(0, 10) + "..."}
              </p>
              {fileData?.name.split(".xls" || ".csv" || ".xlsx")[0] && (
                <AppButton
                  bg_color={colors.primary}
                  label={"Upload now"}
                  onClick={handleFileUpload}
                />
              )}
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
