import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLink,
  faCircleCheck,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import logo from "../assets/logo.png";
function Dashboard1() {
  const [uid, setuid] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sites, setsites] = useState([]);

  function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [name, encodedValue] = cookie.split("=");

      if (name === cookieName) {
        const decodedValue = decodeURIComponent(encodedValue);

        try {
          // Try to parse the cookie value as JSON
          return JSON.parse(decodedValue);
        } catch (error) {
          // If parsing fails, return the original value
          return decodedValue;
        }
      }
    }

    return null; // Return null if the cookie with the specified name is not found
  }

  const [foundSites, setFoundSites] = useState([...sites]);
  const [updatedSites, setUpdatedSites] = useState([...sites]);
  useEffect(() => {
    setuid(base64_encode(getCookie("yourCookieName")));

    axios
      .get("https://portfoliifybackend-tp8u.onrender.com/user/sites", {
        params: {
          UserID: "cmVobW5zaHNhekBnbWFpbC5jb20=",
        },
      })
      .then((res) => {
        console.log("User data fetched");

        setsites(res.data.sites);
      })
      .catch((e) => {
        console.log("error fetching user data");
      });
  }, []);
  useEffect(() => {
    const resultSites = updatedSites.filter((site) =>
      site.SiteName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFoundSites(resultSites);
  }, [searchValue]);

  async function statusTimer(sitesToSet) {
    for (const site of sitesToSet) {
      setTimeout(() => {
        site.Status = "Deployed";
        setUpdatedSites(
          updatedSites.filter((site) => site.Status == "Deployed"),
          ...sitesToSet
        );
        axios
          .post("http://localhost:3001/user/site", {
            UserID: userID,
            SiteID: site.SiteID,
            Status: "Deployed",
          })
          .then((response) => {
            console.log("Site status updated");
          })
          .catch((error) => {
            console.error("Error during site status update");
          });
      }, 180000);
    }
  }
  statusTimer(updatedSites.filter((site) => site.Status == "Deploying"));
  return (
    <section className="flex flex-col gap-0 h-auto w-[100vw] ">
      <div className=" h-[8vh] max-w-[100vw] xl:max-w-[60vw] xl:mx-[20vw] "></div>

      <div className=" h-[92vh] max-w-[100vw] xl:max-w-[60vw] xl:mx-[20vw]">
        <div className="h-[12vh] flex items-center ">
          <p className="capitalize text-[5vh] px-[1.8vw]">dashboard</p>
        </div>
        <div className="h-[8vh] items-center flex px-[1.8vw] text-gray-600">
          <div className="bg-white h-[5vh] flex items-center w-full rounded-md border-gray-400 justify-between border">
            <div className="w-[3vw] px-4 ">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#686868" }}
              />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[89vw] px-2 focus:outline-0"
              placeholder="Search sites"
            />
            <div className="w-[4vw] px-4  flex items-center justify-center">
              {searchValue.length > 0 && (
                <button onClick={() => setSearchValue("")}>clear</button>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center w-[100vw] xl:w-[60vw] ">
          <table className="w-[99vw] mt-4 ">
            <thead>
              <tr className="text-gray-600 h-[10vh] xl:h-[7vh] uppercase text-center">
                <th className="py-2 px-4 border-b w-2/12">Site Name</th>
                <th className="py-2 px-4 border-b w-1/12">Status</th>
                <th className="py-2 px-4 border-b w-1/12">Template</th>
                <th className="py-2 px-4 border-b w-1/12">Created At</th>
                <th className="py-2 px-4 border-b w-1/12">Source Code</th>
                <th className="py-2 px-4 border-b w-1/12">Live Link</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr
                  key={site.SiteID}
                  className="border-b text-gray-800 text-center h-[10vh] xl:h-[7vh]"
                >
                  <td className="py-2 font-semibold">dadwa</td>
                  <td className="py-2">
                    {site.Status == "Deployed" ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ color: "#63E6BE", marginRight: 5 }}
                        size="sm"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleNotch}
                        spin
                        style={{ marginRight: 5 }}
                        size="sm"
                      />
                    )}
                    {site.Status}
                  </td>
                  <td className="py-2">{site.Template}</td>
                  <td className="py-2">{site.CreatedAt}</td>
                  <td className="py-2">
                    <a
                      href={site.Source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faGithub} size="lg" />
                    </a>
                  </td>
                  <td className="py-2">
                    <a
                      href={site.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faLink} size="lg" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Dashboard1;
