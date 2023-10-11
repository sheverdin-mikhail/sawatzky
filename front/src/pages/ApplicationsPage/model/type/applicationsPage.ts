import { EntityState } from "@reduxjs/toolkit";
import { Application } from "entities/Application";




export interface ApplicationsPageSchema extends EntityState<Application>{
    isLoading?: boolean;
    error?: string;
}