import React from "react";
import numeral from "numeral";
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCountiesStreaming } from "../redux/actions/countryAction";
import { sortData } from "../utils";

const useStyle = makeStyles((theme) => ({
  table: {
    marginTop: "20px",
    overflowY: "scroll",
    height: "400px",
    color: "#6a5d5d",
    backgroundColor: "white",
    "& tr": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& td": {
      padding: "0.5rem",
    },
    "& tr:nth-of-type(odd)": {
      backgroundColor: "#f3f2f8",
    },
  },
}));

function StatisticsTable({ countries, getCountries }) {
  const classes = useStyle();

  React.useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className={classes.table}>
      {countries.loading === true &&
        Array.from({ length: 10 }, (val, i) => (
          <tr key={i}>
            <td>Loading...</td>
            <td className={`counter${i + 1}`}></td>
          </tr>
        ))}
      {countries.loading === false &&
        sortData(countries.data).map(({ country, cases }, idx) => (
          <tr key={idx}>
            <td>{country}</td>
            <td>{numeral(cases).format("000,000")}</td>
          </tr>
        ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  countries: state.countriesStreaming,
});

const mapDispatchToProps = (dispatch) => ({
  getCountries: bindActionCreators(getCountiesStreaming, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsTable);
