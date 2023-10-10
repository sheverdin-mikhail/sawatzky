import { createSelector } from "@reduxjs/toolkit";
import { ApplicationStatus, getApplication } from "entities/Application";
import { ApplicationInfo } from "../type/applicationDetail";

export const getApplicationDetailInfo = createSelector(
    getApplication.selectById,
    ( application ) : ApplicationInfo => (
        {
            id: application?.id || '',
            title: application?.title || '',
            subject: application?.subject || '',
            description: application?.description || '',
            status: application?.status || ApplicationStatus.NEW,
            creator: application?.creator,
            createdAt: application?.createdAt || '',
            startWorkDate: application?.startWorkDate,
            endWorkDate: application?.endWorkDate,
            
        }
    )
)