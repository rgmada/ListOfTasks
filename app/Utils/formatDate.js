import moment from "moment/moment";

const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
};

export default formatDate;