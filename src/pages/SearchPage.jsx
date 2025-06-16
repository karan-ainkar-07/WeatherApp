import { useSelector, useDispatch } from "react-redux";
import { addSearchItem } from "../Slices/searchList";
import {  useState } from "react";
import getWeatherAPIData from "../Functions/ApiFetch";
import { NavLink, useNavigate } from "react-router-dom";
import getData from "../Functions/Dispatch";
import videos from "../Functions/Videos";
import simplifyCondition from "../Functions/SimplifyCondition";
import CustomAlert from "../Component/Alert";
function SearchPage() {
  const currentData = useSelector((state) => state.searches.searchList);
  const searchOrder = useSelector((state) => state.searches.searchOrder);
  const [input, setInput] = useState("");
  const [alert,setalert]=useState(false);
  const [alertMessage,setalertMessage]=useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  return (
    <div className={`relative min-h-screen w-full bg-white dark:bg-gray-900 text-black dark:text-white px-4 py-6 sm:px-10 lg:px-24 xl:px-32 `}>
        {alert && (
      <CustomAlert message={alertMessage} onClose={()=>setalert(false)}/> 
        )}
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-mono mx-1">
          Weather
        </h1>
      </div>  
      {/* Search Bar */}
      <form className="flex items-stretch gap-4 max-w-5xl w-full ">
        <input
          className="flex-grow bg-[#7F8CAA] dark:bg-gray-700 text-white p-4 sm:p-5 lg:p-6 border-0 rounded-2xl outline-none text-lg sm:text-xl lg:text-2xl"
          type="text"
          placeholder="Search for a city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (input.trim()) {
              getWeatherAPIData(input).then((data) => {
                if (data["error"]=== undefined) {
                  const location=data.location;
                  const searchItem = getData(data)
                  dispatch(addSearchItem(searchItem));
                  navigate(`/${location.name}`);
                } else {
                  setalertMessage(data.error.message);
                  setalert(true);                  
                }
                setInput("");
              });
            }
          }}
          type="submit"
          className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#7F8CAA] dark:bg-gray-700 hover:bg-[#6a7a99]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      
      <div>
{[...searchOrder].reverse().map((key) => {
  const Search = currentData[key];
  const simplified = simplifyCondition(Search.Condition,Search.Time);
  const videoSrc = videos[simplified];

  return (
    <div
      key={Search.City}
      className="relative mt-6 rounded-lg md:rounded-xl lg:rounded-2xl shadow-md overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Weather Card Content */}
      <NavLink
        to={`/${Search.City}`}
        className="relative z-1 p-4 rounded-lg flex justify-between items-center text-black dark:text-white backdrop-blur-sm"
      >
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{Search.City}</h1>
          <div className="text-sm space-y-1 flex  gap-2 lg:gap-4">
                  <h3 className="text-[#d7d7d7] ">{Search.Time}</h3>
                  <h3 className="text-[#d7d7d7] ">{Search.Country}</h3>
                </div>
                <h3 className="text-md md:text-lg mt-2">{Search.Condition}</h3>
                </div>
                <div>
                  <h2 className="text-2xl lg:text-4xl font-bold self-start">{Search.Temperature}°C</h2>
                </div>
              </NavLink>
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default SearchPage;
