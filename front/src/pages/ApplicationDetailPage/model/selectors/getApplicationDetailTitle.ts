import { createSelector } from "@reduxjs/toolkit";
import { getApplicationDetailInfo } from "./getApplicationDetailInfo";

export const getApplicationDetailTitle = createSelector(
    getApplicationDetailInfo,
    ( application )=> application?.title
)