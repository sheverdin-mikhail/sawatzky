import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers";


export const getAllIsChecked = (state: StateSchema) => state.applicationsPage?.allIsChecked
export const getCheckedItems = (state: StateSchema) => state.applicationsPage?.checkedItems
export const getModalIsOpen = (state: StateSchema) => state.applicationsPage?.modalIsOpen

export const getRowItemIsChecked = (id: string) => createSelector(
    [getCheckedItems],
    (checkedItems) => {
        return checkedItems ? checkedItems.includes(id) : false;
    }
);