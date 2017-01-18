import React from 'react';

export default (story) => {
    return (
        <div style={{
            marginTop: "2em",
            marginLeft: "2em",
            width: "75%",
            borderStyle: "dashed",
            borderColor: "silver",
            borderWidth: "1px",
            borderRadius: "4px",
            padding: "1em"
        }}>
            {story()}
        </div>
    );
};
