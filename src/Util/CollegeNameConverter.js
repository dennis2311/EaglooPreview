const converter = {
    business: "경영대학",
    engineer: "공학대학",
    underwood: "국제대학",
    socsci: "사회과학대학",
};

function collegename(colname) {
    const result = converter[colname];
    return result;
}

export default collegename;
