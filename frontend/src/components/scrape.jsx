import React, { useState, useEffect } from "react";
import scrapeLeetCodeProblem from "./pupertter";

const ScrapeComponent = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    scrapeLeetCodeProblem(
      "https://leetcode.com/problems/two-sum/description/"
    ).then((data) => {
      setData(data);
      console.log("Data:", data);
    });
    console.log("Scraping data...");
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};

export default ScrapeComponent;
