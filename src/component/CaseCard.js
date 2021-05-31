import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const useStyle = makeStyles((theme) => ({
  caseCard: {
    flex: 1,
    cursor: "pointer",
    borderTop: ({ active }) => active && "10px solid #cc1034",
    "&:not(:last-child)": {
      marginRight: "15px",
    },
  },
  caseCard__cases: {
    color: "#cc1034",
    fontWeight: 600,
    fontSize: "1.75rem",
    marginBottom: "0.5rem",
  },
  caseCard__total: {
    color: "#6c757d",
    fontWeight: "700 !important",
    fontSize: "0.8rem !important",
    marginBottom: "15px !important",
  },
}));

function CaseCard({ caption, cases, total, onClick, active }) {
  const classes = useStyle({ active });
  const loading = useSelector((state) => state.countriesStreaming.loading);

  return (
    <Card className={classes.caseCard} onClick={onClick}>
      <CardContent>
        <Typography color="textSecondary" className="casecard__caption">
          {caption}
        </Typography>
        <Typography variant="h2" className={classes.caseCard__cases}>
          {loading ? <span className="counter6"></span> : cases}
        </Typography>
        <Typography color="textSecondary" className={classes.caseCard__total}>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CaseCard;
