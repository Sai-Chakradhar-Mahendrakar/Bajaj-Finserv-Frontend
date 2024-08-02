import { useState, useEffect } from "react";

function App() {
  const [jsonInput, setJsonInput] = useState(
    '{"data": ["M", "1", "334", "4", "B"]}'
  );
  const [response, setResponse] = useState(null);
  const [visibleSections, setVisibleSections] = useState([
    "Numbers",
    "Characters",
    "Highest alphabet",
  ]);
  const [triggerRequest, setTriggerRequest] = useState(false);

  useEffect(() => {
    const postData = async () => {
      try {
        const parsedInput = JSON.parse(jsonInput);
        const res = await fetch("https://bajaj-backend-pi.vercel.app/bfhl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedInput),
        });
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error("Error:", error);
        alert("Invalid JSON or server error");
      }
    };

    if (triggerRequest) {
      postData();
      setTriggerRequest(false);
    }
  }, [triggerRequest]);

  const handleVisibilityChange = (section) => {
    setVisibleSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">{"API Input"}</h1>
        <div className="mb-6">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Enter JSON here"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={() => setTriggerRequest(true)}
            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
        {response && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
              Response
            </h3>
            <div className="flex justify-center space-x-6 mb-6">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={visibleSections.includes("Numbers")}
                  onChange={() => handleVisibilityChange("Numbers")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="hover:text-blue-500 transition-colors duration-200">
                  Numbers
                </span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={visibleSections.includes("Characters")}
                  onChange={() => handleVisibilityChange("Characters")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="hover:text-blue-500 transition-colors duration-200">
                  Characters
                </span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={visibleSections.includes("Highest alphabet")}
                  onChange={() => handleVisibilityChange("Highest alphabet")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="hover:text-blue-500 transition-colors duration-200">
                  Highest Alphabet
                </span>
              </label>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md space-y-4">
              {visibleSections.includes("Numbers") && (
                <div className="p-3 border border-blue-100 rounded-md hover:bg-blue-50 transition duration-150">
                  <p className="text-gray-700 font-medium">Numbers:</p>
                  <p className="text-gray-800">{response.numbers.join(", ")}</p>
                </div>
              )}
              {visibleSections.includes("Characters") && (
                <div className="p-3 border border-blue-100 rounded-md hover:bg-blue-50 transition duration-150">
                  <p className="text-gray-700 font-medium">Characters:</p>
                  <p className="text-gray-800">
                    {response.alphabets.join(", ")}
                  </p>
                </div>
              )}
              {visibleSections.includes("Highest alphabet") && (
                <div className="p-3 border border-blue-100 rounded-md hover:bg-blue-50 transition duration-150">
                  <p className="text-gray-700 font-medium">Highest Alphabet:</p>
                  <p className="text-gray-800">
                    {response.highest_alphabet.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
