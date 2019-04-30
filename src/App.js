import React, { Component } from "react";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core/";
import uuid from "uuid";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";

const Title = Typography;
const styles = theme => ({
  title: {
    margin: 20
  },
  textFields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    width: 200,
    margin: "0 10px"
  },
  button: {
    width: 200,
    margin: 10,
    height: 55
  }
});

class App extends Component {
  state = {
    benchMax: "",
    squatMax: "",
    deadliftMax: "",
    overheadMax: "",
    rows: [],
    tableTitles: ["Bench Press", "Squat", "Deadlift", "Overhead Press"]
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  generateTotals = () => {
    const { benchMax, squatMax, deadliftMax, overheadMax } = this.state;
    const maxes = [benchMax, squatMax, deadliftMax, overheadMax];
    // const maxes = [benchMax];
    const wendlerMaxes = maxes.map(max => max * 0.9);
    const setWeeklyPercentages = [
      [0.65, 0.7, 0.75, 0.4],
      [0.75, 0.8, 0.85, 0.5],
      [0.85, 0.9, 0.95, 0.6]
    ];
    const setWeeklyTotals = wendlerMaxes.map(max => {
      return setWeeklyPercentages.map(weeklyPercentage => {
        return weeklyPercentage.map(
          percentage => Math.round((max * percentage) / 5) * 5
        );
      });
    });
    this.setState({ rows: setWeeklyTotals });
  };

  render() {
    const { classes } = this.props;
    const { rows, tableTitles } = this.state;

    return (
      <div className="App">
        <Title variant="h3" className={classes.title}>
          531 Calculator
        </Title>
        <div className={classes.textFields}>
          <TextField
            label="Bench Max"
            className={classes.textField}
            value={this.state.benchMax}
            onChange={this.handleChange("benchMax")}
            variant="outlined"
          />
          <TextField
            label="Squat Max"
            className={classes.textField}
            value={this.state.squatMax}
            onChange={this.handleChange("squatMax")}
            variant="outlined"
          />
          <TextField
            label="Deadlift Max"
            className={classes.textField}
            value={this.state.deadliftMax}
            onChange={this.handleChange("deadliftMax")}
            variant="outlined"
          />
          <TextField
            label="Overhead Press Max"
            className={classes.textField}
            value={this.state.overheadMax}
            onChange={this.handleChange("overheadMax")}
            variant="outlined"
          />
          <Button
            onClick={this.generateTotals}
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Generate Totals
          </Button>
        </div>
        <div className="table-container">
          {rows.length > 0
            ? rows.map((row, i) => (
                <Paper className={classes.root} key={i}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell key={uuid.v4()}>{tableTitles[i]}</TableCell>
                        {row[0].map((week, i) => (
                          <TableCell align="right" key={uuid.v4()}>
                            Week {i + 1}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.map((week, i) => (
                        <TableRow key={uuid.v4()}>
                          <TableCell key={uuid.v4()}>Set {i + 1}</TableCell>
                          {week.map(set => (
                            <TableCell align="right" key={uuid.v4()}>
                              {set}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
