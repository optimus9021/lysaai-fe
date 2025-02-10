// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./DatePickerStyle.css";
// import moment from "moment";
// import { usePerformanceContext } from "@/context/PerformanceContext";
// import { TPeriod } from "@/types/PerformanceTypes";
// import { periodInitialValue } from "@/constant/PerfomanceContants";

// const customDatePickerStyles = {
// 	input: () =>
// 		`dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`,
// 	calendar: () =>
// 		`text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg dark:bg-gray-900 bg-white p-2`,
// 	day: (state) =>
// 		`cursor-pointer px-2 py-1 rounded-md transition-all duration-150 ${state.isSelected
// 			? "bg-black text-white"
// 			: state.isToday
// 				? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
// 				: "bg-transparent hover:bg-gray-300 dark:hover:bg-gray-600"
// 		}`,
// 	popper: () => `absolute z-50`,
// };

// type OurDatePickerProps = {
// 	applyCallback: (date: Date | null) => void;
// 	onClick: () => void;
// 	type?: "calendar" | "range";
// };

// const DateRangePicker = ({ applyCallback = null, onClick, type = "calendar" }) => {
// 	const { period, setPeriod } = usePerformanceContext();

// 	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([moment().toDate(), moment().toDate()]);
// 	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

// 	useEffect(() => {
// 		// Update `dateRange` saat `period` berubah
// 		setDateRange([moment(period.start).toDate(), moment(period.end).toDate()]);
// 	}, [period]);


// 	return (
// 		<div className="flex flex-col">
// 			<div className="relative" style={{ zIndex: 10 }}>
// 				<DatePicker
// 					selected={moment(period.start).toDate()}
// 					onChange={(dates) => {
// 						const [start, end] = dates as [Date | null, Date | null];
// 						setDateRange([start, end]);

// 						if (start && end) {
// 							setPeriod({
// 								start: moment(start).format("YYYY-MM-DD"),
// 								end: moment(end).format("YYYY-MM-DD"),
// 							})
// 						}
// 					}}
// 					startDate={dateRange[0]}
// 					endDate={dateRange[1]}
// 					selectsRange
// 					isClearable
// 					placeholderText="Select period"
// 					className={customDatePickerStyles.input()}
// 					calendarClassName={customDatePickerStyles.calendar()}
// 					popperPlacement="bottom-start"
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default DateRangePicker;


import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import "./DatePickerStyle.css";
import moment from "moment";
import { usePerformanceContext } from "@/context/PerformanceContext";
import { TPeriod } from "@/types/PerformanceTypes";
import { periodInitialValue } from "@/constant/PerfomanceContants";

type OurDatePickerProps = {
	applyCallback: (date: Date | null) => void;
	onClick: () => void;
	type?: "calendar" | "range";
};

const DateRangePicker = ({ applyCallback = null, onClick, type = "calendar" }) => {
	const { period, setPeriod } = usePerformanceContext();

	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([moment().toDate(), moment().toDate()]);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	useEffect(() => {
		// Update `dateRange` saat `period` berubah
		setDateRange([moment(period.start).toDate(), moment(period.end).toDate()]);
	}, [period]);

	return (
		<div className="flex flex-col">
			<div className="relative" style={{ zIndex: 10 }}>
				<DatePicker

					selected={moment(period.start).toDate()}
					onChange={(dates) => {
						const [start, end] = dates as [Date | null, Date | null];
						setDateRange([start, end]);

						if (start && end) {
							setPeriod({
								start: moment(start).format("YYYY-MM-DD"),
								end: moment(end).format("YYYY-MM-DD"),
							});
						}
					}}
					startDate={dateRange[0]}
					endDate={dateRange[1]}
					selectsRange
					isClearable
					placeholderText="Select period"
					className="custom-datepicker-input w-[350px]"
					calendarClassName="custom-datepicker-calendar"
					popperClassName="custom-datepicker-popper"
				/>
			</div>
		</div>
	);
};

export default DateRangePicker;
