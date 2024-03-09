import React from "react";
import { useLoaderData } from "react-router-dom";
import Course from "./course";

const CourseList = ({ courses }) => {
  return (
    <>
      <div className="row">
        {courses.map((course) => (
          <div className="col-4" key={course.id}>
            <Course {...course} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseList;
