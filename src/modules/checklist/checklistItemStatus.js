export const NOT_STARTED                = 'NotStarted';
export const IN_PROGRESS                = 'InProgress';
export const IN_PROGRESS_WITH_ISSUES    = 'InProgressWithIssues';
export const COMPLETED_SUCCESSFULLY     = 'CompletedSuccessfully';
export const COMPLETED_WITH_ISSUES      = 'CompletedWithIssues';
export const COMPLETED_WITH_ERRORS      = 'CompletedWithErrors';
export const CANCELED                   = 'Canceled';

export const options = [
    { value: NOT_STARTED, text: 'Not Started' },
    { value: IN_PROGRESS, text: 'In Progress' },
    { value: IN_PROGRESS_WITH_ISSUES, text: 'In Progress With Issues' },
    { value: COMPLETED_SUCCESSFULLY, text: 'Completed Successfully' },
    { value: COMPLETED_WITH_ISSUES, text: 'Completed with Issues' },
    { value: COMPLETED_WITH_ERRORS, text: 'Completed with Errors' },
    { value: CANCELED, text: 'Canceled' }
];
