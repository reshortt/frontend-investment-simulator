import styled from "styled-components/macro"

import React, {useCallback, useState} from 'react';
import {useHistory} from 'react-router-dom';

enum ClickTypes  {
    overview = "/overview",
    positions = "/positions"
}


export default function Navbar () {

    const [buttonClicked, setButtonClicked] = useState(ClickTypes.overview)

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push(buttonClicked), [history])

    const Container = styled.div `
    width:100%;
    height: 20px;
    `

    
    return <Container>
        <button onClick={()=>{
            setButtonClicked(ClickTypes.overview)
            handleOnClick()
}}> Overview </button>
        <button onClick= {()=> {
                       setButtonClicked(ClickTypes.positions)
                       handleOnClick()

        }
        }> Positions </button>
       
        <button> Activity </button>
        <button> Analysis </button>
        <button> Trade </button>
    </Container>
}