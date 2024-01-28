import React from "react";
import './d1.css';
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const repeatTimes = 9 * 9;
  const gridItems = [];
  const notOutlined = new Set([
    9, 18, 19, 27, 28, 36, 37, 38, 45, 46, 47, 54, 55, 63,
  ]);

  for (let i = 0; i < repeatTimes; i++) {
    gridItems.push(
      <div
        className={`${
          !notOutlined.has(i) && "outline"
        } outline-[#272727] outline-1 overflow-hidden `}
      >
        <div
          onMouseOver={(e) => {
            if(!notOutlined.has(i)){
              e.target.style.backgroundColor = "rgb(168 85 247)";
            setTimeout(() => {
              e.target.style.backgroundColor = "transparent";
            }, 1000);
            }
            
          }}
          className={`h-full w-full ${
            notOutlined.has(i) && ""
          } duration-[1000ms] slider relative top-0 left-0`}
        ></div>
      </div>
    );
  }
  return (
    <section className="bg-black text-white h-[100vh] w-[100vw]  overflow-hidden">
      <div className=" h-[8vh] w-[100vw] " >

<div className="headerLanding">
          <div className="headerContentsL">
          <div className="padL">
 
          </div>
            <div id="templatebutton" onClick={()=>{navigate('templates')}}>View Templates</div>
          </div>{" "}
      
          
</div>
      </div>
      <div className="h-[92vh] w-[100vw] flex ">
        <div className="w-[50vw] h-[92vh] flex items-center overflow-visible">
          <div className="ml-[3vw]">
            <p className="text-[5.5vw] font-normal flex flex-col mb-[6vh] text-nowrap leading-none">
              <span>Build with the power </span>
              <span>of code without </span>
              <span>writing any</span>
            </p>
            <p className="text-[1.4vw] text-nowrap z-10 font-light mb-[6vh] flex flex-col leading-1">
              <span>
                Take control of HTML, CSS, and JavaScript in a visual canvas.{" "}
              </span>
              <span>
                Portfoliify generates clean, semantic code that’s ready to
                publish or hand to developers
              </span>
            </p>
            <div>
              <div className="bg-white w-[20vw] h-[10vh] text-black flex justify-center items-center text-[2vw]" id='stbuild' onClick={()=>{navigate('templates')}}>
                Start Building
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50vw] h-[91vh]  grid grid-cols-9 grid-rows-9 ">
          {gridItems}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;