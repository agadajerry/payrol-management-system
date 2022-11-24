import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import moment from "moment";
import AppButton from "../components/AppButton";
import AppSelect from "../components/AppSelect";
import Layout from "../components/Layout";
import colors from "../config/colors";
import { monthWord, years } from "../utils/helpers";

function HomePage() {
  const [month, setMonth] = React.useState("");
  const [getyear, setGetYear] = React.useState("");
  const [fileData, setFileData] = useState<null | File>(null);
  const [sendStatsus, setSendStatsus] = useState({
    statusClass: "status",
    statusMsg: "",
  });
  const year = years();

  const uploadFile = (e: any) => {
    const fileSelected = e.target.files ? e.target.files[0] : null;
    if (!fileSelected) return;
    setFileData(fileSelected);
  };

  const formData = new FormData();
  const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (getyear === "" || month === "") {
      alert("Please select month and year");
      return;
    }

    try {
      formData.append("month", month);
      formData.append("year", getyear);
      formData.append("file_path", fileData as File);

      // const result = await axios.post("base_url", formData, {
      //   headers: {
      //     "Accept-Language": "en-US,en;q=0.8",
      //     "Content-Type": `multipart/form-data`,
      //   },
      // });
      setSendStatsus({
        statusClass: "alert alert-success",
        statusMsg: "File uploaded successfully",
      });
      setFileData(null);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const today = new Date();

  return (
    <Layout>
      <div className="container mt-2">
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
                    {fileData?.name.split(".xls" || ".csv" || ".xlsx")[0] ? (
                      <AppButton
                        bg_color={colors.primary}
                        label={"Upload now"}
                        onClick={handleFileUpload}
                      />
                    ) : (
                      <label htmlFor="file_path">
                        <IoCloudUploadOutline size={30} />
                      </label>
                    )}
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
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
