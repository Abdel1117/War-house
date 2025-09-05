/**
 * @summary This file gather all the function related to date manipulation
 * @description This file contains utility functions for manipulating and formatting dates.
 * @fileoverview This file provides functions to get the current date, format dates, and perform date calculations.
 * @author Abderahmane Adjali
 * @date 02/09/2023
 */

export const getCurrentYear = () => {
    return new Date().getFullYear();
}

/**
 * @summary Get the current date in DD-MM-YYYY format
 * @description This function retrieves the current date and formats it as a string in the DD-MM-YYYY format.
 * @author Abderahmane Adjali
 * @returns {string} The current date formatted as DD-MM-YYYY
 * @example getCurrentDate(); // "02-09-2025"
 * @date 05/09/2025
 */
export const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

