import React, { useState, useEffect } from "react";
import Input from "../form/Input";
import Title from "../ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "../../schema/footer";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const [iconName, setIconName] = useState("fa fa-");
  const [linkAddress, setLinkAddress] = useState("https://");
  const [footerData, setFooterData] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooterData(res.data[0]);
        setSocialMediaLinks(res.data[0].socialMedia);
      } catch (err) {
        console.log(err);
      }
    };
    getFooterData();
  }, []);

  console.log(footerData, "footerData");

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
        {
          location: values.location,
          email: values.email,
          phoneNumber: values.phoneNumber,
          desc: values.desc,
          openingHours: {
            day: values.day,
            hour: values.time,
          },
          socialMedia: socialMediaLinks,
        }
      );
      if (res.status === 200) {
        toast.success("Footer updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/footer/${socialMedia.id}`
      );
      toast.error("Icons is Delete!")
      setFooterData((fot) => fot.socialMedia._id !== socialMedia.id);

    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        location: footerData?.location,
        email: footerData?.email,
        phoneNumber: footerData?.phoneNumber,
        desc: footerData?.desc,
        day: footerData?.openingHours?.day,
        time: footerData?.openingHours?.hour,
      },
      onSubmit,
      validationSchema: footerSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description",
      value: values.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeholder: "Write a Day",
      value: values.day,
      errorMessage: errors.day,
      touched: touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeholder: "Write a Time",
      value: values.time,
      errorMessage: errors.time,
      touched: touched.time,
    },
  ];
  const handleCreate = (e) => {
    setSocialMediaLinks([
      ...footerData?.socialMedia,
      {
        icon: iconName,
        link: linkAddress,
      },
    ]);
    setLinkAddress("https://");
    setIconName("fa fa-");
  };
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Footer Settings</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center md:items-center md:flex-row flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Link Address"
            onChange={(e) => setLinkAddress(e.target.value)}
            value={linkAddress}
          />
          <Input
            placeholder="Icon Name"
            value={iconName}
            onChange={(e) => setIconName(e.target.value)}
          />
          <button className="btn-primary" type="button" onClick={handleCreate}>
            Add
          </button>
        </div>
        <ul className="flex items-center gap-6">
          {socialMediaLinks?.map((item, index) => (
            <li key={index} className="flex items-center">
              <i className={`${item.icon} "text-2xl"`}></i>
              <button
                className="text-danger"
                onClick={(e) => handleDelete(e, id)}
                type="button"
              >
                <i className="fa fa-trash text-xl ml-2"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn-primary mt-4" type="submit">
        Update
      </button>
    </form>
  );
};

export default Footer;



