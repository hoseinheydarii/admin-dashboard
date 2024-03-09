import React, { Suspense } from "react";
import { httpInterceptedService } from "@core/http-service";
import { Await, defer, useLoaderData } from "react-router-dom";
const CourseDetails = () => {
  const data = useLoaderData();
  return (
    <>
      <Suspense fallback={<p className="text-info">درحال دریافت اطلاعات</p>}>
        <Await resolve={data.corseDetails}>
          {(loadedCorseDetails) => (
            <>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body pt-0">
                      <img
                        className="mx-auto my-4 d-block rounded"
                        style={{ width: "30%" }}
                        src={loadedCorseDetails?.coverImageUrl}
                      />

                      <div class="d-flex flex-column justify-content-center pe-4 text-center">
                        <div class="badge bg-info my-2 align-self-center">
                          {loadedCorseDetails?.courseCategory}
                        </div>
                        <h4>{loadedCorseDetails?.title}</h4>
                        <p>{loadedCorseDetails?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-xl-2 d-flex">
                  <div className="card flex-fill text-center">
                    <div className="card-header">
                      <h5 className="card-title mb-0 mt-2">زمان آموزش</h5>
                    </div>
                    <div className="card-body my-0 pt-0">
                      <h4 className="text-info fw-bolder">
                        {loadedCorseDetails?.duration + " ساعت"}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 d-flex">
                  <div className="card flex-fill text-center">
                    <div className="card-header">
                      <h5 className="card-title mb-0 mt-2">سطح دوره</h5>
                    </div>
                    <div className="card-body my-0 pt-0">
                      <h4 className="text-info fw-bolder">
                        {loadedCorseDetails?.courseLevel}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 d-flex">
                  <div className="card flex-fill text-center">
                    <div className="card-header">
                      <h5 className="card-title mb-0 mt-2">تعداد فصل ها</h5>
                    </div>
                    <div className="card-body my-0 pt-0">
                      <h4 className="text-info fw-bolder">
                        {loadedCorseDetails?.numOfChapters + " فصل"}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 d-flex">
                  <div className="card flex-fill text-center">
                    <div className="card-header">
                      <h5 className="card-title mb-0 mt-2">تعداد مباحث</h5>
                    </div>
                    <div className="card-body my-0 pt-0">
                      <h4 className="text-info fw-bolder">
                        {loadedCorseDetails?.numOfLectures + " مبحث"}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 d-flex">
                  <div className="card flex-fill text-center">
                    <div className="card-header">
                      <h5 className="card-title mb-0 mt-2">تعداد نظرات </h5>
                    </div>
                    <div className="card-body my-0 pt-0">
                      <h4 className="text-info fw-bolder">
                        {loadedCorseDetails?.numOfReviews + " نظر"}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 d-flex">
                  <div className="card flex-fill text-center">
                    <div className="card-header">
                      <h5 className="card-title mb-0 mt-2">میانگین نظرات</h5>
                    </div>
                    <div className="card-body my-0 pt-0">
                      <h4 className="text-info fw-bolder">
                        {loadedCorseDetails?.averageReviewRating + " از 5"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export async function courseDetailsLoader({ params }) {
  return defer({
    corseDetails: loadCourseDetails(params),
  });
}

const loadCourseDetails = async (params) => {
  const response = await httpInterceptedService.get(
    `/Course/by-id/${params.id}`
  );
  return response.data;
};

export default CourseDetails;
