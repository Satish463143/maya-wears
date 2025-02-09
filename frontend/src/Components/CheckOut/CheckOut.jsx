import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInputComponent } from "../../Middlewares/Form/Input.component";
import './CheckOut.css'

const CheckOut = ({ submitEvent, loading, detail = null, isloggedIn }) => {
  
  const customerDTO = Yup.object({
    fullname: Yup.string().min(2).max(50).required(),
    email: Yup.string().required().nullable().notRequired(),
    phone
      : Yup.string()
          .matches(
            /^\+?[1-9]\d{1,14}$/,
            "Phone number must be a valid phone number"
          )
          .required("Phone number is required"),
    optionalNumber: Yup.string()
      .nullable()
      .notRequired()
      .test(
        "optionalNumber-format",
        "Phone number must be a valid phone number",
        (value) => !value || /^\+?[1-9]\d{1,14}$/.test(value)
      ),
    country: Yup.string().required(),
    address: Yup.string().required(),
    landMark: Yup.string().required().nullable().notRequired(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerDTO),
  });
  useEffect(() => {
    if (detail) {
      setValue("name", detail.fullname);
      setValue("email", detail.email);
      setValue("phone", detail.phone);
      setValue("optionalNumber", detail.optionalNumber);
      setValue("country", detail.country);
      setValue("province", detail.province);
      setValue("city", detail.city);
      setValue("address", detail.address);
      setValue("landMark", detail.landMark);
      setValue("postalCode", detail.postalCode);
    }
  }, [detail]);
  return (
    <div>
      <form action="" onSubmit={handleSubmit(submitEvent)}>
        <div className="personal_details">
          <h1>Personal details</h1>          
              <label htmlFor="fullname">
                Full name<span>*</span>
              </label>
              <br />
              <TextInputComponent
                name="fullname"
                control={control}
                type="text"
                defaultValue=""
                errMsg={errors?.fullname?.message}
                required:true
              />{" "}
              <br />
              <label htmlFor="email">
                Email
              </label>
              <br />
              <TextInputComponent
                name="email"
                control={control}
                type="email"
                defaultValue=""
                errMsg={errors?.email?.message}
              />{" "}
              <br />
              <label htmlFor="phone">
                Phone number<span>*</span>
              </label>
              <br />
              <TextInputComponent
                name="phone"
                control={control}
                errMsg={errors?.phone?.message}
                required:true
              />{" "}
              <br />
            
          <label htmlFor="optionalNumber">Optional number (if any)</label>
          <br />
          <TextInputComponent
            name="optionalNumber"
            control={control}
            errMsg={errors?.optionalNumber?.message}
          />{" "}
          <br />
        </div>
        <h1>Delivery details</h1>
        <div className="address_deatils">
          <div>
            <label htmlFor="country">
              Country<span>*</span>
            </label>
            <br />
            <TextInputComponent
              name="country"
              control={control}
              defaultValue="Nepal"
              errMsg={errors?.country?.message}
              required:true
            />{" "}
            <br />
          </div>
          <div>
            <label htmlFor="address">
              Address<span>*</span>
            </label>
            <br />
            <TextInputComponent
              name="address"
              control={control}
              errMsg={errors?.address?.message}
              required:true
            />{" "}
            <br />
          </div>
          <div>
            <label htmlFor="landMark">Nearest landmark</label>
            <br />
            <TextInputComponent
              name="landMark"
              control={control}
              errMsg={errors?.landMark?.message}
            />{" "}
            <br />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            className="submit_btn hoverBotton "
            type="submit"
            value="Continue"
            disabled={loading}
            style={{ cursor: "pointer" }}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
