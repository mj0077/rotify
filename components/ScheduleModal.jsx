"use client"
import React, { useEffect, useState } from 'react';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
import { FormSchema } from '@/assets/schema/formSchema';
import Image from 'next/image';
import checkmark from '../assets/images/checkmark.gif'

const ScheduleModal = ({ isOpen, onClose }) => {

    const [form, setForm] = useState({
        name: "",
        phNumber: "",
        startDate: "",
        endDate: "",
        breakfast: false,
        lunch: false,
        dinner: false,
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const [orderSubmitted, setOrderSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm({ ...form, [name]: ((type === "checkbox") ? checked : value) });
        // console.log(form);
        validateData(form);
    };

    const validateData = (formData) => {
        // Automated Validation using ZOD 
        const validation = FormSchema.safeParse(formData);

        // If the Validation was successful
        if (validation.success) {
            setErrors({});
        } else { // If the validation failed
            let errorsObj = {}
            for (let err of validation.error.issues) {
                errorsObj = { ...errorsObj, [err.path[0]]: err.message };
                setErrors(errorsObj);
            }
            console.log(errors)
        }
    }

    // when a user is done typing
    const handleBlur = (e) => {
        validateData(form);
        console.log(Object.keys(errors).length);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
            setStatus("Error");
            return;
        }

        setStatus("Sending");

        // // Get reCAPTCHA token
        // const token = await window.grecaptcha.execute("<your_site_key>", { action: "submit" });
        // console.log(form);
        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            });

            if (res.headers.get("Content-Type")?.includes("application/json")) {
                if (res.ok) {
                    const data = await res.json();

                    if (data.ok) {
                        console.log(data)
                        setOrderSubmitted(true);
                        setForm({
                            name: "",
                            phNumber: "",
                            startDate: "",
                            endDate: "",
                            breakfast: false,
                            lunch: false,
                            dinner: false,
                        });
                        setStatus("Success");
                        setErrors({});
                        console.log(status);
                    } else {
                        console.log(data);
                    }

                } else {
                    // console.log(res);
                    // setStatus("❌ " + (data.error || "Error"));
                    setStatus("Error");
                    // console.log(status, "\n");
                }
            } else {
                console.error("Unexpected content type");
            }
        } catch (error) {
            console.log("Error: " + error);
        }
        // const content = await res.json();
    };

    return !isOpen ? null :
        (
            <>
                <div className="schedule-modal-wrapper absolute bg-grey-900 w-full mx-auto">
                    <div className="z-50 w-full max-w-md">
                        <span className="close-modal-btn" onClick={() => onClose()}>
                            <svg width="48" height="48" viewBox="0 0 48 48">
                                <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                            </svg>
                        </span>
                        <div className="schedule-modal-container mx-auto bg-grey-950/50 border border-white/20 rounded-2xl p-8 shadow-2xl">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-white mb-2">MEAL BOOKING</h1>
                                <p className="text-white/70 text-sm">Reserve your delicious meals</p>
                            </div>

                            {!orderSubmitted ?
                                (<form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                    autoComplete="on">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-white/90 text-sm font-medium">
                                            Name
                                        </label>
                                        <br />
                                        <input
                                            onChange={handleChange} id="name" name="name"
                                            onBlur={handleBlur} type="text"
                                            value={form.name}
                                            // onChange={(e) => setform((prev) => ({ ...prev, name: e.target.value }))}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl h-12"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        {form.name && errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                        {/* {errors.name && (<small className="text-red-500/80 text-xs">{errors.name}</small>)} */}
                                    </div>

                                    {/* Phone Number Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="phNumber" className="text-white/90 text-sm font-medium">
                                            Phone Number
                                        </label>
                                        <br />
                                        <input
                                            onChange={handleChange} id="phNumber" name="phNumber"
                                            onBlur={handleBlur} type="tel"
                                            value={form.phNumber}
                                            // onChange={(e) => setform((prev) => ({ ...prev, phone: e.target.value }))}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl h-12"
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                        {form.phNumber && errors.phNumber && <p className="text-red-500 text-xs">{errors.phNumber}</p>}
                                    </div>

                                    {/* Date Range Fields */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="startDate" className="text-white/90 text-sm font-medium">
                                                Start Date
                                            </label>
                                            <br />
                                            <input
                                                onChange={handleChange} id="startDate" name="startDate"
                                                onBlur={handleBlur} type="date"
                                                value={form.startDate}
                                                // onChange={(e) => setform((prev) => ({ ...prev, startDate: e.target.value }))}
                                                className="bg-white/10 border-white/20 text-white focus:border-orange-400 focus:ring-orange-400/20 rounded-xl h-12"
                                                required
                                            />
                                            {form.startDate && errors.startDate && <p className="text-red-500 text-xs">{errors.startDate}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="endDate" className="text-white/90 text-sm font-medium">
                                                End Date
                                            </label>
                                            <br />
                                            <input
                                                onChange={handleChange} id="endDate" name="endDate"
                                                onBlur={handleBlur} type="date"
                                                value={form.endDate}
                                                // onChange={(e) => setform((prev) => ({ ...prev, endDate: e.target.value }))}
                                                className="bg-white/10 border-white/20 text-white focus:border-orange-400 focus:ring-orange-400/20 rounded-xl h-12"
                                                required
                                            />
                                            {form.endDate && errors.endDate && <p className="text-red-500 text-xs">{errors.endDate}</p>}
                                        </div>
                                    </div>

                                    {/* Meal Type Checkboxes */}
                                    <div className="space-y-3">
                                        <label className="text-white/90 text-sm font-medium">Meal Type</label>
                                        <div className="flex gap-8 ">
                                            <div className="flex items-center space-x-3">
                                                <input onChange={handleChange} type="checkbox"
                                                    onBlur={handleBlur} id="breakfast"
                                                    name="breakfast"
                                                    checked={form.breakfast}
                                                    // onCheckedChange={() => handleMealTypeChange("breakfast")}
                                                    className="border-white/30 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                                />
                                                <label htmlFor="breakfast" className="text-white/90 text-sm cursor-pointer">
                                                    Breakfast
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input onChange={handleChange} type="checkbox"
                                                    onBlur={handleBlur} id="lunch"
                                                    name="lunch"
                                                    checked={form.lunch}
                                                    // onCheckedChange={() => handleMealTypeChange("lunch")}
                                                    className="border-white/30 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                                />
                                                <label htmlFor="lunch" className="text-white/90 text-sm cursor-pointer">
                                                    Lunch
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input onChange={handleChange} type="checkbox"
                                                    onBlur={handleBlur} id="dinner"
                                                    name="dinner"
                                                    checked={form.dinner}
                                                    // onCheckedChange={() => handleMealTypeChange("dinner")}
                                                    className="border-white/30 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                                />
                                                <label htmlFor="dinner" className="text-white/90 text-sm cursor-pointer">
                                                    Dinner
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit" disabled={status == "Sending"}
                                        className="relative schedule-submit-btn disabled:bg-grey-400 h-12 w-full text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl"
                                    >
                                        <span className="relative mx-auto">
                                            {
                                                (status === "") ? 'BOOK MEALS' :
                                                    (status === "Sending") ?
                                                        (<div className="booking-loader"></div>) :
                                                        (status === "Error") ? 'SOMETHING WRONG' : 'ORDER SENT'
                                            }

                                        </span>
                                    </button>
                                </form>) :
                                (<div className="thank-you text-[#FCDF59] text-center">
                                    <h2 className="text-5xl my-8">Order Received.</h2>
                                    <p className="text-lg mb-6">Thank You for your order.</p>
                                    <Image src={checkmark} className="mx-auto" alt="order-success" width={250} height={250} />
                                </div>)
                            }

                            <div className="text-center mt-6">
                                <p className="text-white/60 text-xs">Enjoy fresh, home-cooked meals delivered to you</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default ScheduleModal