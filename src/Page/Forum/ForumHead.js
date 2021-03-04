import React from "react";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const ForumHeadRow = styled.div`
    display: flex;
    width: 100%;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ForumHead({ college, setCollege }) {
    const classes = useStyles();

    const handleChange = (event, selectedCollege) => {
        setCollege(selectedCollege);
    };

    return (
        <ForumHeadRow>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={college}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="전체" value="all" />
                        <Tab label="학교생활" value="General" />
                        <Tab label="문과대학" value="Liberal_Arts" />
                        <Tab label="상경대학" value="Commerce_and_Economics" />
                        <Tab label="경영대학" value="Business" />
                        <Tab label="이과대학" value="Science" />
                        <Tab label="공과대학" value="Engineering" />
                        <Tab
                            label="생명시스템대학"
                            value="Life_Science_and_Biotechnology"
                        />
                        <Tab label="신과대학" value="Theology" />
                        <Tab label="사회과학대학" value="Social_Sciences" />
                        <Tab label="법학대학" value="Law" />
                        <Tab label="음악대학" value="Music" />
                        <Tab label="생활과학대학" value="Human_Ecology" />
                        <Tab label="교육과학대학" value="Educational_Science" />
                        <Tab label="학부대학" value="University_College" />
                        <Tab
                            label="언더우드국제대학"
                            value="Underwood_International_College"
                        />
                        <Tab
                            label="글로벌인재대학"
                            value="Global_Leadership_Division"
                        />
                        <Tab label="의과대학" value="Medicine" />
                        <Tab label="치과대학" value="Dentistry" />
                        <Tab label="간호대학" value="Nursing" />
                        <Tab label="약학대학" value="Pharmacy" />
                    </Tabs>
                </AppBar>
            </div>
        </ForumHeadRow>
    );
}
