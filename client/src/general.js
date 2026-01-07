import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
export 
{url,showError, formatDateDMY, isAdult, isFutureDate, formatDateForInput};

let url = "http://localhost/api";

const showError = (message,id="errors") => {
    toast.error(message, {
      toastId: id,
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });
  };

   /**
     *
     * @param {string} dateString Date string format
     * @returns Returns a string with this format dd/mm/yyyy
     */
    const formatDateDMY = (dateString) => {
      console.log(dateString);
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    };
  
    /**
     *
     * @param {string} dateString Date string format
     * @returns   true if is 18 or older, fals eif is younger
     */
    const isAdult = (dateString) => {
      const today = new Date();
      const birthDate = new Date(dateString);
  
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
  
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age >= 18;
    };
  
    /**
     *
     * @param {string} dateString  Date in string format
     * @returns True if the data send is bigger thant current data, else False
     */
    const isFutureDate = (dateString) => {
      return new Date(dateString) > new Date();
    };

    const formatDateForInput = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

