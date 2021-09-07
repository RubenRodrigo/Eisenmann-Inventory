import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";
import { useDispatch } from "react-redux";
import { productStockStartLoadingData } from "../../actions/productStock";

export const Calendar = () => {

	const dispatch = useDispatch()

	const handleChangeCalendar = (data) => {
		const date = moment(data.value, 'mm/dd/yyyy')
		dispatch(productStockStartLoadingData(`?year=${date.year()}&month=${date.month() + 1}`))
	}

	return (
		<CalendarComponent id="calendar" change={handleChangeCalendar} start='Decade' depth='Year' />
	)
}
