import { useState } from "react";
import { Input, addToast, Button } from "@heroui/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHashtag,
  FaRegCheckCircle,
  FaExclamationCircle,
  FaCopy,
} from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";

function App() {
  const [number, setNumber] = useState("");
  const [words, setWords] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const convertNumberToWords = async () => {
    if (!number.trim()) {
      setError("Please enter a number");
      return;
    }

    const numValue = parseFloat(number);

    if (isNaN(numValue) || numValue < 0) {
      setError("Please enter a valid non-negative number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/convert", {
        amount: numValue,
      });

      setWords(response.data.words);
    } catch (error) {
      setError(error.message || "Cannot connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow blank input
    if (value === "") {
      setNumber("");

      return;
    }

    // Only allow positive numbers
    const num = Number(value);
    if (isNaN(num) || num < 0) return;

    // If user typed a decimal, process cents
    if (value.includes(".")) {
      const [dollars, cents = ""] = value.split(".");
      const trimmedCents = cents.slice(0, 2); // Don't pad yet
      const finalValue = `${dollars}.${trimmedCents}`;
      setNumber(finalValue);
    } else {
      // If whole number, just keep as is
      setNumber(value);
    }
  };

  const handleCopy = (words) => {
    setCopied(words);
    navigator.clipboard.writeText(words);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <>
      <main className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-orange-500 from-30%  to-amber-500 to-70% rounded-2xl mb-4 shadow-lg">
            <FaHashtag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 from-30%  to-blue-600 to-70% bg-clip-text text-transparent">
            Number to Words Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert any number into words. Perfect for checks, contracts, and
            formal documents.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          delay={{ duration: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 mt-4 max-w-xl w-full">
            {/* <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-orange-500 from-30%  to-amber-500 to-70% rounded-2xl mb-4 shadow-lg">
                  <FaHashtag className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Number to Words Converter
                </h1>
                <p className="text-gray-600">
                  Enter a number to convert it into words.
                </p>
              </div> */}

            <div className="space-y-6">
              {/* Input Section */}
              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="number-input"
                  className="font-medium text-gray-900"
                >
                  Enter a number
                </label>
                <input
                  id="number-input"
                  type="number"
                  value={number}
                  step="0.01"
                  min="0"
                  onChange={handleInputChange}
                  placeholder="e.g., 123, 45.67, 1000000"
                  className="text-base w-full h-12 text-center px-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400  ring-offset-2 transition duration-200 ease-in-out"
                />
                <p className="text-sm text-gray-500 text-center">
                  Enter any positive number including decimals, up to 999
                  Billion.
                </p>
              </div>

              <Button
                isLoading={loading}
                spinner={<LuRefreshCw className="w-5 h-5 animate-spin" />}
                onPress={convertNumberToWords}
                disabled={loading || !number.trim()}
                color="primary"
                className="w-full font-semibold text-base bg-indigo-600 hover:bg-indigo-500 !opacity-100"
              >
                {loading ? "Converting..." : "Convert to Words"}
              </Button>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-fade-in"
                  >
                    <div className="flex items-center">
                      <BsExclamationCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                      <span className="text-red-700 font-medium">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result */}
              <AnimatePresence>
                {words && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-primary/10 border-2 border-primary/20 p-6 rounded-xl animate-fade-in relative "
                  >
                    <Button
                      onPress={() => handleCopy(words)}
                      className="!block min-w-0 h-auto p-1.5 bg-transparent transition-colors absolute top-2 right-2 hover:cursor-pointer"
                    >
                      {copied === words ? (
                        <IoCheckmarkSharp className="w-5 h-5 text-green-400" />
                      ) : (
                        <FaCopy className="w-4 h-4 text-gray-400/50" />
                      )}
                    </Button>
                    <div className="flex items-start space-x-3">
                      <FaRegCheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-primary">Result:</h3>
                        </div>
                        <p className="text-foreground text-lg leading-relaxed font-medium capitalize">
                          {words}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* {words && (
                  <div className="w-full bg-green-50 border-2 border-green-200 p-6 rounded-xl animate-fade-in">
                    <div className="flex items-start space-x-3">
                      <div>
                        <FaRegCheckCircle className="w-6 h-6 text-green-600 mt-1" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          Result:
                        </h3>
                        <p className="text-green-700 text-lg leading-relaxed font-medium">
                          {words}
                        </p>
                      </div>
                    </div>
                  </div>
                )} */}
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}

export default App;
