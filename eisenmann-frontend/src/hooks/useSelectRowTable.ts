import { useState } from "react";

export function useSelectRowTable<T extends { id: number }>(rows: T[]) {

	const [selected, setSelected] = useState<readonly number[]>([]);

	// List if checkbox (all column) is true
	const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target } = e
		if (target.checked) {
			const newSelecteds = rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleSelectOneClick = (event: React.MouseEvent<unknown>, id: number) => {

		const selectedIndex = selected.indexOf(id);

		let newSelected: readonly number[] = [];

		if (selectedIndex === -1) {
			// if id doesn't exists is adedd
			// Is used when this element doesn't exists in selected array
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			// if id is in the 0 position is removed
			// Is used when this element exists in the 0 position of selected array
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			// if id exists and is in the last position
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			// if id exists in the array and has falided above validations
			// Is used to get all values without selected value
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	return {
		selected,
		handleSelectAllClick,
		handleSelectOneClick,
		isSelected
	}

};
