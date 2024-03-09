import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { httpInterceptedService } from "@core/http-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCategoryContext } from "./category-context";
const AddOrUpdateCategory = ({ setShowAddCategory }) => {
  const navigate = useNavigate();
  const { category, setCategory } = useCategoryContext();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (category) {
      setValue("id", category.id);
      setValue("name", category.name);
    }
  }, [category]);

  const onClose = () => {
    setShowAddCategory(false);
    setCategory(null);
  };

  const onSubmit = (data) => {
    setShowAddCategory(false);
    const response = httpInterceptedService.post(`/CourseCategory`, data);
    toast.promise(
      response,
      {
        pending: "درحال ذخیره اطلاعات",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            if (category) {
              setCategory(null);
            }
            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }) {
            if (data.response.status === 400) {
              return t("categoryList." + data.response.data.code);
            } else {
              return "خطا در اجرای عملیات";
            }
          },
        },
      },
      {
        position: toast.POSITION.BOTTOM_LEFT,
      }
    );
  };
  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="mb4">
          <div>
            <label htmlFor="" className="form-label">
              نام
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              className={`form-control form-control-lg ${
                errors.name && "is-invalid"
              }`}
            />
            {errors.name && errors.name.type === "required" && (
              <p className="text-danger small fw-bolder mt-1">نام الزامی است</p>
            )}
          </div>
          <div className="text-start mt-3">
            <button
              type="button"
              className="btn btn-lg btn-secondary ms-2"
              onClick={onClose}
            >
              بستن
            </button>
            <button type="submit" className="btn btn-lg btn-primary ms-2">
              ثبت تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateCategory;
