import React from 'react';

const ChecklistAddInvitation = () => {
    return (
        <tbody>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td colSpan="4" className="text-success">
                    <h4>This chat has no checklist items.</h4>
                    <h4>Use the "Add Checklist Item" button below to add one.</h4>
                </td>
            </tr>
        </tbody>
    );
};

export default ChecklistAddInvitation;
