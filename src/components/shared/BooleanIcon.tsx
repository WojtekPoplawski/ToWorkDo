import React from 'react';import CheckIcon from '@mui/icons-material/Check';import ClearIcon from '@mui/icons-material/Clear';

type BooleanIconType = {
    value: boolean | 0|1;
};

const BooleanIcon = ({value}:BooleanIconType) => {
    return (
        <>  
        {value === true || value === 1 && <CheckIcon />}
        {value === false || value === 0 && <ClearIcon />}
        </>
    );
};
export default BooleanIcon;