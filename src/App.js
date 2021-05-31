import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, FormControl, MenuItem, Select, CardContent, makeStyles, Grid, Typography } from "@material-ui/core";
import countriesData from "./data/countries";
import allData from "./data/all";
import CaseCard from "./component/CaseCard";
import MapComponent from "./component/MapComponent";
import StatisticsTable from "./component/StatisticsTable";
import { prettyPrintStat, sortData } from "./utils";
import StatisticGraph from "./component/StatisticGraph";
import "leaflet/dist/leaflet.css";
import { getAll, getCountries } from "./redux/actions/countryAction";

const useStyle = makeStyles((theme) => ({
  app: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "20px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  app__header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  app__stats: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState(() => allData);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [zoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const classes = useStyle();
  const props = useSelector((state) => ({ countries: state.countries }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.countries.data.length) {
      const getCountriesData = async () => {
        const data = await props.countries.data.map(({ country, countryInfo }) => ({
          name: country,
          value: countryInfo.iso2,
        }));
        setCountries(data);
        setMapCountries(props.countries.data);
      };
      getCountriesData();
    } else if (props.countries.data.length == false && props.countries.loading == false) dispatch(getCountries());
  }, [props.countries]);

  function onCountryChange(e) {
    const value = e.target.value;

    if (value !== "worldwide") {
      const country = countriesData.find(({ countryInfo }) => countryInfo.iso2 === value);
      setCountryInfo(country);
      setMapCenter([country.countryInfo.lat, country.countryInfo.long]);
    } else {
      setCountryInfo(allData);
      setMapCenter([34.80746, -40.4796]);
    }

    setInputCountry(value);
  }

  return (
    <div className={classes.app}>
      <Grid container spacing={2}>
        <Grid item md={8} sm={12}>
          <div className={classes.app__header}>
            <Typography variant="h4">
              Coronavirus <span style={{ color: "#cc1034" }}>COVID-19</span> Global Cases
            </Typography>
            <FormControl>
              <Select variant="outlined" value={country} onChange={onCountryChange}>
                <MenuItem value="worldwide">Worlwide</MenuItem>
                {countries.map(({ name, value }, i) => (
                  <MenuItem key={i} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.app__stats}>
            <CaseCard
              caption="Coronavirus Cases"
              active={casesType == "cases"}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
              onClick={(e) => setCasesType("cases")}
            />
            <CaseCard
              caption="Recovered"
              active={casesType == "recovered"}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
              onClick={(e) => setCasesType("recovered")}
            />
            <CaseCard
              caption="Deaths"
              active={casesType == "deaths"}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
              onClick={(e) => setCasesType("deaths")}
            />
          </div>
          <MapComponent countries={mapCountries} center={mapCenter} zoom={zoom} casesType={casesType} />
        </Grid>
        <Grid item md={4} sm={12}>
          <Card>
            <CardContent>
              <h3>Live Cases by Country</h3>
              <StatisticsTable />
              {/* countries={tableData} /> */}
              <h3 style={{ marginTop: "5rem" }}>
                {countryInfo.country || "Worldwide"} new {casesType}
              </h3>
              <StatisticGraph />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
