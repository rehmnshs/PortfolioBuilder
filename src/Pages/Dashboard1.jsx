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

function Dashboard1({userID}) {
  const [searchValue, setSearchValue] = useState("");
  const sites = [
    {
      SiteName: "mohan",
      Template: "Developer-1",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5174",
      Status: "Deploying...",
      CreatedAt: "17-01-2024",
    },
    {
      SiteName: "krish",
      Template: "Developer-2",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "18-01-2024",
    },
    {
      SiteName: "reh",
      Template: "Developer-3",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "19-01-2024",
    },
    {
      SiteName: "thu",
      Template: "Developer-4",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "20-01-2024",
    },
    {
      SiteName: "meh",
      Template: "Developer-5",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "21-01-2024",
    },
    {
      SiteName: "bruh",
      Template: "Developer-1",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "17-01-2024",
    },
    {
      SiteName: "lee",
      Template: "Developer-2",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "18-01-2024",
    },
    {
      SiteName: "taaa",
      Template: "Developer-3",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "19-01-2024",
    },
    {
      SiteName: "raaa",
      Template: "Developer-4",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "20-01-2024",
    },
    {
      SiteName: "hehe",
      Template: "Developer-5",
      Source: "https://github.com/Portfoliify/Mohan-test-15-Portfolio-1",
      Link: "http://localhost:5173",
      Status: "Deployed",
      CreatedAt: "21-01-2024",
    },
  ];
  const [foundSites, setFoundSites] = useState([...sites]);
  const [updatedSites, setUpdatedSites] = useState([...sites]);
  useEffect(() => {
    axios.get('https://localhost:5173/User/Sites',{
      userID: userID,
    })
    .then(() => {
      console.log("User data fetched")
      //const sites = res
    })
    .catch((e) => {
      console.log("error fetching user data")
    })
  },[])
  useEffect(() => {
    const resultSites = updatedSites.filter((site) =>
      site.SiteName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFoundSites(resultSites);
  }, [searchValue]);

  async function statusPolling(sitesToCheck) {
    const FetchInterval = setInterval(async () => {
      for (const site of sitesToCheck) {
        console.log(site.SiteName);
        try {
          const response = await fetch(site.Link);
          if (response.status == 200) {
            site.Status = "Deployed";
            console.log(sitesToCheck, updatedSites);
            setUpdatedSites(
              updatedSites.filter((site) => site.Status == "Deployed"),
              ...sitesToCheck
            );
            axios
            .post("http://localhost:3001/User/Site", {
              UserID: userID,
              SiteID: site.SiteID,
              Status: "Deployed",
            })
            .then((response) => {
              console.log("Post request successful");
            })
            .catch((error) => {
              console.error("Error during post request:");
            });
            clearInterval(FetchInterval);
            return;
          } else {
            site.Status = "Deploying...";
          }
        } catch (error) {
          console.error("Error checking deployment status:", error);
          site.Status = "Deploying...";
        }
      }
    }, 10000);
  }
  statusPolling(updatedSites.filter((site) => site.Status == "Deploying..."));
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
              {foundSites.map((site) => (
                <tr
                  key={site.SiteName}
                  className="border-b text-gray-800 text-center h-[10vh] xl:h-[7vh]"
                >
                  <td className="py-2 font-semibold">{site.SiteName}</td>
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
