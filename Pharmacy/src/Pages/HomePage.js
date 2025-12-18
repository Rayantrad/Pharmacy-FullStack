import React, { useContext, useEffect, useState } from "react";
import Button from "../Components/Button";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiVanBold } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { LiaCertificateSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa6";
import { FaStethoscope } from "react-icons/fa6";
import { BsBandaid } from "react-icons/bs";
import { TbActivityHeartbeat } from "react-icons/tb";
import { PiBabyLight } from "react-icons/pi";
import { LuUpload } from "react-icons/lu";
import { MdOutlinePhotoCamera } from "react-icons/md";
import ProductGrid from "../Components/ProductGrid";
import { FaArrowRight } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router';
import { ProductsList } from "../Data/ProductsList";


import {
  IoCloudUploadOutline,
  IoCalendarOutline,
  IoAdd,
} from "react-icons/io5";

function HomePage() {

  
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const allData = ProductsList.data;
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (!Array.isArray(allData)) return;

    //  Shuffle and pick 5 random items
    const shuffled = [...allData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    setFeaturedProducts(selected);
  }, [allData]);

  return (
    <div>
      <div className="bg-blue-50 border-t border-gray-300">
        <div className="py-13 container mx-auto px-4 sm:px-6 lg:px-8 my-11">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 px-0 lg:px-6 ">
            {/* Left: Description */}
            <div className="flex flex-col justify-center text-center lg:text-left max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Your Health, <span className="text-blue-600">Our Priority</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Get authentic medicines, health supplements, and medical
                equipment delivered to your doorstep. Licensed pharmacy with
                24/7 support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                <Button filled text={"Shop Now"} url={"/products"} />
                <Button
                  filled={false}
                  text={"Find Medicines"}
                  url={"/products"}
                />
              </div>

              <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start">
                <div className="text-center">
                  <h2 className="text-blue-600 font-bold text-xl">10K+</h2>
                  <p className="text-xs text-gray-500">Happy Customers</p>
                </div>
                <div className="text-center">
                  <h2 className="text-green-500 font-bold text-xl">5000+</h2>
                  <p className="text-xs text-gray-500">Products</p>
                </div>
                <div className="text-center">
                  <h2 className="text-purple-600 font-bold text-xl">24/7</h2>
                  <p className="text-xs text-gray-500">Support</p>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative w-full max-w-md">
              <img
                src={`${process.env.PUBLIC_URL}/doctor1.jpg`}
                alt="doctor-photo"
                className="rounded-2xl w-full object-cover shadow-xl"
              />

              <div className="flex items-center gap-3 absolute -bottom-4 -left-0.5 sm:-left-5 bg-white text-blue-600 text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
                <div className="bg-green-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <RiSecurePaymentLine className="text-green-500 text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-green-500 font-semibold">
                    FDA Approved
                  </span>
                  <span className="text-xs text-gray-500 font-normal">
                    All medicines verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[3.75rem] pb-11">
            <div className="shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border-1 border-gray-200 rounded-xl text-center">
              <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-4">
                <RiSecurePaymentLine className="text-blue-500 text-2xl " />
              </div>
              <h1>Licensed & Safe</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                All medicines are licensed and verified
              </span>
            </div>
            <div className="shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border-1 border-gray-200 rounded-xl text-center">
              <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-4">
                <PiVanBold className="text-blue-500 text-2xl " />
              </div>
              <h1>Fast Delivery</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Same day delivery in major cities
              </span>
            </div>
            <div className="shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border-1 border-gray-200 rounded-xl text-center">
              <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-4">
                <GoClock className="text-blue-500 text-2xl " />
              </div>
              <h1>24/7 Support</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Round the clock customer support
              </span>
            </div>
            <div className="shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border-1 border-gray-200 rounded-xl text-center">
              <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-4">
                <LiaCertificateSolid className="text-blue-500 text-2xl " />
              </div>
              <h1>Best Prices</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Competitive prices with quality assurance
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-11">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Shop by Category
          </h1>
          <p className="text-xs text-gray-500 font-normal mt-3 mb-3 text-center">
            Browse our comprehensive range of medical products, medicines, and
            health essentials
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 px-1 py-8">
            <div className="transition-all duration-300 ease-in-out shadow-sm hover:shadow-xl hover:scale-[1.02] hover:bg-blue-100 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border border-gray-200 rounded-xl text-center">
              <div className="bg-blue-200 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-5">
                <GiMedicines className="text-blue-500 text-2xl " />
              </div>
                <h1>Medicines</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Prescription & OTC medicines
              </span>
              <span className="text-[0.65rem] text-gray-500 mt-5">
                2,500+ items
              </span>
            </div>

            <div className="transition-all duration-300 ease-in-out shadow-sm hover:shadow-xl hover:scale-[1.02] hover:bg-red-100 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border border-gray-200 rounded-xl text-center">
              <div className="bg-red-200 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-5">
                <FaRegHeart className="text-red-600 text-2xl " />
              </div>
                <h1>Vitamins & Supplements</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Health & wellness supplements
              </span>
              <span className="text-[0.65rem] text-gray-500 mt-5">
                1,200+ items
              </span>
            </div>

            <div className="transition-all duration-300 ease-in-out shadow-sm hover:shadow-xl hover:scale-[1.02] hover:bg-green-100 cursor-pointer flex justify-center items-center flex-col px-5 py-7 bg-white border border-gray-200 rounded-xl text-center">
              <div className="bg-green-200 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-5">
                <FaStethoscope className="text-green-600 text-2xl " />
              </div>
                <h1>Medical Equipment</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Professional medical devices
              </span>
              <span className="text-[0.65rem] text-gray-500 mt-5">
                800+ items
              </span>
            </div>

            <div className="transition-all duration-300 ease-in-out shadow-sm hover:shadow-xl hover:scale-[1.02] hover:bg-orange-50 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border border-gray-200 rounded-xl text-center">
              <div className="bg-orange-100 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-5">
                <BsBandaid className="text-orange-500 text-2xl " />
              </div>
                <h1>First Aid</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Emergency & wound care
              </span>
              <span className="text-[0.65rem] text-gray-500 mt-5">
                300+ items
              </span>
            </div>

            <div className="transition-all duration-300 ease-in-out shadow-sm hover:shadow-xl hover:scale-[1.02] hover:bg-purple-100 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border border-gray-200 rounded-xl text-center">
              <div className="bg-purple-200 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-5">
                <TbActivityHeartbeat className="text-purple-500 text-2xl " />
              </div>
                <h1>Personal Care</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Daily health & hygiene
              </span>
              <span className="text-[0.65rem] text-gray-500 mt-5">
                600+ items
              </span>
            </div>

            <div className="transition-all duration-300 ease-in-out shadow-sm hover:shadow-xl hover:scale-[1.02] hover:bg-pink-50 cursor-pointer flex justify-center items-center flex-col px-5 py-9 bg-white border border-gray-200 rounded-xl text-center">
              <div className="bg-pink-100 p-2 rounded-full w-10 h-10 flex items-center text-center justify-center mb-5">
                <PiBabyLight className="text-pink-600 text-2xl " />
              </div>
                <h1>Baby Care</h1>
              <span className="text-xs text-gray-500 font-normal mt-5">
                Infant health products
              </span>
              <span className="text-[0.65rem] text-gray-500 mt-5">
                400+ items
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-5 text-center">Featured Products</h1>
          <div>
            <p className="text-xs text-gray-500 font-normal mx-auto max-w-lg items-center">
              Discover our most popular and trusted medical products, chosen
              by thousands of customers
            </p>
          </div>
          <div className="flex justify-center mt-3 lg:justify-end">
            <Button
              filled={false}
              url="/products"
              text={
                <span className="flex items-center gap-2">
                  View All Products <FaArrowRight className="text-sm " />
                </span>
              }
            />
          </div>
          <div className="mt-4 p-0">
            {featuredProducts.length === 0 ? (
              <p className="text-gray-600 text-center">Loading featured items...</p>
            ) : (
              <ProductGrid data={featuredProducts} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-15 mb-11 text-center">
        <div className="mx-auto container px-4 sm:px-1 lg:px-4">
          <h1 className="text-3xl font-bold mb-5">Online Prescriptions</h1>

          <div className="sm:p-8 lg:p-5">
            <div className="mx-auto bg-white rounded-xl shadow-lg px-6 pb-3 sm:px-8  sm:pb-4 lg:px-10 lg:pb-5">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2 justify-center">
                  <LuUpload className="text-2xl text-gray-700" />
                  <h1 className="text-lg font-bold text-gray-800">
                    Upload New Prescription
                  </h1>
                </div>
                <p className="text-gray-500 text-sm text-center">
                  Upload a clear photo or scan of your prescription. Our
                  pharmacists will verify and process your order.
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                {/* Left Column: Prescription Image Upload */}
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="prescription-image"
                    className="block text-sm font-semibold text-gray-700 mb-2 w-full text-center"
                  >
                    Prescription Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex flex-col items-center justify-center h-64 w-full">
                    <div className="flex gap-4 mb-4">
                      <IoCloudUploadOutline className="text-4xl text-gray-400" />
                      <MdOutlinePhotoCamera className="text-4xl text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      Drag and drop your prescription image here, or click to
                      browse
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="px-5 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                        Choose File
                      </button>
                      <span className="text-sm text-gray-500">
                        No file chosen
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Doctor's Info and Notes */}
                <div className="space-y-6 flex flex-col items-center">
                  <div className="w-full">
                    <label
                      htmlFor="doctor-name"
                      className="block text-sm font-semibold text-gray-700 mb-2 w-full text-center"
                    >
                      Doctor's Name
                    </label>
                    <input
                      type="text"
                      id="doctor-name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                      placeholder="Dr. John Smith"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="prescription-date"
                      className="block text-sm font-semibold text-gray-700 mb-2 w-full text-center"
                    >
                      Prescription Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="prescription-date"
                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="additional-notes"
                      className="block text-sm font-semibold text-gray-700 mb-2 w-full text-center"
                    >
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="additional-notes"
                      rows="4"
                      className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 resize-none"
                      placeholder="Any special instructions or notes..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10 flex justify-center sm:justify-end">
                <button className="flex items-center gap-2 bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-gray-700 transition-colors font-semibold ">
                  <IoAdd className="text-xl" />
                  Submit Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
